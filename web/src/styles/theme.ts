export const m3Theme = {
  // ── Palette: Dark mode by default ──────────────────────────────────
  colors: {
    // Surface layers (slate-950 → slate-50)
    surface: '#0B0F19',          // page background — near-black
    surfaceElevated: '#111827',  // card background
    surfaceHover: '#1E293B',     // hover state
    surfaceBorder: '#1E293B',    // default border
    surfaceBorderHover: '#6366F155', // purple glow border on hover

    // Text
    onSurface: '#F1F5F9',        // primary text (slate-100)
    onSurfaceMuted: '#94A3B8',   // secondary text (slate-400)
    onSurfaceDim: '#64748B',     // tertiary text (slate-500)

    // Accent — indigo/purple
    primary: '#6366F1',          // main accent (indigo-500)
    primaryHover: '#818CF8',     // hover (indigo-400)
    primaryDark: '#4F46E5',      // solid button bg (indigo-600)
    primarySoft: '#6366F118',    // subtle fill (12% opacity) — also aliased below
    primaryGlow: 'rgba(99, 102, 241, 0.35)', // glow shadow

    // Neon green — performance / status / availability
    success: '#34D399',          // neon green (emerald-400)
    successSoft: '#34D39922',    // subtle green fill

    // Gradients
    heroGradient: 'radial-gradient(ellipse 80% 60% at 10% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(52,211,153,0.06) 0%, transparent 50%), linear-gradient(180deg, #0B0F19 0%, #0F172A 100%)',
    glowGradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #4F46E5 100%)',
    textGradient: 'linear-gradient(135deg, #F1F5F9 0%, #818CF8 100%)',

    // Grid pattern for CTA
    gridPattern: 'rgba(148, 163, 184, 0.06)',

    // Footer
    footerBg: '#020617',         // slate-950
    footerBorder: '#1E293B',

    // Aliases for backward compatibility
    onPrimary: '#FFFFFF',        // text on primary (purple) bg
    primaryContainer: '#6366F122', // subtle purple fill
    secondary: '#818CF8',        // lighter indigo
    secondaryContainer: '#818CF818',
    onSecondaryContainer: '#F1F5F9',
    brandAccent: '#A5B4FC',      // lighter indigo accent
    outline: '#334155',          // darker border
    outlineVariant: '#1E293B',   // same as surfaceBorder
    onSurfaceVariant: '#94A3B8', // alias for onSurfaceMuted
  },

  gradients: {
    hero: 'radial-gradient(ellipse 80% 60% at 10% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(52,211,153,0.06) 0%, transparent 50%), linear-gradient(180deg, #0B0F19 0%, #0F172A 100%)',
    glow: 'linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #4F46E5 100%)',
    text: 'linear-gradient(135deg, #F1F5F9 0%, #818CF8 100%)',
  },

  // ── Elevation ──────────────────────────────────────────────────────
  elevation: {
    level0: 'none',
    level1: '0 1px 3px 0 rgba(0,0,0,0.4)',
    level2: '0 4px 12px rgba(0,0,0,0.35)',
    level3: '0 8px 24px rgba(0,0,0,0.4)',
    level4: '0 12px 32px rgba(0,0,0,0.45)',
    focus: '0 0 0 2px rgba(99, 102, 241, 0.5)',
    glow: '0 0 20px rgba(99,102,241,0.15)',
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
};
