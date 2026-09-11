'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const StatWrap = styled('div')({
  textAlign: 'center',
  padding: `1.5rem 1rem`,
});

export const StatValue = styled('div')({
  fontSize: m3Theme.font.sizes['5xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  background: m3Theme.gradients.text,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  lineHeight: m3Theme.font.lineHeights.tight,
  marginBottom: m3Theme.spacing.xs,
});

export const StatLabel = styled('div')({
  fontSize: m3Theme.font.sizes.xs,
  color: m3Theme.colors.onSurfaceMuted,
  fontWeight: m3Theme.font.weights.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
});
