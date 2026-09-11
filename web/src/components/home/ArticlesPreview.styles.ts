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

export const CategoryBadge = styled('span')({
  display: 'inline-block',
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.xs,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: m3Theme.colors.primaryHover,
  background: m3Theme.colors.primarySoft,
  padding: '0.2rem 0.6rem',
  borderRadius: m3Theme.radius.small,
  marginBottom: m3Theme.spacing.md,
});

export const ArticleTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.lg,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.4,
  margin: 0,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.primaryHover },
});

export const ArticleDesc = styled('p')({
  color: m3Theme.colors.onSurfaceMuted,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.6,
  marginTop: m3Theme.spacing.md,
  marginBottom: 'auto',
});

export const ArticleFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
  paddingTop: m3Theme.spacing.md,
  borderTop: `1px solid ${m3Theme.colors.surfaceBorder}`,
});

export const ArticleDate = styled('span')({
  color: m3Theme.colors.onSurfaceDim,
  fontSize: m3Theme.font.sizes.xs,
  fontFamily: m3Theme.font.mono,
});

export const ReadMore = styled('span')({
  color: m3Theme.colors.primaryHover,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease, gap 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.xs,

  [`${ArticleLink}:hover &`]: {
    color: m3Theme.colors.primary,
    gap: m3Theme.spacing.sm,
  },
});

export const ArrowLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  color: m3Theme.colors.primaryHover,
  fontWeight: m3Theme.font.weights.semibold,
  textDecoration: 'none',
  marginTop: m3Theme.spacing.xl,
  transition: 'gap 0.2s ease, color 0.2s ease',

  '&:hover': { color: m3Theme.colors.primary, gap: m3Theme.spacing.md },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderRadius: m3Theme.radius.small,
  },
});
