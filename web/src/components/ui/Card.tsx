'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Base Card component with modern glassmorphism (tokens kady dual theme) */
export const Card = styled('div')({
  background: 'color-mix(in srgb, var(--kady-surface) 75%, transparent)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: m3Theme.radius.large,
  padding: '1.5rem',
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
  boxShadow: m3Theme.elevation.level1,
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
  userSelect: 'none',

  '&:hover': {
    borderColor: m3Theme.colors.surfaceBorderHover,
    boxShadow: `0 8px 30px ${m3Theme.colors.primarySoft}, ${m3Theme.elevation.level2}`,
    transform: 'translateY(-4px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

/** Feature Card with refined accent glow for featured content */
export const FeatureCard = styled('div')({
  position: 'relative',
  background: 'color-mix(in srgb, var(--kady-surface) 75%, transparent)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: m3Theme.radius.large,
  padding: '1.5rem',
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
  boxShadow: m3Theme.elevation.level1,
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
  userSelect: 'none',

  '&:hover': {
    borderColor: m3Theme.colors.surfaceBorderHover,
    boxShadow: `0 8px 32px ${m3Theme.colors.primaryGlow}, ${m3Theme.elevation.level2}`,
    transform: 'translateY(-4px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

/** Card with border accent for selected state */
export const BorderCard = styled(Card)({
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,

  '&:hover': {
    borderColor: m3Theme.colors.primary,
  },
});
