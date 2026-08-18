# yo-port — Portfolio & Blog

**yo-port** is a personal portfolio and blog website built with Next.js 16, TypeScript, and Material Design 3. It showcases my work as an independent software engineer and AI architect, featuring written articles and highlighted projects.

The site is fully static (SSG) and deployed on GitHub Pages via automatic CI/CD workflows.

---

## 📖 Overview

This project began as a clean Next.js app bootstrapped with `create-next-app` and has been customized into a fully functional portfolio platform with:

- 📝 **Article hub** — dynamically generated from Markdown files in `content/articles/`
- 🛠️ **Project showcase** — curated portfolio items in `content/projects/`
- 🎨 **Material Design 3 UI** — themed with Emotion, using the M3 color & elevation token system
- ✨ **Animated page transitions** — Framer Motion `AnimatedFadeIn` wrapper on all pages
- 📊 **Google Analytics 4** — client-side audience metrics (IP-anonymized, no personal data)
- 🛡️ **Privacy-first design** — RGPD/CNIL compliant, no intrusive cookie banner
- 🚀 **Static export** — `output: 'export'` for GitHub Pages deployment
- ⚙️ **CI/CD** — GitHub Actions builds and deploys on every `main` branch push

---

## ✨ Features

| Feature | Description |
|---|---|
| **Static Site Generation** | `next.config.ts` forces `output: 'export'` with `trailingSlash: true` for GitHub Pages compatibility |
| **Markdown Content** | `src/lib/md.ts` parses YAML frontmatter + Markdown via `gray-matter` + `remark` + `reading-time` |
| **Material Design 3** | Color tokens (`#6750A4` primary), elevation levels, radius sizes — all in `src/styles/theme.ts` |
| **Responsive UI** | Card, Button, Badge, Navbar, Footer components — all Emotion styled with M3 tokens |
| **Animated Fade-In** | `src/components/AnimatedFadeIn.tsx` uses `motion.div` with `initial={{opacity:0, y:15}}` |
| **Dynamic Article Pages** | `[slug]` route with `generateStaticParams` + `generateMetadata` |
| **Privacy Page** | Standalone `/privacy` page explaining analytics, hosting, and legal mentions |
| **GA4 Integration** | `src/components/analytics.tsx` injects the GA script only when `gaId` is set |
| **Deploy Script** | `.github/workflows/deploy.yml` — full GitHub Pages pipeline with caching and concurrency guard |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (app router, static export) |
| **Language** | TypeScript 5 |
| **CSS-in-JS** | `@emotion/react`, `@emotion/styled` |
| **Animations** | `framer-motion` |
| **Markdown** | `gray-matter`, `remark`, `remark-html`, `reading-time` |
| **Design** | Material Design 3 token system |
| **Deployment** | GitHub Pages + GitHub Actions |
| **Analytics** | Google Analytics 4 (client-side) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm / npm / yarn

### Installation
```bash
# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### Development
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The page auto-reloads as you edit files. All UI components, pages, and content are hot-reloaded.

---

## 📦 Build & Export

```bash
pnpm build
# or
npm run build
# or
yarn build
```

This generates the static output in `./out/`. The site can then be served with any static file server (GitHub Pages, Vercel, Netlify, etc.).

---

## 📁 Content Structure

```
content/
├── articles/           # Blog posts (.md/.mdx)
│   ├── ai-architecture.md
│   ├── typescript-best-practices.md
│   └── web-performance.md
└── projects/           # Portfolio items (.md/.mdx)
    ├── portfolio-ai.md
    └── portfolio-web-performance.md
```

### Article Frontmatter (YAML)
Each `.md` file in `content/articles/` can contain:

```markdown
---
title: "Mon article"
description: "Description courte"
date: 2024-03-15
tags: ["tag1", "tag2"]
published: true
---
```

The `reading-time` package automatically estimates read time from the content.

### Project Frontmatter
Each `.md` file in `content/projects/` follows the same structure with `title`, `description`, `date`, and `tags`.

---

## 🌐 Pages

| Page | Path | Description |
|---|---|---|
| **Home** | `/` | Hero intro + CTA to articles |
| **Articles** | `/articles/` | Grid of all published articles with read-time badges |
| **Article** | `/articles/[slug]/` | Dynamic page per article with full HTML content |
| **Portfolio** | `/portfolio/` | Grid of highlighted projects |
| **Privacy** | `/privacy/` | Legal mentions, hosting info, GA4 disclosure |

---

## 🎨 UI Components

All components are Emotion-styled and use the M3 token system from `src/styles/theme.ts`:

- **`Button`** — primary action, hover shifts to `primaryContainer`
- **`Card`** — surface background with level-1 elevation, medium radius
- **`Badge`** — surfaceVariant background, small radius
- **`Navbar`** — top navigation with logo + links
- **`Footer`** — bottom footer with legal/text layout
- **`AnimatedFadeIn`** — wrapper that fades in from `y: 15` → `0`

All components live in `src/components/ui/` and are re-exported via `src/components/ui/index.ts`.

---

## 📡 Deployment

### GitHub Pages (automatic)
1. Push to the `main` branch
2. The `.github/workflows/deploy.yml` workflow triggers:
   - Checkout + Node 20 cache
   - `npm ci`
   - `npm run build` (generates `./out/`)
   - Uploads `./out` as artifact
   - Deploys to GitHub Pages

### Manual deployment
```bash
# If using Vercel:
vercel deploy

# Or serve the static output locally:
npx serve out
```

The `next.config.ts` is configured for static export compatibility:
- `output: 'export'`
- `images: { unoptimized: true }` (required for static export)
- `trailingSlash: true`

---

## 📜 License

This project is open source. Feel free to explore, fork, or adapt — but please retain attribution if redistributing.

---

## 🛠️ Available Scripts

| Script | Description |
|---|---|
| `dev` | Start Next.js dev server at `localhost:3000` |
| `build` | Generate static export in `./out/` |
| `start` | Serve the built output locally |
| `lint` | Run ESLint |

---

*Generated with ❤️ by Yoann Fort — Independent Software Engineer & AI Architect*