# TY3

Un portfolio & blog personnel — **minimal et frugal en infra** — édité depuis une **app desktop native** qui pilote le contenu du repo GitHub.

Le site est un **export statique** (Next.js) hébergé gratuitement sur **GitHub Pages** : aucune base de données, aucun backend, aucun serveur à payer. Le contenu vit directement dans le repo sous forme de fichiers Markdown, et chaque sauvegarde est un commit qui redéclenche automatiquement la publication.

La gestion du contenu se fait via **tyyy-Admin**, une petite app de bureau (Wails : backend Go + frontend React) qui lit/écrit les fichiers du repo via l'API GitHub et surveille les déploiements.

---

## 🧠 L'idée en bref

- **Zero frais d'infra** : le site est un export statique servi par GitHub Pages. Rien à héberger, rien à maintenir.
- **Git comme seule source de vérité** : articles, projets et liens de contact sont des fichiers Markdown/JSON dans `main`. Un commit = une publication.
- **Édition depuis une app desktop** : pas besoin de taper dans Git ni d'éditer le Markdown à la main — l'admin s'occupe de tout et committe pour vous.
- **Un pipeline invisible** : sauvegarder dans l'admin → commit sur `main` → Forgejo Actions rebuild → le site est à jour.

---

## 📦 Deux packages

Le repo est un monorepo contenant deux projets indépendants :

### 1. `web/` — le site (Next.js, statique)

Le portfolio & blog public, généré en **export statique** (SSG) et déployé sur **GitHub Pages**.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router, `output: 'export'`) |
| **Style** | Emotion (CSS-in-JS) + tokens Material Design 3 + Framer Motion |
| **Contenu** | Markdown local (`gray-matter`, `remark`, `remark-html`, `reading-time`) |
| **Rendu** | Statique au build via `getSortedArticles()` / `getArticleBySlug()` |
| **Pages** | Accueil, articles, portfolio, contact (linktree), privacy |
| **Analytics** | GA4 (script côté client) |
| **Hébergement** | GitHub Pages via `deploy.yml` |

### 2. `admin/` — l'app desktop (Wails : Go + React)

Un **CMS de bureau** autonome pour éditer le contenu du repo.

| | |
|---|---|
| **Shell desktop** | Wails v2 (backend Go, aucun serveur HTTP) |
| **Backend** | Go 1.26, `google/go-github/v60`, `adrg/frontmatter`, oauth2 |
| **Frontend** | React 19 + Vite 7 + TypeScript 5 |
| **Persistance** | Commits GitHub sur `main` (le PAT reste en mémoire, jamais sur disque) |
| **Onboarding** | S'appuie sur `deploy.yml` pour installer l'écosystème |

Fonctionnalités : édition de **articles** et **projets**, gestion des **liens de contact** (réordonnables), **upload d'images**, éditeur Markdown avec **aperçu live**, un onglet **Deployments** qui suit les builds du site, et des **notifications toast** + **spinners d'activité** sur chaque action de sauvegarde/suppression.

---

## 🗂️ Structure

```
tyyy/
├── Makefile            # Commandes unifiées (web + admin)
├── web/                # Le site Next.js (export statique)
│   ├── content/        # Le contenu du site (la source de vérité)
│   │   ├── articles/   # .md des articles
│   │   ├── projects/   # .md des projets
│   │   └── links.json  # liens de la page /contact
│   ├── src/            # app router, composants (Emotion), lib (md/links), theme
│   └── next.config.ts  # output: 'export', basePath '/tyyy', trailingSlash
└── admin/              # L'app desktop Wails
    ├── main.go         # embarque le SPA + bind les méthodes Go
    ├── pkg/
    │   ├── app/        # App struct — méthodes exposées (GetConfig, SaveArticle, …)
    │   └── content/    # modèles Article/Project/Links + implémentation GitHub
    └── frontend/       # SPA React + Vite + TS
```

