package content

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/google/go-github/v60/github"
	"golang.org/x/oauth2"
)

// Config holds the GitHub connection details supplied through the admin UI.
// When a connection is successfully established, the full config (including
// the token) is persisted to disk in a cache file at ~/.tyyy-admin/config.json
// so that the settings form is fully pre-filled on subsequent sessions.
type Config struct {
	Token   string `json:"token"`
	Owner   string `json:"owner"`
	Repo    string `json:"repo"`
	BaseDir string `json:"baseDir"` // content base directory, e.g. web/content
	ImgDir  string `json:"imgDir"`  // images directory, e.g. web/public/images
	Branch  string `json:"branch"`
}

func (c Config) baseDir() string {
	if c.BaseDir != "" {
		return c.BaseDir
	}
	return ContentBaseDir
}

func (c Config) articlesDir() string {
	return path.Join(c.baseDir(), "articles")
}

func (c Config) projectsDir() string {
	return path.Join(c.baseDir(), "projects")
}

func (c Config) linksPath() string {
	return path.Join(c.baseDir(), "links.json")
}

func (c Config) imagesDir() string {
	if c.ImgDir != "" {
		return c.ImgDir
	}
	return ImagesDir
}

func (c Config) branch() string {
	if c.Branch != "" {
		return c.Branch
	}
	return "main"
}

// Deployment represents a single run of the deploy workflow.
type Deployment struct {
	ID           int64   `json:"id"`
	RunNumber    int     `json:"runNumber"`
	DisplayTitle string  `json:"displayTitle"`
	Status       string  `json:"status"`
	Conclusion   string  `json:"conclusion"`
	HeadSHA      string  `json:"headSha"`
	HeadBranch   string  `json:"headBranch"`
	Event        string  `json:"event"`
	CreatedAt    *string `json:"createdAt"`
	UpdatedAt    *string `json:"updatedAt"`
	HTMLURL      string  `json:"htmlUrl"`
}

// DeployWorkflowFileName is the GH Actions workflow that deploys the site.
const DeployWorkflowFileName = "deploy.yml"

// GitHubRepository implements Repository on top of the GitHub REST API.
type GitHubRepository struct {
	cfg    Config
	client *github.Client
}

func NewGitHubRepository(cfg Config) (*GitHubRepository, error) {
	if cfg.Token == "" || cfg.Owner == "" || cfg.Repo == "" {
		return nil, errors.New("github config incomplete: token, owner and repo are required")
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: cfg.Token})
	tc := oauth2.NewClient(context.Background(), ts)
	return &GitHubRepository{cfg: cfg, client: github.NewClient(tc)}, nil
}

// ListDeployments returns the most recent runs of the deploy workflow.
func (r *GitHubRepository) ListDeployments(limit int) ([]*Deployment, error) {
	if limit <= 0 {
		limit = 10
	}
	ctx := context.Background()
	opts := &github.ListWorkflowRunsOptions{
		Branch:      r.cfg.branch(),
		ListOptions: github.ListOptions{PerPage: limit},
	}
	runs, _, err := r.client.Actions.ListWorkflowRunsByFileName(ctx, r.cfg.Owner, r.cfg.Repo, DeployWorkflowFileName, opts)
	if err != nil {
		return nil, err
	}
	var out []*Deployment
	for _, run := range runs.WorkflowRuns {
		d := &Deployment{
			ID:           run.GetID(),
			RunNumber:    run.GetRunNumber(),
			DisplayTitle: run.GetDisplayTitle(),
			Status:       run.GetStatus(),
			Conclusion:   run.GetConclusion(),
			HeadSHA:      run.GetHeadSHA(),
			HeadBranch:   run.GetHeadBranch(),
			Event:        run.GetEvent(),
			HTMLURL:      run.GetHTMLURL(),
		}
		if t := run.GetCreatedAt(); !t.IsZero() {
			s := t.Time.Format(time.RFC3339)
			d.CreatedAt = &s
		}
		if t := run.GetUpdatedAt(); !t.IsZero() {
			s := t.Time.Format(time.RFC3339)
			d.UpdatedAt = &s
		}
		out = append(out, d)
	}
	return out, nil
}

// ListArticles returns metadata for every markdown file in the articles dir.
func (r *GitHubRepository) ListArticles() ([]*Article, error) {
	contents, err := r.list(r.cfg.articlesDir())
	if err != nil {
		return nil, err
	}
	var out []*Article
	for _, c := range contents {
		raw, err := r.download(c.GetPath())
		if err != nil {
			return nil, err
		}
		art, err := ParseArticle(c.GetPath(), raw)
		if err != nil {
			return nil, err
		}
		art.SHA = c.GetSHA()
		out = append(out, art)
	}
	return out, nil
}

// ListProjects returns metadata for every markdown file in the projects dir.
func (r *GitHubRepository) ListProjects() ([]*Project, error) {
	contents, err := r.list(r.cfg.projectsDir())
	if err != nil {
		return nil, err
	}
	var out []*Project
	for _, c := range contents {
		raw, err := r.download(c.GetPath())
		if err != nil {
			return nil, err
		}
		proj, err := ParseProject(c.GetPath(), raw)
		if err != nil {
			return nil, err
		}
		proj.SHA = c.GetSHA()
		out = append(out, proj)
	}
	return out, nil
}

