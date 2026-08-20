# yo-port — Portfolio & Blog

**yo-port** is a personal portfolio and blog website built with Next.js 16, TypeScript, and Material Design 3. It showcases my work as an independent software engineer and AI architect, featuring written articles and highlighted projects.

The site is fully static (SSG) and deployed on GitHub Pages via automatic CI/CD workflows.

---

## 📖 Overview

This project began as a clean Next.js app bootstrapped with `create-next-app` and has been customized into a fully functional portfolio platform with:

- 📝 **Article hub** — dynamically generated from Markdown files in `content/articles/`
- 🛠️ **Project showcase** — curated portfolio items in `content/projects/`
- 🔗 **Contact linktree** — a `/contact` page with all social links, configured via `content/links.json`
- 🎨 **Material Design 3 UI** — themed with Emotion, using the M3 color & elevation token system
- ✨ **Animated page transitions** — Framer Motion `AnimatedFadeIn` wrapper on all pages
- 📊 **Google Analytics 4** — client-side audience metrics via `@next/third-parties` (IP-anonymized, no personal data)
- 🔍 **SEO** — per-page Open Graph / Twitter / canonical metadata, JSON-LD structured data, generated OG images, `sitemap.xml`, `robots.txt` and PWA `manifest`
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
| **SEO & Metadata** | Centralized `src/lib/seo.ts` (`buildMetadata`, `absoluteUrl`) used by every page; OG/Twitter/canonical per page; `metadataBase` + title template in layout |
| **Structured Data** | `src/components/JsonLd.tsx` injects JSON-LD: `Person`/`WebSite` (home), `BlogPosting`/`CreativeWork` + `BreadcrumbList` (detail pages) |
| **Open Graph images** | Generated at build with `ImageResponse` (`next/og`): root + per-article + per-project, via `src/app/{articles,portfolio}/[slug]/opengraph-image.tsx` |
| **sitemap / robots / manifest** | `src/app/sitemap.ts` (17 URLs), `src/app/robots.ts`, `src/app/manifest.ts`, favicons `icon.png`/`apple-icon.png` |
| **Contact Page** | `/contact` linktree page driven by `content/links.json`, rendered with inline SVG icons |
| **Privacy Page** | Standalone `/privacy` page explaining analytics, hosting, and legal mentions |
| **GA4 Integration** | `@next/third-parties/google` `<GoogleAnalytics/>` in `src/app/layout.tsx` (replaces the former custom script) |
| **Deploy Script** | `.github/workflows/deploy.yml` — full GitHub Pages pipeline with caching and concurrency guard |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (app router, static export) |
| **Language** | TypeScript 5 |
| **Package manager** | Yarn 1.x (enforced via `packageManager` field, uses corepack) |
| **CSS-in-JS** | `@emotion/react`, `@emotion/styled` |
| **Animations** | `framer-motion` |
| **Markdown** | `gray-matter`, `remark`, `remark-html`, `reading-time` |
| **Design** | Material Design 3 token system |
| **Deployment** | GitHub Pages + GitHub Actions |
| **Analytics** | Google Analytics 4 via `@next/third-parties/google` |
| **SEO** | Next.js Metadata API + `ImageResponse` OG images + JSON-LD |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22+ LTS (corepack included)
- Yarn 1.x (auto-enabled via corepack from `packageManager` field)

### Installation
```bash
# Install dependencies (yarn enforced via corepack)
yarn install
```

> **Note:** Other managers (pnpm, npm) work but yarn is the only one guaranteed by `packageManager` in `package.json`.

### Development
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The page auto-reloads as you edit files. All UI components, pages, and content are hot-reloaded.

---

## 📦 Build & Export

```bash
yarn build
```

This generates the static output in `./out/`. The site can then be served with any static file server (GitHub Pages, Vercel, Netlify, etc.).

---

## 📁 Content Structure

```
content/
├── articles/           # Blog posts (.md/.mdx)
│   ├── deepseek-harness-architecture-modele-brut.md
│   ├── open-source-local-couts-realite.md
│   └── setup-hybride-modeles-locaux-google.md
├── projects/           # Portfolio items (.md/.mdx)
│   ├── portfolio-ai.md
│   ├── portfolio-web-performance.md
│   └── ty3-portfolio.md
└── links.json          # Contact/social links for the /contact linktree page
```

### Article Frontmatter (YAML)
Each `.md` file in `content/articles/` can contain:

```markdown
---
title: "Mon article"
description: "Description courte"
date: 2024-03-15
tags: ["tag1", "tag2"]
canonicalUrl: "https://externe.com/url-canonique"   # optionnel
published: true
---
```

The `reading-time` package automatically estimates read time from the content.

### Project Frontmatter
Each `.md` file in `content/projects/` follows the same structure with `title`, `description`, `date`, and `tags`.

### Contact Links (`content/links.json`)
The `/contact` linktree page is driven by a single JSON file:

```json
{
  "title": "Retrouvez-moi",
  "subtitle": "Tous mes liens et réseaux au même endroit",
  "links": [
    { "id": "github", "label": "GitHub", "url": "https://github.com/...", "icon": "github", "enabled": true }
  ]
}
```

- `icon` selects the inline SVG in `src/components/contact/LinkIcon.tsx` (`github`, `linkedin`, `twitter`, `email`, `link`, fallback `link`).
- `enabled: false` hides the link on the site (still editable in the JSON).
- Link order in the array defines display order. Editable from the admin desktop app (`admin/`).

---

## 🌐 Pages

| Page | Path | Description |
|---|---|---|
| **Home** | `/` | Hero intro + CTA to articles |
| **Articles** | `/articles/` | Grid of all published articles with read-time badges |
| **Article** | `/articles/[slug]/` | Dynamic page per article with full HTML content |
| **Portfolio** | `/portfolio/` | Grid of highlighted projects |
| **Contact** | `/contact/` | Linktree page of social/contact links from `content/links.json` |
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
    - `yarn install --frozen-lockfile`
    - `yarn build` (generates `./out/`)
    - Uploads `./web/out` as artifact
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
- `basePath` / `assetPrefix` set to `/tyyy` in production (GitHub Pages sub-path)

---

## 🔍 SEO

The site is fully indexable out of the box. Highlights:

- **Central config** — `src/lib/seo.ts` exports `SITE_URL` (`https://yonlycode.github.io/tyyy/`), `absoluteUrl()`, and `buildMetadata()`, reused by every page to keep metadata consistent.
- **Per-page metadata** — every route exports Open Graph, Twitter (`summary_large_image`), canonical (with optional `canonicalUrl` frontmatter override), keywords and authors. Dynamic pages set `publishedTime`, `article:tag`, etc.
- **Structured data (JSON-LD)** — `Person` + `WebSite` on the home page; `BlogPosting`/`CreativeWork` + `BreadcrumbList` on detail pages, injected via `src/components/JsonLd.tsx`.
- **Open Graph images** — generated at build time with `ImageResponse` (`next/og`): a global one in `src/app/opengraph-image.tsx` plus one per article and per project. Visual template in `src/components/og/OGImage.tsx`.
- **Files** — `sitemap.xml` (17 URLs), `robots.txt`, `manifest.webmanifest`, `icon.png` + `apple-icon.png`.

> **Static-export caveats** (kept intentionally):
> - Metadata/OG route handlers export `dynamic = "force-static"`, and dynamic OG images export `generateStaticParams()` — required by `output: 'export'`.
> - Next.js does **not** auto-inject `og:image` meta tags in static export, so every page passes its `images` explicitly to `buildMetadata` (absolute URL, no trailing slash).

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
