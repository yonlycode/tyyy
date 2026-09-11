'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Card component with border-reactive hover (no shadows) */
export const Card = styled('div')({
  background: m3Theme.colors.surfaceElevated,
  borderRadius: m3Theme.radius.medium,
  padding: '1.5rem',
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
  userSelect: 'none',

  '&:hover': {
    borderColor: m3Theme.colors.surfaceBorderHover,
    boxShadow: m3Theme.elevation.glow,
    transform: 'translateY(-2px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

/** Card with purple border hover + micro-glow for featured content */
export const FeatureCard = styled(Card)({
  borderTop: `3px solid ${m3Theme.colors.surfaceBorder}`,

  '&:hover': {
    borderColor: m3Theme.colors.surfaceBorderHover,
    borderTopColor: m3Theme.colors.primary,
    boxShadow: `0 0 24px ${m3Theme.colors.primaryGlow}, ${m3Theme.elevation.level2}`,
    transform: 'translateY(-4px)',
  },
});

/** Card with border accent for selected state */
export const BorderCard = styled(Card)({
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,

  '&:hover': {
    borderColor: m3Theme.colors.primary,
  },
});
