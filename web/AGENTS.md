<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio Blog `yo-port` — Standards & Coding Context

**Current date:** 2026-08-19

## Stack & Conventions
- **Framework:** Next.js 16.x (app router, static export)
- **Runtime:** Node.js 22+ LTS
- **Language:** TypeScript 5
- **Package manager:** Yarn 1.x (enforced via `packageManager` in `package.json`, uses corepack)
- **CSS-in-JS:** Emotion (`@emotion/react`, `@emotion/styled`)
- **Animations:** Framer Motion (`framer-motion`)
- **Markdown processing:** `gray-matter` + `remark` + `remark-html` + `reading-time`
- **Styling:** Material Design 3 color tokens (`src/styles/theme.ts`), all components styled via Emotion
- **Component pattern:** `AnimatedFadeIn` wrapper using `motion.div` with `initial={{opacity:0, y:15}}`, `animate={{opacity:1, y:0}}`
- **Data fetching:** Server-side at build time via `getSortedArticles()` / `getArticleBySlug()` reading from `/content`
- **Static generation:** `generateStaticParams` + `export output: 'export'` with `trailingSlash: true`
- **Analytics:** GA4 via `@next/third-parties/google` (`<GoogleAnalytics/>`), injected from `src/app/layout.tsx`
- **SEO:** centralized `src/lib/seo.ts` helper (`buildMetadata`, `absoluteUrl`, site config) used by every page
- **CI/CD:** GitHub Actions deploy to GitHub Pages (`.github/workflows/deploy.yml`) — builds with `yarn`

## SEO & Metadata
- **Site URL:** `https://yonlycode.github.io/tyyy/` (GitHub Pages + `basePath: '/tyyy'`). All absolute URLs are built via `absoluteUrl()` in `src/lib/seo.ts`; `metadataBase` is set in `src/app/layout.tsx`.
- **Per-page metadata:** every page exports `metadata` via `buildMetadata({ title, description, path, type, images, ... })`. Dynamic pages (`articles/[slug]`, `portfolio/[slug]`) use `generateMetadata` with `publishedTime`, `tags`, canonical (`canonicalUrl` frontmatter override), and article-type OG.
- **Structured data:** `src/components/JsonLd.tsx` injects `<script type="application/ld+json">`. `Person` + `WebSite` on the home page; `BlogPosting`/`CreativeWork` + `BreadcrumbList` on detail pages.
- **Open Graph images:** generated at build time with `ImageResponse` (`next/og`) in `src/app/opengraph-image.tsx`, `src/app/articles/[slug]/opengraph-image.tsx`, `src/app/portfolio/[slug]/opengraph-image.tsx`. Shared visual template: `src/components/og/OGImage.tsx`.
- **Robots / sitemap / manifest:** `src/app/robots.ts`, `src/app/sitemap.ts` (17 URLs: static + articles + projects), `src/app/manifest.ts`. Icons via `src/app/icon.png` + `src/app/apple-icon.png` (copies of `public/favicon.png`, 256px).
- **⚠ Static export caveats (do not "fix"):**
  - Every metadata/OG route handler needs `export const dynamic = "force-static"`, and dynamic OG routes need `generateStaticParams()`, or the `output: 'export'` build fails.
  - With static export, Next.js does **not** auto-inject `og:image` meta tags from the file conventions — pages must pass `images` to `buildMetadata` (absolute URL, no trailing slash). `absoluteUrl` treats `*-image` segments as files (no trailing slash).
  - All canonical/OG/sitemap URLs include the `/tyyy` basePath on purpose.

## Directory Structure
```
/content/
  articles/     → .md/.mdx articles
  projects/     → .md project summaries
  links.json    → contact links for the linktree page (managed via admin)
/src/
  app/          → Next.js pages + SEO files:
    layout.tsx    → root metadata, metadataBase, fonts, GA4 (@next/third-parties)
    page.tsx      → home (Person/WebSite JSON-LD)
    articles/     → listing + [slug] (BlogPosting JSON-LD + dynamic OG image)
    portfolio/    → listing + [slug] (CreativeWork JSON-LD + dynamic OG image)
    contact/      → linktree page
    privacy/      → legal mentions
    robots.ts     → robots.txt (force-static)
    sitemap.ts    → sitemap.xml (force-static)
    manifest.ts   → PWA manifest (force-static)
    opengraph-image.tsx → root OG image (ImageResponse)
    icon.png / apple-icon.png → favicons (copies of public/favicon.png)
  components/
    providers/  → ThemeProvider (Emotion wrapper)
    ui/         → Button, Card, Badge, Navbar, Footer, PageHero (all Emotion styled)
    contact/    → ContactView (linktree page) + LinkIcon (inline SVG icons)
    og/         → OGFrame shared template for generated OG images
    AnimatedFadeIn.tsx → motion.fade wrapper
    JsonLd.tsx  → JSON-LD script injection
    index.ts    → UI barrel re-exports
  lib/
    md.ts       → getSortedArticles, getArticleBySlug
    links.ts    → getLinks (reads content/links.json)
    seo.ts      → SITE config, absoluteUrl, buildMetadata (shared by all pages)
  styles/
    theme.ts    → M3 tokens (colors, elevation, radius)
next.config.ts  → output: 'export', basePath/assetPrefix '/tyyy', unoptimized images, trailingSlash
package.json    → dependencies + devDependencies
.gitignore      → standard Next.js ignores

## Contact (linktree) page
- Data source: `content/links.json` (`{ title, subtitle, links[] }`), read at build time by `src/lib/links.ts` → `getLinks()` (filters `enabled` links).
- Route: `/contact/` (linked from the navbar); the `privacy` page remains separate.
- UI: `src/components/contact/ContactView.tsx` renders a centered list of buttons; `LinkIcon.tsx` maps `icon` names (`github`, `linkedin`, `twitter`, `email`, `link`, fallback `link`) to inline SVGs.
- Editable from the admin desktop app (see `admin/AGENTS.md`).