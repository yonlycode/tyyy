/**
 * Thème Emotion du portfolio — socle harmonisé sur les tokens kady-ui.
 *
 * Dual theme : les couleurs ne sont plus des hex en dur mais des
 * var(--kady-*) définis dans public/tokens.css (light + dark, bascule via
 * [data-theme] sur <html>, piloté par KadyNavbar + script anti-flash).
 * Les composants Emotion rendent du CSS contenant var()/color-mix() : la
 * cascade résout la valeur au paint, le toggle bascule toute la page sans
 * re-render. Les NOMS de clés sont conservés à l'identique — les consommateurs
 * (m3Theme.colors.xxx) ne changent pas d'API.
 *
 * Mapping M3 → kady (dark / light) :
 *   primary            → --kady-primary          (#6B5CE7 / #5949D6)
 *   secondary,
 *   primaryDark        → --kady-primary-strong   (#5949D6 / #3C2E9B)
 *   accent, brandAccent→ --kady-accent           (#00D4AA / #00876B)
 *   success            → --kady-success          (#22C55E / #16A34A)
 *   background.primary,
 *   surface, footerBg  → --kady-bg-abysse/paper  (#080B14 / #F8FAFC)
 *   background.secondary,
 *   surfaceElevated    → --kady-surface          (#111827 / #FFFFFF)
 *   background.tertiary,
 *   surfaceHover       → --kady-surface-raised   (#1E293B / #F1F5F9)
 *   onSurface          → --kady-ink              (#F1F5F9 / #0F172A)
 *   onSurfaceMuted,
 *   onSurfaceDim       → --kady-ink-muted        (#94A3B8 / #64748B)
 *   borders/outlines   → --kady-line / color-mix(ink)
 *   elevation          → --kady-shadow-sm/md/glow-primary
 *
 * NB : onSurfaceDim = onSurfaceMuted volontairement — kady n'a pas de
 * troisième niveau de texte ; un dim en alpha serait sous 4.5:1 en light.
 */
export const m3Theme = {
  // ── Palette: dual theme via tokens kady-ui (--kady-*) ───────────────
  colors: {
    // Base de marque
    primary: 'var(--kady-primary)',
    secondary: 'var(--kady-primary-strong)',
    accent: 'var(--kady-accent)',
    border: 'var(--kady-line)',
    background: {
      primary: 'var(--kady-bg-abysse)',
      secondary: 'var(--kady-surface)',
      tertiary: 'var(--kady-surface-raised)',
    },

    // Surface layers
    surface: 'var(--kady-paper)',                 // page background
    surfaceElevated: 'var(--kady-surface)',       // card background
    surfaceHover: 'var(--kady-surface-raised)',   // hover state
    surfaceBorder: 'var(--kady-line)',            // default border
    surfaceBorderHover: 'color-mix(in srgb, var(--kady-primary) 40%, transparent)',

    // Text
    onSurface: 'var(--kady-ink)',
    onSurfaceMuted: 'var(--kady-ink-muted)',
    onSurfaceDim: 'var(--kady-ink-muted)',        // cf. note d'en-tête

    // Accent primaire
    primaryHover: 'var(--kady-primary-hover)',
    primaryDark: 'var(--kady-primary-strong)',    // solid button bg
    primarySoft: 'color-mix(in srgb, var(--kady-primary) 14%, transparent)',
    primaryGlow: 'color-mix(in srgb, var(--kady-primary) 35%, transparent)',

    // Status / Success
    success: 'var(--kady-success)',
    successSoft: 'color-mix(in srgb, var(--kady-success) 15%, transparent)',

    // Gradients
    heroGradient:
      'radial-gradient(ellipse 80% 60% at 10% 0%, color-mix(in srgb, var(--kady-primary) 16%, transparent) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, color-mix(in srgb, var(--kady-accent) 9%, transparent) 0%, transparent 50%), linear-gradient(180deg, var(--kady-paper) 0%, var(--kady-surface) 100%)',
    glowGradient:
      'linear-gradient(135deg, var(--kady-primary) 0%, var(--kady-primary-strong) 50%, var(--kady-accent) 100%)',
    textGradient:
      'linear-gradient(135deg, var(--kady-ink) 0%, var(--kady-primary) 50%, var(--kady-accent) 100%)',

    // Grid pattern for CTA
    gridPattern: 'color-mix(in srgb, var(--kady-ink) 4%, transparent)',

    // Footer
    footerBg: 'var(--kady-paper)',
    footerBorder: 'var(--kady-line)',

    // Aliases for backward compatibility
    onPrimary: '#FFFFFF',                         // invariant : texte blanc sur violet, dans les deux thèmes
    primaryContainer: 'color-mix(in srgb, var(--kady-primary) 18%, transparent)',
    secondaryContainer: 'color-mix(in srgb, var(--kady-primary-strong) 18%, transparent)',
    onSecondaryContainer: 'var(--kady-ink)',
    brandAccent: 'var(--kady-accent)',
    outline: 'color-mix(in srgb, var(--kady-ink) 16%, transparent)',
    outlineVariant: 'var(--kady-line)',
    onSurfaceVariant: 'var(--kady-ink-muted)',
  },

  gradients: {
    hero: 'radial-gradient(ellipse 80% 60% at 10% 0%, color-mix(in srgb, var(--kady-primary) 16%, transparent) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, color-mix(in srgb, var(--kady-accent) 9%, transparent) 0%, transparent 50%), linear-gradient(180deg, var(--kady-paper) 0%, var(--kady-surface) 100%)',
    glow: 'linear-gradient(135deg, var(--kady-primary) 0%, var(--kady-primary-strong) 50%, var(--kady-accent) 100%)',
    text: 'linear-gradient(135deg, var(--kady-ink) 0%, var(--kady-primary) 50%, var(--kady-accent) 100%)',
  },

  // ── Elevation (tokens d'ombre kady, adaptés light/dark) ────────────
  elevation: {
    level0: 'none',
    level1: 'var(--kady-shadow-sm)',
    level2: 'var(--kady-shadow-md)',
    level3: 'var(--kady-shadow-md)',
    level4: 'var(--kady-shadow-md)',
    focus: '0 0 0 2px color-mix(in srgb, var(--kady-primary) 50%, transparent)',
    glow: 'var(--kady-shadow-glow-primary)',
  },

  // ── Radius ─────────────────────────────────────────────────────────
  radius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    extraLarge: '20px',
    circular: '9999px',
  },

  // ── Spacing ────────────────────────────────────────────────────────
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '5rem',
    section: '6rem',
  },

  // ── Typography ─────────────────────────────────────────────────────
  font: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', ui-monospace, Menlo, monospace",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.375rem',
      '2xl': '1.75rem',
      '3xl': '2.5rem',
      '4xl': '3rem',
      '5xl': '3.75rem',
      '6xl': '4.5rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.1,
      snug: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // ── Animation ──────────────────────────────────────────────────────
  animation: {
    fast: '0.15s ease',
    base: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // ── Z-index ────────────────────────────────────────────────────────
  z: {
    base: 1,
    elevated: 10,
    navbar: 100,
    overlay: 1000,
  },

  // ── Breakpoints ───────────────────────────────────────────────────
  breakpoints: {
    mobile: 640, // max-width
    tablet: 900, // max-width
  },
};
