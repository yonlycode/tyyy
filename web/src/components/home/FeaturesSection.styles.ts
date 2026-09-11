'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const Grid3 = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
});

export const BadgeIcon = styled('div')({
  width: '48px',
  height: '48px',
  borderRadius: m3Theme.radius.medium,
  background: m3Theme.colors.primarySoft,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: m3Theme.spacing.md,
});

export const Dot = styled('span')({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  background: m3Theme.colors.primary,
  display: 'block',
});

export const FeatureTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  marginBottom: m3Theme.spacing.md,
  fontWeight: m3Theme.font.weights.semibold,
});

export const FeatureText = styled('p')({
  color: m3Theme.colors.onSurfaceMuted,
  lineHeight: 1.7,
  margin: 0,
  fontSize: m3Theme.font.sizes.sm,
});
