'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 620px)': { gridTemplateColumns: '1fr' },
});

export const ProjectLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  height: '100%',
});

export const ProjectTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.35,
  margin: 0,
});

export const ProjectDesc = styled('p')({
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.7,
  margin: `${m3Theme.spacing.md} 0`,
  flex: 1,
});

export const TagRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: m3Theme.spacing.xs,
  marginTop: 'auto',
});

export const FooterRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: m3Theme.spacing.xxl,
});

export const EmptyState = styled('div')({
  textAlign: 'center',
  padding: `${m3Theme.spacing.xxl} 0`,
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.lg,
});
