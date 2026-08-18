'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Card component with enhanced hover interactions and shadow transitions */
export const Card = styled('div')({
  background: m3Theme.colors.surface,
  borderRadius: m3Theme.radius.medium,
  padding: '1.5rem',
  boxShadow: m3Theme.elevation.level1,
  transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  // Prevent card from being selected/highlighted
  userSelect: 'none',

  '&:hover': {
    boxShadow: m3Theme.elevation.level3,
    transform: 'translateY(-4px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

/** Card with elevated shadow for featured content */
export const FeatureCard = styled(Card)({
  boxShadow: m3Theme.elevation.level2,
  transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

  '&:hover': {
    boxShadow: m3Theme.elevation.level4,
    transform: 'translateY(-8px)',
  },
});

/** Card with border accent for selected state */
export const BorderCard = styled(Card)({
  border: `1px solid ${m3Theme.colors.outlineVariant}`,

  '&:hover': {
    borderColor: m3Theme.colors.primary,
  },
});