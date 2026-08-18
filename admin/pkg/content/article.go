package content

import (
	"errors"
	"strings"
	"time"

	"github.com/adrg/frontmatter"
)

const (
	ArticlesDir = "web/content/articles"
	ImagesDir   = "web/public/images"
)

// Frontmatter holds the YAML metadata of an article, aligned with the
// structure produced by gray-matter on the site side (web/src/lib/md.ts).
type Frontmatter struct {
	Title       string   `yaml:"title" json:"title"`
	Description string   `yaml:"description" json:"description"`
	Date        string   `yaml:"date" json:"date"`
	Tags        []string `yaml:"tags" json:"tags"`
	Published   *bool    `yaml:"published" json:"published"`
}

// Article is the unit of content managed by the admin.
type Article struct {
	Slug        string      `json:"slug"`
	Path        string      `json:"path"`
	SHA         string      `json:"sha,omitempty"`
	Frontmatter Frontmatter `json:"frontmatter"`
	Body        string      `json:"body"`
}

// IsPublished returns true unless published is explicitly set to false.
func (a *Article) IsPublished() bool {
	if a.Frontmatter.Published == nil {
		return true
	}
	return *a.Frontmatter.Published
}

// ParseArticle decodes a markdown file (frontmatter + body) read from the
// repository and populates slug/path based on the file path.
func ParseArticle(path string, raw []byte) (*Article, error) {
	slug := slugFromPath(path)
	var fm Frontmatter
	rest, err := frontmatter.Parse(strings.NewReader(string(raw)), &fm)
	if err != nil {
		return nil, err
	}
	return &Article{
		Slug:        slug,
		Path:        path,
		Frontmatter: fm,
		Body:        strings.TrimLeft(string(rest), "\n"),
	}, nil
}

// Render serializes an article back to its markdown form (frontmatter + body).
func (a *Article) Render() []byte {
	var b strings.Builder
	b.WriteString("---\n")
	b.WriteString("title: " + quoteYAML(a.Frontmatter.Title) + "\n")
	b.WriteString("description: " + quoteYAML(a.Frontmatter.Description) + "\n")
	if a.Frontmatter.Date != "" {
		b.WriteString("date: " + a.Frontmatter.Date + "\n")
	}
	if len(a.Frontmatter.Tags) > 0 {
		tags := make([]string, 0, len(a.Frontmatter.Tags))
		for _, t := range a.Frontmatter.Tags {
			tags = append(tags, quoteYAML(t))
		}
		b.WriteString("tags: [" + strings.Join(tags, ", ") + "]\n")
	}
	pub := a.IsPublished()
	b.WriteString("published: " + boolStr(pub) + "\n")
	b.WriteString("---\n\n")
	b.WriteString(a.Body)
	return []byte(b.String())
}

// Sentinel errors surfaced to the UI.
var (
	ErrNotFound      = errors.New("article not found")
	ErrSlugRequired  = errors.New("slug is required")
	ErrConflict      = errors.New("conflict: the file changed on GitHub, reload before saving again")
	ErrMediaRequired = errors.New("fileName and data are required")
)

// Repository abstracts access to the underlying storage (GitHub).
type Repository interface {
	ListArticles() ([]*Article, error)
	GetArticle(slug string) (*Article, error)
	SaveArticle(article *Article, commitMsg string) error
	DeleteArticle(slug, commitMsg string) error
	UploadMedia(fileName string, data []byte) (string, error)
}

func slugFromPath(path string) string {
	parts := strings.Split(path, "/")
	last := parts[len(parts)-1]
	last = strings.TrimSuffix(last, ".md")
	return strings.TrimSuffix(last, ".mdx")
}

func quoteYAML(s string) string {
	if s == "" {
		return `""`
	}
	if strings.ContainsAny(s, ": #\"\n") {
		return `"` + strings.ReplaceAll(s, `"`, `\"`) + `"`
	}
	return s
}

func boolStr(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

// DefaultCommitMsg builds a conventional commit message for an article.
func (a *Article) DefaultCommitMsg(action string) string {
	switch action {
	case "delete":
		return "chore(admin): delete " + a.Slug
	default:
		return "chore(admin): " + action + " article " + a.Slug + " on " + time.Now().Format("2006-01-02")
	}
}
