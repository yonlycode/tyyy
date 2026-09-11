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

## 🎨 Convention de style : séparation logique / style

**Règle : un composant ne contient jamais de `styled()`.** Les composants Emotion
vivent dans un module de styles colocataire, au format `<Nom>.styles.ts`.

```
src/components/ui/Navbar.tsx          → logique + JSX uniquement
src/components/ui/Navbar.styles.ts    → tous les styled() + keyframes()
```

### Que met-on dans `<Nom>.styles.ts`
- les `styled(...)` (et leurs variantes dérivées : `styled(Button)({...})`)
- les `keyframes`
- les types de props utilisés **uniquement** par les styles
- `import { m3Theme } from '@/styles/theme'` — jamais de valeur hard-codée
- `'use client';` en tête de fichier (le module est consommé par des client components)

### Que reste-t-il dans `<Nom>.tsx`
- les hooks, l'état, les handlers, le routage
- les props publiques du composant et sa signature
- le JSX, qui importe les primitives depuis `./<Nom>.styles`

### Deux formes de fichiers
| Cas | Fichiers | Exemple |
|---|---|---|
| **Primitive pure** (aucune logique, que des styled) | `<Nom>.styles.ts` seul, pas de `.tsx` | `Button`, `Card`, `Badge`, `Container`, `Section` |
| **Composant mixte** (logique + styles) | `<Nom>.tsx` + `<Nom>.styles.ts` | `Navbar`, `MultiSelect`, `Footer`, `Stat` |

### Barrel (`src/components/ui/index.ts`)
- primitive pure → `export * from './Button.styles';`
- composant mixte → `export * from './Navbar';` **seulement**

Le module de styles d'un composant mixte n'est **jamais** réexposé par le barrel :
c'est un détail d'implémentation. Un consommateur qui a besoin d'une primitive
interne (ex. `LogoMark`) l'importe par son chemin direct :

```ts
import { LogoMark } from './Navbar.styles';
```

### Conventions de noms
- Props de style transitoires préfixées par `$` (`$active`, `$open`) pour ne pas
  fuir dans le DOM.
- Un styled ne doit **pas** porter le même nom qu'un type importé du domaine
  (piège : `const ArticleMeta = styled(...)` collisionnait avec `type ArticleMeta`
  de `@/lib/md` — renommé en `MetaRow`).
- **Data fetching:** Server-side at build time via `getSortedArticles()` / `getArticleBySlug()` reading from `/content`
- **Static generation:** `generateStaticParams` + `export output: 'export'` with `trailingSlash: true`
- **Analytics:** GA4 via `@next/third-parties/google` (`<GoogleAnalytics/>`), injected from `src/app/layout.tsx`
- **SEO:** centralized `src/lib/seo.ts` helper (`buildMetadata`, `absoluteUrl`, site config) used by every page
- **CI/CD:** GitHub Actions deploy to GitHub Pages (`.github/workflows/deploy.yml`) — builds with `yarn`

## ✍️ Rédaction des articles (`content/articles/*.md`)

### 🚫 Pattern banni — « ce n'est pas X. C'est Y. »

**Interdit dans toute prose générée ou réécrite.** Cette figure (négation puis correction, en deux temps) est un tic de rédaction IA : elle oblige le lecteur à maintenir une négation en mémoire avant de recevoir l'information, et elle installe un homme de paille pour mieux le faire tomber.

Toutes les variantes comptent comme le même pattern :

| Variante | Exemple à bannir |
|---|---|
| Présent | « Ce qui a bougé **n'est pas** le matériel. **C'est** une décision d'ingénierie. » |
| Imparfait | « Ce qu'il fallait, **ce n'était pas** plus de puissance. **C'était** un moteur qui… » |
| Passé au « mais » | « La question **n'est plus** « ça rentre dans les 24 Go », **mais** « l'engine sait-il… » » |
| Miroir (affirmation puis fragment négatif) | « C'est ça, la vraie rupture. **Pas** un pic de benchmark. Une courbe qui ne plie pas. » |
| Escalade par négations | « **Pas** de moitié. **Pas** de 20 %. D'un facteur quatre à sept… » |

**Ce qu'on fait à la place** — le fait doit porter l'argument tout seul :

- **Attaquer par le fait concret** : « À ces chiffres, le local fait mieux que le cloud, chez soi, sans facture récurrente. »
- **Déplacer vers la conséquence** : « Sans cette densité, le modèle ne tient tout simplement pas. »
- **Tourner en question** : « La question change alors de nature : l'engine sait-il exploiter les 124 Go disponibles sans se faire mentir par le noyau ? »
- **Faire porter la contraste par le sujet, pas par la négation** : « Le matériel, lui, n'a pas bougé d'un pouce. Ce qui a changé tient dans une décision d'ingénierie. »
- **Varier le rythme** : si deux phrases d'affilée corrigent une idée, en supprimer une.

**Ce qui N'EST PAS banni** (précision idiomatique, à conserver) :

- La négation *terminale* qui écarte une confusion réelle : « Regardez la pente, **pas** les ratios. » · « `gttsize` et `ttm.pages_limit` sont des dimensions, **pas** des constantes. » · « Quatre conversations, **pas** quarante. »
- Le constat factuel d'absence : « **Pas de** response store. » · « **Pas de** préemption, **pas de** paging. »
- Toute phrase où l'on ne peut pas retirer la négation sans perdre de l'information.

**Test rapide** : si la première phrase de la figure ne contient aucune information et n'existe que pour être niée, elle doit partir.

### Contrat de contenu

- **Frontmatter strict** : `title`, `description`, `date` (`YYYY-MM-DD`), `tags`, `published`. Rien d'autre — pas de `platform`, `status`, `context`, `word_count` (le champ `description` porte le rôle du « contexte » ; le temps de lecture est calculé par `reading-time`).
- **`published: false`** masque l'article partout (filtre dans `getSortedArticles()`), y compris sitemap et OG.
- **Slug** : kebab-case sans accents, sujet + angle, ex. `baidu-unlimited-ocr-r-swa-kv-cache`.
- **Tags** : minuscules en kebab-case (`local-first`, `local-inference`, `sovereignty`).
- **`description`** : 175–200 caractères. Au-delà, l'image OG déborde (template `OGFrame` : titre 60px / `maxWidth` 960, sous-titre 30px / `maxWidth` 900, zone utile 502px).
- **H1 en tête de corps** : le titre est répété en `#` après le frontmatter (commun à tous les articles).
- **Pas de ligne de hashtags en fin d'article** : les tags sont déjà rendus en badges par `ArticleView`.
- **Tables et blocs de code** : supportés via `remark-gfm`. Le style vit dans `src/app/globals.css` (`.article-body table`, `.article-body pre`) — à étendre plutôt que de bricoler en inline.
- **Vérifier après ajout** : `yarn build` (l'article doit apparaître dans `/articles`, le sitemap et générer son `opengraph-image`).

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
    ui/         → primitives UI. Chaque module a son <Nom>.styles.ts (Emotion) ;
                 les primitives sans logique n'ont QUE le .styles.ts (Button, Card,
                 Badge, Container, Section)
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