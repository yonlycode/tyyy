'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const Wrapper = styled('div')({
  paddingBlock: m3Theme.spacing.xxl,

  [`@media (max-width: ${m3Theme.breakpoints.mobile}px)`]: {
    paddingBlock: m3Theme.spacing.lg,
  },
});

export const BackLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  color: m3Theme.colors.primary,
  textDecoration: 'none',
  fontWeight: m3Theme.font.weights.semibold,
  fontSize: m3Theme.font.sizes.sm,
  marginBottom: m3Theme.spacing.lg,
  transition: 'gap 0.2s ease, color 0.2s ease',

  '&:hover': { color: m3Theme.colors.secondary, gap: m3Theme.spacing.md },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderRadius: m3Theme.radius.small,
  },
});

export const Title = styled('h1')({
  fontSize: m3Theme.font.sizes['4xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  letterSpacing: '-0.02em',
  color: m3Theme.colors.onSurface,
  margin: 0,
});

export const MetaRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.md,
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.sm,
});

export const ProjectBody = styled('div')({
  marginTop: m3Theme.spacing.xl,
});

export const FooterBar = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: m3Theme.spacing.xl,
  paddingTop: m3Theme.spacing.xl,
  borderTop: `1px solid ${m3Theme.colors.outlineVariant}`,
});
