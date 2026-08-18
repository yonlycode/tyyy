package content

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/google/go-github/v60/github"
	"golang.org/x/oauth2"
)

// Config holds the GitHub connection details supplied through the admin UI.
// When a connection is successfully established, the full config (including
// the token) is persisted to disk in a cache file at ~/.tyyy-admin/config.json
// so that the settings form is fully pre-filled on subsequent sessions.
type Config struct {
	Token  string `json:"token"`
	Owner  string `json:"owner"`
	Repo   string `json:"repo"`
	Dir    string `json:"dir"`    // articles directory, e.g. web/content/articles
	ImgDir string `json:"imgDir"` // images directory, e.g. web/public/images
	Branch string `json:"branch"`
}

func (c Config) articlesDir() string {
	if c.Dir != "" {
		return c.Dir
	}
	return ArticlesDir
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

// ListArticles returns metadata for every markdown file in the articles dir.
func (r *GitHubRepository) ListArticles() ([]*Article, error) {
	ctx := context.Background()
	opts := &github.RepositoryContentGetOptions{Ref: r.cfg.branch()}
	_, contents, _, err := r.client.Repositories.GetContents(ctx, r.cfg.Owner, r.cfg.Repo, r.cfg.articlesDir(), opts)
	if err != nil {
		return nil, err
	}
	var out []*Article
	for _, c := range contents {
		if c.GetType() != "file" {
			continue
		}
		if !strings.HasSuffix(c.GetName(), ".md") && !strings.HasSuffix(c.GetName(), ".mdx") {
			continue
		}
		raw, err := r.download(ctx, c.GetPath())
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

func (r *GitHubRepository) GetArticle(slug string) (*Article, error) {
	ctx := context.Background()
	p := r.articlePath(slug)
	opts := &github.RepositoryContentGetOptions{Ref: r.cfg.branch()}
	c, _, _, err := r.client.Repositories.GetContents(ctx, r.cfg.Owner, r.cfg.Repo, p, opts)
	if err != nil {
		return nil, err
	}
	decoded, err := c.GetContent()
	if err != nil {
		return nil, err
	}
	art, err := ParseArticle(p, []byte(decoded))
	if err != nil {
		return nil, err
	}
	art.SHA = c.GetSHA()
	return art, nil
}

func (r *GitHubRepository) SaveArticle(article *Article, commitMsg string) error {
	ctx := context.Background()
	p := r.articlePath(article.Slug)
	payload := &github.RepositoryContentFileOptions{
		Content:   article.Render(),
		Message:   github.String(commitMsg),
		Branch:    github.String(r.cfg.branch()),
		Committer: &github.CommitAuthor{Name: github.String("yo-port admin"), Email: github.String("admin@yo-port.local")},
	}
	if article.SHA != "" {
		payload.SHA = github.String(article.SHA)
		_, _, err := r.client.Repositories.UpdateFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
		return err
	}
	_, _, err := r.client.Repositories.CreateFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
	return err
}

func (r *GitHubRepository) DeleteArticle(slug, commitMsg string) error {
	ctx := context.Background()
	art, err := r.GetArticle(slug)
	if err != nil {
		return err
	}
	p := r.articlePath(slug)
	payload := &github.RepositoryContentFileOptions{
		Message: github.String(commitMsg),
		SHA:     github.String(art.SHA),
		Branch:  github.String(r.cfg.branch()),
	}
	_, _, err = r.client.Repositories.DeleteFile(ctx, r.cfg.Owner, r.cfg.Repo, p, payload)
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

func (r *GitHubRepository) articlePath(slug string) string {
	return path.Join(r.cfg.articlesDir(), slug+".md")
}

func (r *GitHubRepository) download(ctx context.Context, p string) ([]byte, error) {
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
