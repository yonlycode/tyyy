export const m3Theme = {
  colors: {
    // Primary palette - M3 Purple base
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',

    // Extended M3 semantic colors for AI/technical profile
    secondary: '#5E35B1',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8C9FF',
    onSecondaryContainer: '#1A0050',

    // Success/Warning/Error for governance & reliability
    success: '#2E7D32',
    onSuccess: '#FFFFFF',
    successContainer: '#DCEDC8',
    onSuccessContainer: '#1B5E20',

    warning: '#F57F17',
    onWarning: '#FFFFFF',
    warningContainer: '#FFF3E0',
    onWarningContainer: '#B45F04',

    error: '#D32F2F',
    onError: '#FFFFFF',
    errorContainer: '#FFCDD2',
    onErrorContainer: '#B71C1C',

    // Info/technical accent
    info: '#0288D1',
    onInfo: '#FFFFFF',
    infoContainer: '#E3F2FD',
    onInfoContainer: '#01579B',

    // Surface system with depth for layered UI
    surface: '#FEF7FF',
    onSurface: '#1D1B20',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',
    surfaceDim: '#E0D8F0',
    surfaceBright: '#FCFBFF',

    // Outline & divider
    outline: '#79747E',
    outlineVariant: '#B0A8BC',

    // Background gradients for hero sections
    background: '#FEF7FF',
    surfaceBackground: '#FFFFFF',

    // Badge/state colors aligned with M3
    badge: '#6750A4',
    badgeOn: '#FFFFFF',

    // Chat/agent message colors
    agentMessage: '#E8EAED',
    userMessage: '#DCF8C6',

    // Brand accent for highlights
    brandAccent: '#BB86FC',
    brandOnAccent: '#0A0A0A',

    // Additional expressive tones for depth
    primarySoft: '#E8DEF8',
    secondarySoft: '#F3EDF9',
    lavender: '#D0BCFF',
    deep: '#1C1B1F',
  },
  gradients: {
    hero: 'radial-gradient(120% 120% at 20% 0%, #EADDFF 0%, transparent 55%), radial-gradient(120% 120% at 90% 10%, #E8C9FF 0%, transparent 50%), linear-gradient(160deg, #FEF7FF 0%, #F3EDF9 100%)',
    glow: 'linear-gradient(135deg, #6750A4 0%, #BB86FC 50%, #5E35B1 100%)',
    text: 'linear-gradient(120deg, #6750A4 0%, #BB86FC 55%, #5E35B1 100%)',
  },
  elevation: {
    level0: 'none',
    level1: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
    level2: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
    level3: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)',
    level4: '0px 8px 16px 4px rgba(0, 0, 0, 0.12), 0px 4px 8px 2px rgba(0, 0, 0, 0.20)',
    // Subtle focus ring for accessibility
    focus: '0 0 0 2px rgba(103, 80, 164, 0.4)',
  },
  radius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    extraLarge: '28px',
    circular: '9999px',
  },
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
  font: {
    family:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'SF Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.375rem',
      '2xl': '1.75rem',
      '3xl': '2.25rem',
      '4xl': '3rem',
      '5xl': '3.75rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.15,
      snug: 1.3,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  animation: {
    fast: '0.15s ease',
    base: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  z: {
    base: 1,
    elevated: 10,
    navbar: 100,
    overlay: 1000,
  },
};