// ListTags returns the deduplicated, alphabetically sorted set of all tags
// used across articles and projects.
func (r *GitHubRepository) ListTags() ([]string, error) {
	articles, err := r.ListArticles()
	if err != nil {
		return nil, err
	}
	projects, err := r.ListProjects()
	if err != nil {
		return nil, err
	}
	set := make(map[string]struct{})
	for _, a := range articles {
		for _, t := range a.Frontmatter.Tags {
			set[t] = struct{}{}
		}
	}
	for _, p := range projects {
		for _, t := range p.Frontmatter.Tags {
			set[t] = struct{}{}
		}
	}
	tags := make([]string, 0, len(set))
	for t := range set {
		tags = append(tags, t)
	}
	sort.Strings(tags)
	return tags, nil
}

func (r *GitHubRepository) GetArticle(slug string) (*Article, error) {
	raw, sha, err := r.getRaw(r.cfg.articlesDir(), slug)
	if err != nil {
		return nil, err
	}
	art, err := ParseArticle(r.articlePath(r.cfg.articlesDir(), slug), raw)
	if err != nil {
		return nil, err
	}
	art.SHA = sha
	return art, nil
}

func (r *GitHubRepository) GetProject(slug string) (*Project, error) {
	raw, sha, err := r.getRaw(r.cfg.projectsDir(), slug)
	if err != nil {
		return nil, err
	}
	proj, err := ParseProject(r.projectPath(slug), raw)
	if err != nil {
		return nil, err
	}
	proj.SHA = sha
	return proj, nil
}

// GetLinks reads and parses web/content/links.json. When the file does not
// exist yet, it returns an empty (but usable) LinksData.
func (r *GitHubRepository) GetLinks() (*LinksData, error) {
	raw, err := r.download(r.cfg.linksPath())
	if err != nil {
		// The file may simply not exist yet — treat as empty.
		return &LinksData{}, nil
	}
	var data LinksData
	if err := json.Unmarshal(raw, &data); err != nil {
		return nil, err
	}
	if data.Links == nil {
		data.Links = []Link{}
	}
	return &data, nil
}

// SaveLinks writes the links data to web/content/links.json on the current branch.
func (r *GitHubRepository) SaveLinks(data *LinksData, commitMsg string) error {
	return r.saveJSONFile(r.cfg.linksPath(), data.Render(), commitMsg)
}

func (r *GitHubRepository) SaveArticle(article *Article, commitMsg string) error {
	return r.saveFile(r.cfg.articlesDir(), article.Slug, article.Render(), article.SHA, commitMsg)
}

func (r *GitHubRepository) SaveProject(project *Project, commitMsg string) error {
	return r.saveFile(r.cfg.projectsDir(), project.Slug, project.Render(), project.SHA, commitMsg)
}

func (r *GitHubRepository) DeleteArticle(slug, commitMsg string) error {
	art, err := r.GetArticle(slug)
	if err != nil {
		return err
	}
	return r.deleteFile(r.cfg.articlesDir(), slug, art.SHA, commitMsg)
}

func (r *GitHubRepository) DeleteProject(slug, commitMsg string) error {
	proj, err := r.GetProject(slug)
	if err != nil {
		return err
	}
	return r.deleteFile(r.cfg.projectsDir(), slug, proj.SHA, commitMsg)
}

// list returns the files in a content directory (ref of the current branch).
func (r *GitHubRepository) list(dir string) ([]*github.RepositoryContent, error) {
	ctx := context.Background()
	opts := &github.RepositoryContentGetOptions{Ref: r.cfg.branch()}
	_, contents, _, err := r.client.Repositories.GetContents(ctx, r.cfg.Owner, r.cfg.Repo, dir, opts)
	if err != nil {
		return nil, err
	}
	var out []*github.RepositoryContent
	for _, c := range contents {
		if c.GetType() != "file" {
			continue
		}
		if !strings.HasSuffix(c.GetName(), ".md") && !strings.HasSuffix(c.GetName(), ".mdx") {
			continue
		}
		out = append(out, c)
	}
	return out, nil
}

// getRaw returns the decoded content and SHA of a markdown file in dir.
func (r *GitHubRepository) getRaw(dir, slug string) ([]byte, string, error) {
	ctx := context.Background()
	p := r.articlePath(dir, slug)
	opts := &github.RepositoryContentGetOptions{Ref: r.cfg.branch()}
	c, _, _, err := r.client.Repositories.GetContents(ctx, r.cfg.Owner, r.cfg.Repo, p, opts)
	if err != nil {
		return nil, "", err
	}
	decoded, err := c.GetContent()
	if err != nil {
		return nil, "", err
	}
	return []byte(decoded), c.GetSHA(), nil
}

