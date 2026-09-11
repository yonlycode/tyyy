'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const ArticleGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
});

export const ArticleLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  height: '100%',
});

export const ArticleTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.35,
  margin: 0,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.primary },
});

export const MetaRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
  paddingTop: m3Theme.spacing.md,
  borderTop: `1px solid ${m3Theme.colors.outlineVariant}`,
});

export const ReadMore = styled('span')({
  color: m3Theme.colors.primary,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.brandAccent },
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
