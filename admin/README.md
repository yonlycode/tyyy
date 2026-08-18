# yo-port Admin

Standalone **desktop** admin CMS for the **yo-port** portfolio & blog. It lets you create, edit, publish and delete the Markdown articles that live in the GitHub repo (`web/content/articles/*.md`), plus upload images — committing changes directly to the `main` branch so the site's CI/CD rebuilds automatically.

Built with **[Wails](https://wails.io/)**: a Go backend whose methods are bound directly to a React frontend embedded into a **single native desktop binary** (no server, no browser tab).

---

## ✨ Features

| Feature | Description |
|---|---|
| **Article management** | List, create, edit, publish/draft and delete articles stored in the repo |
| **Markdown editor** | Textarea with live preview (via `remark` + `remark-html`) |
| **Frontmatter editing** | `title`, `description`, `date`, `tags`, `published` toggle |
| **Image upload** | Drag & drop / picker → uploaded to `web/public/images`, inserts `![name](/images/x)` |
| **GitHub commits** | Every save = direct commit to `main` → GH Actions redeploys the site |
| **No backend secrets on disk** | The GitHub PAT is kept in Go process memory only |
| **Native desktop app** | React build embedded via `go:embed`; Go methods bound via Wails IPC |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Desktop shell** | Wails v2 (`github.com/wailsapp/wails/v2`) |
| **Backend** | Go 1.26, `google/go-github/v60`, `adrg/frontmatter`, `golang.org/x/oauth2` |
| **Frontend** | React 19, Vite 7, TypeScript 5 |
| **Markdown preview** | `remark`, `remark-html` |
| **Package manager** | Yarn 1.22 (corepack) |

---

## 📁 Structure

```
admin/
├── main.go                 # Wails app: embeds SPA, binds App methods
├── wails.json              # Wails build/dev configuration
├── pkg/
│   ├── app/
│   │   └── app.go          # App struct — bound Go methods (GetConfig, SaveArticle, …)
│   └── content/
│       ├── article.go      # Article model, frontmatter parsing, Repository interface
│       └── github_repo.go  # GitHub REST implementation (list/get/save/delete/upload)
└── frontend/               # React + Vite + TS SPA
    ├── wailsjs/            # Auto-generated bindings (do not edit; gitignored)
    └── src/
        ├── services/api.ts # Thin wrapper around the generated Wails bindings
        ├── types/index.ts  # Article / Config types
        └── components/     # SettingsModal, ArticleList, ArticleEditor, ImageUploader
```

---

## 🚀 Getting Started

### Prerequisites
- Go 1.26+
- Node.js 22+ LTS (corepack) + Yarn 1.22
- [Wails CLI](https://wails.io/docs/gettingstarted/installation) + system deps (`wails doctor`)
- A GitHub **Personal Access Token** with `repo` scope (contents read/write)

### Install
```bash
make admin-install        # or manually:
go install github.com/wailsapp/wails/v2/cmd/wails@latest
cd admin/frontend && yarn install
cd admin && go mod download
```

---

## 🖥️ Development (HMR)

```bash
cd admin && wails dev
```

This starts the Go backend and the Vite dev server with hot-reload, and opens a native window. The frontend calls Go methods through `window.go` (Wails IPC) — no HTTP endpoints.

---

## 📦 Build & Run (desktop binary)

```bash
make admin-build        # or: cd admin && wails build
open admin/build/bin/yo-port-admin.app
```

`wails build` compiles the React frontend, embeds it, and produces a self-contained native app.

---

## 🔌 Bound methods (replaces an HTTP API)

The frontend calls these Go methods via the auto-generated bindings in `frontend/wailsjs/go/app/App.*`:

| Method | Description |
|---|---|
| `GetConfig()` | Whether the app is configured (token never returned) |
| `SetConfig(cfg)` | Set token + owner + repo + directories (kept in memory) |
| `ListArticles()` | List all articles |
| `GetArticle(slug)` | Fetch a single article |
| `SaveArticle(article)` | Save / publish an article (commit to `main`) |
| `DeleteArticle(slug)` | Delete an article |
| `UploadMedia(fileName, dataB64)` | Upload an image → returns `![name](/images/x)` |

> Regenerate bindings after changing a bound method signature: `cd admin && wails build` regenerates them automatically. Keep `frontend/wailsjs` in `tsconfig.json`'s `include`.

---

## 🔐 Security

- The GitHub PAT is stored in **Go process memory only** — never written to disk and never exposed to the browser DOM.
- The default target is `web/content/articles` on branch `main` (configurable in the settings modal).
- On a 409 conflict (file changed on GitHub), the UI asks you to reload before saving again.

---

## ⚙️ Makefile (repo root)

```bash
make admin-install       # install Wails CLI + admin deps
make admin-dev           # run desktop app in dev mode (HMR)
make admin-build         # build the desktop app
make admin-run           # open the built app
```

---

## 📜 License

Same as the parent `yo-port` project — open source, retain attribution if redistributed.

---

*Admin for yo-port — built with ❤️ by Yoann Fort*