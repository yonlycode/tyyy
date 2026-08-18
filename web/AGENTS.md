<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio Blog `yo-port` — Standards & Coding Context

**Current date:** 2026-08-17

## Stack & Conventions
- **Framework:** Next.js 16.x (app router, static export)
- **Language:** TypeScript 5
- **CSS-in-JS:** Emotion (`@emotion/react`, `@emotion/styled`)
- **Animations:** Framer Motion (`framer-motion`)
- **Markdown processing:** `gray-matter` + `remark` + `remark-html` + `reading-time`
- **Styling:** Material Design 3 color tokens (`src/styles/theme.ts`), all components styled via Emotion
- **Component pattern:** `AnimatedFadeIn` wrapper using `motion.div` with `initial={{opacity:0, y:15}}`, `animate={{opacity:1, y:0}}`
- **Data fetching:** Server-side at build time via `getSortedArticles()` / `getArticleBySlug()` reading from `/content`
- **Static generation:** `generateStaticParams` + `export output: 'export'` with `trailingSlash: true`
- **Analytics:** GA4 client-side script in `src/components/analytics.tsx`, injected from `src/app/layout.tsx`
- **CI/CD:** GitHub Actions deploy to GitHub Pages (`.github/workflows/deploy.yml`)

## Directory Structure
```
/content/
  articles/     → .md/.mdx articles (3 published)
  projects/     → .md project summaries (2 entries)
/src/
  app/          → Next.js pages (page, articles/[slug], portfolio, privacy)
  components/
    providers/  → ThemeProvider (Emotion wrapper)
    ui/         → Button, Card, Badge, Navbar, Footer (all Emotion styled)
    AnimatedFadeIn.tsx → motion.fade wrapper
    analytics.tsx → GA4 script injection
    index.ts    → UI barrel re-exports
  lib/
    md.ts       → getSortedArticles, getArticleBySlug
  styles/
    theme.ts    → M3 tokens (colors, elevation, radius)
next.config.ts  → output: 'export', unoptimized images, trailingSlash
package.json    → dependencies + devDependencies
.gitignore      → standard Next.js ignores