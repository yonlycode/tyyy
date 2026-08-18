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
	ctx          context.Context
	mu           sync.Mutex
	cfg          content.Config
	cachedConfig *content.Config
	repo         *content.GitHubRepository
}

func NewApp() *App {
	return &App{}
}

// Startup stores the Wails context for later use.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

// loadCachedConfig reads the persisted config from disk (protected by a.mu).
// When no in-memory config is set yet (cold start), it promotes the cached
// config into the active config and builds the repository so that fetch
// operations (e.g. ListArticles) work immediately on launch.
func (a *App) loadCachedConfig() {
	a.mu.Lock()
	defer a.mu.Unlock()
	if a.cachedConfig != nil {
		return
	}
	cfg, err := content.LoadConfig()
	if err != nil || cfg == nil {
		return // fail silently — GetConfig will handle it
	}
	a.cachedConfig = cfg
	if a.cfg.Token == "" {
		if repo, repoErr := content.NewGitHubRepository(*cfg); repoErr == nil {
			a.cfg = *cfg
			a.repo = repo
		}
	}
}

// GetConfig returns the current connection info. The token is never returned.
// If no in-memory config exists, it falls back to the cached config on disk.
func (a *App) GetConfig() map[string]any {
	a.mu.Lock()
	cfg := a.cfg
	a.mu.Unlock()

	// If we have no in-memory config, try the cache.
	if cfg.Token == "" && cfg.Owner == "" {
		a.loadCachedConfig()
	}

	configured := cfg.Token != "" && cfg.Owner != "" && cfg.Repo != ""
	if !configured && a.cachedConfig != nil {
		configured = a.cachedConfig.Token != "" && a.cachedConfig.Owner != "" && a.cachedConfig.Repo != ""
	}

	return map[string]any{
		"configured": configured,
		"owner": func() string {
			if cfg.Owner != "" {
				return cfg.Owner
			}
			if a.cachedConfig != nil {
				return a.cachedConfig.Owner
			}
			return ""
		}(),
		"repo": func() string {
			if cfg.Repo != "" {
				return cfg.Repo
			}
			if a.cachedConfig != nil {
				return a.cachedConfig.Repo
			}
			return ""
		}(),
		"dir": func() string {
			if cfg.Dir != "" {
				return cfg.Dir
			}
			if a.cachedConfig != nil {
				return a.cachedConfig.Dir
			}
			return ""
		}(),
		"imgDir": func() string {
			if cfg.ImgDir != "" {
				return cfg.ImgDir
			}
			if a.cachedConfig != nil {
				return a.cachedConfig.ImgDir
			}
			return ""
		}(),
		"branch": func() string {
			if cfg.Branch != "" {
				return cfg.Branch
			}
			if a.cachedConfig != nil {
				return a.cachedConfig.Branch
			}
			return ""
		}(),
	}
}

// GetFullConfig returns the full config including the token.
// Used by the frontend to pre-fill the settings form on restart.
func (a *App) GetFullConfig() *content.Config {
	a.mu.Lock()
	if a.cfg.Token != "" {
		defer a.mu.Unlock()
		cfg := a.cfg
		return &cfg
	}
	a.mu.Unlock()

	// Fall back to cache.
	a.loadCachedConfig()
	if a.cachedConfig != nil {
		cfg := *a.cachedConfig
		return &cfg
	}
	return nil
}

// SetConfig validates the GitHub credentials, stores them in memory,
// and persists the full config (including token) to the cache file.
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
	return content.SaveConfig(cfg)
}

func (a *App) ListArticles() ([]*content.Article, error) {
	repo := a.repoOr()
	if repo == nil {
		return nil, errNotConfigured
	}
	return repo.ListArticles()
}

// ListDeployments returns the most recent runs of the deploy workflow.
func (a *App) ListDeployments(limit int) ([]*content.Deployment, error) {
	repo := a.repoOr()
	if repo == nil {
		return nil, errNotConfigured
	}
	return repo.ListDeployments(limit)
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