// saveFile creates or updates a markdown file under dir on the current branch.
func (r *GitHubRepository) saveFile(dir, slug string, content []byte, sha, commitMsg string) error {
	ctx := context.Background()
	p := r.articlePath(dir, slug)
	payload := &github.RepositoryContentFileOptions{
		Content:   content,
		Message:   github.String(commitMsg),
		Branch:    github.String(r.cfg.branch()),
		Committer: &github.CommitAuthor{Name: github.String("yo-port admin"), Email: github.String("admin@yo-port.local")},
	}
	if sha != "" {
		payload.SHA = github.String(sha)
		_, _, err := r.client.Repositories.UpdateFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
		return err
	}
	_, _, err := r.client.Repositories.CreateFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
	return err
}

// saveJSONFile creates or updates a non-markdown file at the given repo path
// on the current branch. The SHA is empty for new files.
func (r *GitHubRepository) saveJSONFile(p string, content []byte, commitMsg string) error {
	ctx := context.Background()
	payload := &github.RepositoryContentFileOptions{
		Content:   content,
		Message:   github.String(commitMsg),
		Branch:    github.String(r.cfg.branch()),
		Committer: &github.CommitAuthor{Name: github.String("yo-port admin"), Email: github.String("admin@yo-port.local")},
	}
	// Attempt to fetch the existing file to detect create vs update.
	opts := &github.RepositoryContentGetOptions{Ref: r.cfg.branch()}
	existing, _, _, err := r.client.Repositories.GetContents(ctx, r.cfg.Owner, r.cfg.Repo, p, opts)
	if err == nil && existing != nil {
		payload.SHA = github.String(existing.GetSHA())
		_, _, err = r.client.Repositories.UpdateFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
		return err
	}
	_, _, err = r.client.Repositories.CreateFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
	return err
}

// deleteFile removes a markdown file under dir on the current branch.
func (r *GitHubRepository) deleteFile(dir, slug, sha, commitMsg string) error {
	ctx := context.Background()
	p := r.articlePath(dir, slug)
	payload := &github.RepositoryContentFileOptions{
		Message: github.String(commitMsg),
		SHA:     github.String(sha),
		Branch:  github.String(r.cfg.branch()),
	}
	_, _, err := r.client.Repositories.DeleteFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
	return err
}

// UploadMedia stores an image under the images dir and returns a markdown
// reference usable from articles, e.g. ![alt](/images/name.png).
func (r *GitHubRepository) UploadMedia(fileName string, data []byte) (string, error) {
	ctx := context.Background()
	p := path.Join(r.cfg.imagesDir(), fileName)
	payload := &github.RepositoryContentFileOptions{
		Content: data,
		Message: github.String("chore(admin): upload image " + fileName),
		Branch:  github.String(r.cfg.branch()),
	}
	_, _, err := r.client.Repositories.CreateFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("![%s](/images/%s)", fileName, fileName), nil
}

func (r *GitHubRepository) articlePath(dir, slug string) string {
	return path.Join(dir, slug+".md")
}

func (r *GitHubRepository) projectPath(slug string) string {
	return path.Join(r.cfg.projectsDir(), slug+".md")
}

func (r *GitHubRepository) download(p string) ([]byte, error) {
	ctx := context.Background()
	opts := &github.RepositoryContentGetOptions{Ref: r.cfg.branch()}
	content, _, _, err := r.client.Repositories.GetContents(ctx, r.cfg.Owner, r.cfg.Repo, p, opts)
	if err != nil {
		return nil, err
	}
	decoded, err := content.GetContent()
	if err != nil {
		return nil, err
	}
	return []byte(decoded), nil
}

// ConfigCachePath returns the path to the config cache file.
func ConfigCachePath() (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("config cache: %w", err)
	}
	return filepath.Join(home, ".tyyy-admin", "config.json"), nil
}

// LoadConfig reads and returns the persisted config from disk.
// Returns nil if the file does not exist.
func LoadConfig() (*Config, error) {
	cfgPath, err := ConfigCachePath()
	if err != nil {
		return nil, err
	}
	data, err := os.ReadFile(cfgPath)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil, nil
		}
		return nil, fmt.Errorf("load config: %w", err)
	}
	var cfg Config
	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("load config: %w", err)
	}
	return &cfg, nil
}

// SaveConfig writes the config to disk in ~/.tyyy-admin/config.json.
func SaveConfig(cfg Config) error {
	cfgPath, err := ConfigCachePath()
	if err != nil {
		return err
	}
	dir := filepath.Dir(cfgPath)
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return fmt.Errorf("save config: %w", err)
	}
	data, err := json.Marshal(cfg)
	if err != nil {
		return fmt.Errorf("save config: %w", err)
	}
	return os.WriteFile(cfgPath, data, 0o600)
}

// ClearConfigCache removes the persisted config cache file
// (~/.tyyy-admin/config.json). It is a no-op if the file does not exist.
func ClearConfigCache() error {
	cfgPath, err := ConfigCachePath()
	if err != nil {
		return err
	}
	if _, err := os.Stat(cfgPath); err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil
		}
		return fmt.Errorf("clear config cache: %w", err)
	}
	if err := os.Remove(cfgPath); err != nil {
		return fmt.Errorf("clear config cache: %w", err)
	}
	return nil
}
