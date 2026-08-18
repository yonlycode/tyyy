package app

import (
	"context"
	"encoding/base64"
	"errors"
	"strings"
	"sync"

	"admin/pkg/content"
)

var errNotConfigured = errors.New("not configured: set your GitHub credentials first")

// App holds the in-memory GitHub config and the lazily-created repository.
// Its exported methods are bound to the frontend by Wails.
type App struct {
	ctx  context.Context
	mu   sync.Mutex
	cfg  content.Config
	repo *content.GitHubRepository
}

func NewApp() *App {
	return &App{}
}

// Startup stores the Wails context for later use.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

// GetConfig returns the current connection info. The token is never returned.
func (a *App) GetConfig() map[string]any {
	a.mu.Lock()
	cfg := a.cfg
	a.mu.Unlock()
	return map[string]any{
		"configured": cfg.Token != "" && cfg.Owner != "" && cfg.Repo != "",
		"owner":      cfg.Owner,
		"repo":       cfg.Repo,
		"dir":        cfg.Dir,
		"imgDir":     cfg.ImgDir,
		"branch":     cfg.Branch,
	}
}

// SetConfig validates the GitHub credentials and stores them in memory.
func (a *App) SetConfig(cfg content.Config) error {
	if cfg.Dir == "" {
		cfg.Dir = content.ArticlesDir
	}
	if cfg.ImgDir == "" {
		cfg.ImgDir = content.ImagesDir
	}
	if cfg.Branch == "" {
		cfg.Branch = "main"
	}
	repo, err := content.NewGitHubRepository(cfg)
	if err != nil {
		return err
	}
	a.mu.Lock()
	a.cfg = cfg
	a.repo = repo
	a.mu.Unlock()
	return nil
}

func (a *App) ListArticles() ([]*content.Article, error) {
	repo := a.repoOr()
	if repo == nil {
		return nil, errNotConfigured
	}
	return repo.ListArticles()
}

func (a *App) GetArticle(slug string) (*content.Article, error) {
	repo := a.repoOr()
	if repo == nil {
		return nil, errNotConfigured
	}
	art, err := repo.GetArticle(slug)
	if err != nil {
		if strings.Contains(err.Error(), "404") {
			return nil, content.ErrNotFound
		}
		return nil, err
	}
	return art, nil
}

// SaveArticle commits the article to GitHub. The body/frontmatter is
// serialized by the repository layer.
func (a *App) SaveArticle(art *content.Article) error {
	repo := a.repoOr()
	if repo == nil {
		return errNotConfigured
	}
	if art.Slug == "" {
		return content.ErrSlugRequired
	}
	if err := repo.SaveArticle(art, art.DefaultCommitMsg("update")); err != nil {
		if strings.Contains(err.Error(), "409") {
			return content.ErrConflict
		}
		return err
	}
	return nil
}

func (a *App) DeleteArticle(slug string) error {
	repo := a.repoOr()
	if repo == nil {
		return errNotConfigured
	}
	return repo.DeleteArticle(slug, "chore(admin): delete article "+slug)
}

// UploadMedia stores an image and returns the markdown reference to insert
// into an article. dataB64 is the base64-encoded file content sent by the UI.
func (a *App) UploadMedia(fileName, dataB64 string) (string, error) {
	repo := a.repoOr()
	if repo == nil {
		return "", errNotConfigured
	}
	if fileName == "" || dataB64 == "" {
		return "", content.ErrMediaRequired
	}
	data, err := base64.StdEncoding.DecodeString(dataB64)
	if err != nil {
		return "", content.ErrMediaRequired
	}
	return repo.UploadMedia(fileName, data)
}

func (a *App) repoOr() *content.GitHubRepository {
	a.mu.Lock()
	repo := a.repo
	a.mu.Unlock()
	return repo
}