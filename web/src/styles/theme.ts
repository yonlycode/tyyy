export const m3Theme = {
  // ── Palette: Dark mode by default (DA Karulab) ──────────────────────
  colors: {
    // DA Karulab Core Palette
    primary: '#6B5CE7',          // violet Karuka
    secondary: '#5A4AD1',
    accent: '#00D4AA',           // Teal Caraïbes
    border: 'rgba(255, 255, 255, 0.08)',
    background: {
      primary: '#080B14',        // fond abysse
      secondary: '#0F1526',
      tertiary: '#171F38',
    },

    // Surface layers (mapped to DA Karulab)
    surface: '#080B14',          // page background — fond abysse
    surfaceElevated: '#0F1526',  // card background
    surfaceHover: '#171F38',     // hover state
    surfaceBorder: 'rgba(255, 255, 255, 0.08)',    // default border
    surfaceBorderHover: 'rgba(107, 92, 231, 0.4)', // violet Karuka glow border on hover

    // Text
    onSurface: '#F1F5F9',        // primary text (slate-100)
    onSurfaceMuted: '#94A3B8',   // secondary text (slate-400)
    onSurfaceDim: '#64748B',     // tertiary text (slate-500)

    // Accent — violet Karuka
    primaryHover: '#7D6FF0',     // hover
    primaryDark: '#5A4AD1',      // solid button bg
    primarySoft: 'rgba(107, 92, 231, 0.14)',    // subtle fill
    primaryGlow: 'rgba(107, 92, 231, 0.35)', // glow shadow

    // Status / Success (Teal Caraïbes)
    success: '#00D4AA',          // Teal Caraïbes
    successSoft: 'rgba(0, 212, 170, 0.15)',

    // Gradients
    heroGradient: 'radial-gradient(ellipse 80% 60% at 10% 0%, rgba(107, 92, 231, 0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(0, 212, 170, 0.09) 0%, transparent 50%), linear-gradient(180deg, #080B14 0%, #0F1526 100%)',
    glowGradient: 'linear-gradient(135deg, #6B5CE7 0%, #5A4AD1 50%, #00D4AA 100%)',
    textGradient: 'linear-gradient(135deg, #F1F5F9 0%, #6B5CE7 50%, #00D4AA 100%)',

    // Grid pattern for CTA
    gridPattern: 'rgba(255, 255, 255, 0.04)',

    // Footer
    footerBg: '#080B14',
    footerBorder: 'rgba(255, 255, 255, 0.08)',

    // Aliases for backward compatibility
    onPrimary: '#FFFFFF',        // text on primary bg
    primaryContainer: 'rgba(107, 92, 231, 0.18)',
    secondaryContainer: 'rgba(90, 74, 209, 0.18)',
    onSecondaryContainer: '#F1F5F9',
    brandAccent: '#00D4AA',      // Teal Caraïbes
    outline: 'rgba(255, 255, 255, 0.12)',
    outlineVariant: 'rgba(255, 255, 255, 0.08)',
    onSurfaceVariant: '#94A3B8',
  },

  gradients: {
    hero: 'radial-gradient(ellipse 80% 60% at 10% 0%, rgba(107, 92, 231, 0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(0, 212, 170, 0.09) 0%, transparent 50%), linear-gradient(180deg, #080B14 0%, #0F1526 100%)',
    glow: 'linear-gradient(135deg, #6B5CE7 0%, #5A4AD1 50%, #00D4AA 100%)',
    text: 'linear-gradient(135deg, #F1F5F9 0%, #6B5CE7 50%, #00D4AA 100%)',
  },

  // ── Elevation ──────────────────────────────────────────────────────
  elevation: {
    level0: 'none',
    level1: '0 1px 3px 0 rgba(0,0,0,0.4)',
    level2: '0 4px 12px rgba(0,0,0,0.35)',
    level3: '0 8px 24px rgba(0,0,0,0.4)',
    level4: '0 12px 32px rgba(0,0,0,0.45)',
    focus: '0 0 0 2px rgba(107, 92, 231, 0.5)',
    glow: '0 0 24px rgba(107, 92, 231, 0.25)',
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
