package content

import (
	"errors"
	"strings"
	"time"

	"github.com/adrg/frontmatter"
)

// ProjectFrontmatter holds the YAML metadata of a project. It mirrors the
// structure of ArticleFrontmatter for now, but is kept as its own type so the
// project model can diverge from the article model later.
type ProjectFrontmatter struct {
	Title       string   `yaml:"title" json:"title"`
	Description string   `yaml:"description" json:"description"`
	Date        string   `yaml:"date" json:"date"`
	Tags        []string `yaml:"tags" json:"tags"`
	Published   *bool    `yaml:"published" json:"published"`
}

// Project is the unit of content managed by the admin under the projects dir.
type Project struct {
	Slug        string             `json:"slug"`
	Path        string             `json:"path"`
	SHA         string             `json:"sha,omitempty"`
	Frontmatter ProjectFrontmatter `json:"frontmatter"`
	Body        string             `json:"body"`
}

// IsPublished returns true unless published is explicitly set to false.
func (p *Project) IsPublished() bool {
	if p.Frontmatter.Published == nil {
		return true
	}
	return *p.Frontmatter.Published
}

// ParseProject decodes a markdown file (frontmatter + body) read from the
// repository and populates slug/path based on the file path.
func ParseProject(path string, raw []byte) (*Project, error) {
	slug := slugFromPath(path)
	var fm ProjectFrontmatter
	rest, err := frontmatter.Parse(strings.NewReader(string(raw)), &fm)
	if err != nil {
		return nil, err
	}
	return &Project{
		Slug:        slug,
		Path:        path,
		Frontmatter: fm,
		Body:        strings.TrimLeft(string(rest), "\n"),
	}, nil
}

// Render serializes a project back to its markdown form (frontmatter + body).
func (p *Project) Render() []byte {
	var b strings.Builder
	b.WriteString("---\n")
	b.WriteString("title: " + quoteYAML(p.Frontmatter.Title) + "\n")
	b.WriteString("description: " + quoteYAML(p.Frontmatter.Description) + "\n")
	if p.Frontmatter.Date != "" {
		b.WriteString("date: " + p.Frontmatter.Date + "\n")
	}
	if len(p.Frontmatter.Tags) > 0 {
		tags := make([]string, 0, len(p.Frontmatter.Tags))
		for _, t := range p.Frontmatter.Tags {
			tags = append(tags, quoteYAML(t))
		}
		b.WriteString("tags: [" + strings.Join(tags, ", ") + "]\n")
	}
	pub := p.IsPublished()
	b.WriteString("published: " + boolStr(pub) + "\n")
	b.WriteString("---\n\n")
	b.WriteString(p.Body)
	return []byte(b.String())
}

// DefaultCommitMsg builds a conventional commit message for a project.
func (p *Project) DefaultCommitMsg(action string) string {
	switch action {
	case "delete":
		return "chore(admin): delete project " + p.Slug
	default:
		return "chore(admin): " + action + " project " + p.Slug + " on " + time.Now().Format("2006-01-02")
	}
}

// Project sentinel errors surfaced to the UI.
var (
	ErrProjectNotFound = errors.New("project not found")
)
