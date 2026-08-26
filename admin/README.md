# yo-port Admin


Standalone **desktop & mobile** admin CMS for the **yo-port** portfolio & blog. It lets you create, edit, publish and delete the Markdown content that lives in the GitHub repo — **articles** (`web/content/articles/*.md`) and **projects** (`web/content/projects/*.md`) — manage the **contact links** (`web/content/links.json`) plus upload images, committing changes directly to the `main` branch so the site's CI/CD rebuilds automatically. A dedicated **Deployments** tab shows the status of those builds (recent `deploy.yml` workflow runs).

Built with **[Wails v3](https://wails.io/)**: a Go backend whose methods are bound directly to a React frontend embedded into a **single native desktop binary** + **Android APK** (no server, no browser tab).

---

## Features

| Feature | Description |
|---|---|
| **Article management** | List, create, edit, publish/draft and delete articles stored in the repo |
| **Project management** | Same workflow for portfolio projects, in its own tab |
| **Contact links** | A **Links** tab to add, edit, toggle, delete and reorder (↑/↓) the links shown on the site's `/contact` page (`web/content/links.json`) |
| **Markdown editor** | Textarea with live preview (via `remark` + `remark-html`) |
| **Frontmatter editing** | `title`, `description`, `date`, `tags`, `published` toggle |
| **Image upload** | Drag & drop / picker → uploaded to `web/public/images`, inserts `![name](/images/x)` |
| **GitHub commits** | Every save = direct commit to `main` → GH Actions redeploys the site |
| **Live feedback** | Activity spinners on every save/delete/upload + toast notifications (success/error) on repo actions and list loads |
| **Deployment tracking** | Tracks recent runs of the `deploy.yml` workflow (status/conclusion) in a dedicated tab |
| **No backend secrets on disk** | The GitHub PAT is kept in Go process memory only |
| **Native desktop + mobile** | React build embedded via `go:embed`; Go methods bound via Wails IPC. Desktop (macOS, Linux, Windows) + Android |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Desktop shell** | Wails v3 (`github.com/wailsapp/wails/v3`) |
| **Build system** | Task (taskfile.dev) |
| **Backend** | Go 1.26, `google/go-github/v60`, `adrg/frontmatter`, `golang.org/x/oauth2` |
| **Frontend** | React 19, Vite 7, TypeScript 5 |
| **Markdown preview** | `remark`, `remark-html` |
| **Notifications** | In-house toast system (no dependency) — `ui/Toast.tsx` + `useToast()` |
| **Package manager** | Yarn 1.22 (corepack) |

---

## Structure

```
admin/
├── main.go                 # Wails app: embeds SPA, binds App service
├── wails.json              # Wails v3 configuration
├── Taskfile.yml            # Task runner (build/dev/package)
├── build/
│   ├── config.yml          # Project info + dev mode config
│   ├── Taskfile.yml        # Common build tasks
│   ├── appicon.png         # App icon
│   ├── darwin/             # macOS build tasks
│   ├── linux/              # Linux build tasks
│   ├── windows/            # Windows build tasks
│   └── android/            # Android build tasks
├── pkg/
│   ├── app/
│   │   └── app.go          # App struct — bound Go methods (GetConfig, SaveArticle, …)
│   └── content/
│       ├── article.go      # Article model, frontmatter parsing, Repository interface
│       ├── project.go      # Project model, frontmatter parsing
│       ├── links.go        # Contact links model (LinksData/Link) + JSON render
│       └── github_repo.go  # GitHub REST implementation (list/get/save/delete/upload/links)
└── frontend/               # React + Vite + TS SPA
    ├── bindings/           # Auto-generated bindings (do not edit; gitignored)
    └── src/
        ├── services/api.ts # Thin wrapper around the generated Wails bindings
        ├── types/index.ts  # Article / Project / LinksData / Config types
        ├── hooks/          # useAdminData (data loading + config state)
        └── components/     # SettingsModal, ArticleList, ArticleEditor, ProjectList, ProjectEditor, LinksEditor, ImageUploader, Deployments, Images
            └── ui/         # UI kit: Card, Field, Toggle, SlugInput, StatusPill, Spinner, LoaderButton, Toast
```

---

## Getting Started

### Prerequisites
- Go 1.26+
- Node.js 22+ LTS (corepack) + Yarn 1.22
- [Task](https://taskfile.dev/installation/) (`go install github.com/go-task/task/v3/cmd/task@latest`)
- [Wails v3 CLI](https://v3.wails.io/) (`go install github.com/wailsapp/wails/v3/cmd/wails3@latest`)
- System deps: `wails3 doctor`
- A GitHub **Personal Access Token** with `repo` scope (contents read/write + Actions read for deployment tracking)

### Install
```bash
make admin-install        # or manually:
go install github.com/wailsapp/wails/v3/cmd/wails3@latest
cd admin/frontend && yarn install
cd admin && go mod download
```

---

## Development (HMR)

```bash
cd admin && wails3 dev
```

This starts the Go backend and the Vite dev server with hot-reload, and opens a native window. The frontend calls Go methods through Wails IPC — no HTTP endpoints.

---

## Build & Run (desktop binary)

```bash
make admin-build        # or: cd admin && wails3 build
open admin/bin/tyyy-admin
```

`wails3 build` compiles the React frontend, embeds it, and produces a self-contained native app.

---

## Build Android APK

```bash
cd admin && wails3 task android:package    # production APK
cd admin && wails3 task android:run        # build + launch on emulator
cd admin && wails3 task android:run:device # build + launch on physical device
```

Requires: Android SDK, NDK (`ndk;26.3.11579264`), Java 17+.

---

## Bound methods (replaces an HTTP API)

The frontend calls these Go methods via the auto-generated bindings in `frontend/bindings/admin/pkg/app/app.ts`:

| Method | Description |
|---|---|
| `GetConfig()` | Whether the app is configured (token never returned) |
| `SetConfig(cfg)` | Set token + owner + repo + content base dir + dirs (kept in memory) |
| `ListArticles()` | List all articles |
| `GetArticle(slug)` | Fetch a single article |
| `SaveArticle(article)` | Save / publish an article (commit to `main`) |
| `DeleteArticle(slug)` | Delete an article |
| `ListProjects()` | List all projects |
| `GetProject(slug)` | Fetch a single project |
| `SaveProject(project)` | Save / publish a project (commit to `main`) |
| `DeleteProject(slug)` | Delete a project |
| `GetLinks()` | Fetch the contact links data (`web/content/links.json`) |
| `SaveLinks(data)` | Save contact links (commit to `main`) |
| `UploadMedia(fileName, dataB64)` | Upload an image → returns `![name](/images/x)` |
| `ListDeployments(limit)` | Recent runs of the `deploy.yml` deploy workflow |

> Regenerate bindings after changing a bound method signature: `cd admin && wails3 build` regenerates them automatically. Keep `frontend/bindings` in `tsconfig.json`'s `include`.

---

## Security

- The GitHub PAT is stored in **Go process memory only** — never written to disk and never exposed to the browser DOM.
- The default content base directory is `web/content` — articles and projects resolve to `<baseDir>/articles` and `<baseDir>/projects` respectively, and contact links to `<baseDir>/links.json` (configurable in the settings modal).
- On a 409 conflict (file changed on GitHub), the UI asks you to reload before saving again.

---

## Makefile (repo root)

```bash
make admin-install       # install Wails CLI + admin deps
make admin-dev           # run desktop app in dev mode (HMR)
make admin-build         # build the desktop app
make admin-run           # open the built app
```

---

## License

Same as the parent `yo-port` project — open source, retain attribution if redistributed.

---

*Admin for yo-port — built with Wails v3*
