'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/* ── Unified link cards ──────────────────────────────────────────── */

export const LinkGrid = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.md,
  maxWidth: '520px',
  margin: '0 auto',
});

export const LinkCard = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: m3Theme.spacing.md,
  background: m3Theme.colors.surface,
  border: `1px solid ${m3Theme.colors.outlineVariant}`,
  borderRadius: m3Theme.radius.large,
  padding: m3Theme.spacing.lg,
  color: m3Theme.colors.onSurface,
  textDecoration: 'none',
  fontWeight: m3Theme.font.weights.semibold,
  fontSize: m3Theme.font.sizes.lg,
  boxShadow: m3Theme.elevation.level1,
  transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',

  '&:hover': {
    boxShadow: m3Theme.elevation.level3,
    borderColor: m3Theme.colors.primary,
    transform: 'translateY(-3px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

export const CardIconWrap = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  flexShrink: 0,
  color: m3Theme.colors.primary,
});