Le site et l'admin partagent le **même contrat de contenu** : frontmatter `title`, `description`, `date`, `tags`, `published` pour les articles/projets, et `{ id, label, url, icon, enabled }` pour les liens.

---

## 🚀 Prise en main

### Prérequis
- **Node.js 22+ LTS** (corepack) + **Yarn 1.22**
- **Go 1.26+** + le **Wails CLI** (`wails doctor` pour les deps système) — pour l'admin seulement
- Un **GitHub PAT** avec scope `repo` (lecture/écriture contenu + lecture Actions) — pour l'admin

### Installation
```bash
make install          # admin-install + web-install
```

### Web
```bash
make web-dev          # dev server (http://localhost:3000)
make web-build        # build statique -> web/out
make web-start        # servir le build localement
make web-lint         # ESLint
```

### Admin
```bash
make admin-dev        # app desktop en dev (HMR, ouvre la fenêtre)
make admin-build      # build -> admin/build/bin/tyyy-admin.app
make admin-run        # ouvrir l'app compilée
```

---

## 🔄 Workflow d'édition

1. Lancer **tyyy Admin**, renseigner le token + repo (`yonlycode/tyyy`) + branche `main`.
2. Créer/éditer un article, un projet ou les liens de contact.
3. **Sauvegarder = committer** sur `main` (l'app gère les conflits 409 en demandant un rechargement).
4. `deploy.yml` détecte le push sur `web/**`, rebuild le site et le publie sur GitHub Pages.
5. Suivre le statut dans l'onglet **Deployments**.

---

## 🤖 CI/CD (Forgejo Actions)

Nouvelle chaîne : **Forgejo Actions** build le SSG puis pousse `web/out/` sur la branche `gh-pages` du **miroir GitHub** → **GitHub Pages** (`https://yonlycode.github.io/tyyy/`).

| Workflow | Déclencheur | Rôle |
|---|---|---|
| `.forgejo/workflows/web-ci.yml` | push `main` / PR sur `web/**` | install + lint (non bloquant) + build SSG |
| `.forgejo/workflows/deploy.yml` | push sur `main` (chemin `web/**`) + dispatch manuel | Build SSG + push `gh-pages` du miroir GitHub → Pages |
| `.forgejo/workflows/admin-ci.yml` | push `main` / PR sur `admin/**` | Build Linux de l'app Wails (`task build`) + vet |
| `.forgejo/workflows/admin-release.yml` | tag `v*` + dispatch manuel | Build + AppImage Linux → release Forgejo |

### 🖥️ CI admin — Linux uniquement (choix assumé)

Les runners de la fleet sont **Linux/Docker uniquement** (backend act/docker).
Or un build Wails n'est pas un `go build` croisable : il faut un **toolchain
CGO natif** (GCC + GTK4/WebKitGTK 6.0 sur la machine qui compile). D'où :

- **Linux** : buildé en CI (`admin-ci.yml` pour les PR/push,
  `admin-release.yml` sur tag `v*` → AppImage attaché à la release Forgejo).
  Prérequis secrets de dépôt : `RELEASE_TOKEN` (PAT avec scope write sur ce
  repo) — à poser par l'owner ; le jeton injecté par le runner act n'a aucun
  scope API (401).
- **macOS** : exige un runner **macOS** (matériel Apple, Xcode/WebKit
  système) — inexistant dans la fleet. Build local : `task package` dans
  `admin/` sur une machine macOS.
- **Windows** : le cross-build Wails→Windows depuis Linux (WebView2, `.syso`,
  NSIS) est hors périmètre. Build local : `task package` sur une machine
  Windows.

Autrement dit : la CI ne promet **aucun binaire mac/Windows** ; ces plateformes
restent des builds locaux (`task package` sur la machine cible).

---

## 📜 Licence

Open source — conserver l'attribution en cas de redistribution.

---

*tyyy — le portfolio du rat de [tyyy](https://github.com/yonlycode)*
