'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const FooterRoot = styled('footer')({
  background: m3Theme.colors.footerBg,
  color: m3Theme.colors.onSurfaceMuted,
  marginTop: m3Theme.spacing.xxxl,
  borderTop: `1px solid ${m3Theme.colors.footerBorder}`,
});

export const FooterInner = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `${m3Theme.spacing.xxl} ${m3Theme.spacing.xl}`,
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.xl,

  '@media (max-width: 768px)': {
    padding: `${m3Theme.spacing.lg} ${m3Theme.spacing.md}`,
  },
});

export const FooterTop = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr',
  gap: m3Theme.spacing.xl,

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
    '& > :first-of-type': { gridColumn: '1 / -1' },
  },

  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    '& > :first-of-type': { gridColumn: 'auto' },
  },
});

export const Brand = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: m3Theme.spacing.sm,
});

export const BrandRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
});

export const BrandName = styled('span')({
  fontWeight: m3Theme.font.weights.extrabold,
  fontSize: m3Theme.font.sizes.xl,
  letterSpacing: '-0.01em',
  color: m3Theme.colors.onSurface,
});

export const Tagline = styled('p')({
  margin: 0,
  color: m3Theme.colors.onSurfaceDim,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: m3Theme.font.lineHeights.normal,
  maxWidth: '280px',
});

export const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.md,
});

export const ColumnTitle = styled('h3')({
  margin: 0,
  color: m3Theme.colors.onSurface,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const FooterLinks = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: m3Theme.spacing.sm,
});

export const FooterLink = styled(Link)({
  color: m3Theme.colors.onSurfaceMuted,
  textDecoration: 'none',
  fontSize: m3Theme.font.sizes.md,
  fontWeight: m3Theme.font.weights.medium,
  opacity: 0.85,
  transition: 'color 0.2s ease, opacity 0.2s ease',
  width: 'fit-content',

  '&:hover': { color: m3Theme.colors.primaryHover, opacity: 1 },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${m3Theme.colors.primary}`,
    borderRadius: m3Theme.radius.small,
  },
});

export const SocialRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: m3Theme.spacing.sm,
});

export const SocialLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: m3Theme.radius.medium,
  color: m3Theme.colors.onSurfaceMuted,
  background: m3Theme.colors.surfaceHover,
  border: `1px solid ${m3Theme.colors.outlineVariant}`,
  transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',

  '& svg': { width: '20px', height: '20px' },

  '&:hover': {
    color: m3Theme.colors.primaryHover,
    background: m3Theme.colors.primarySoft,
    borderColor: m3Theme.colors.primary,
    transform: 'translateY(-2px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

export const FooterBottom = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  paddingTop: m3Theme.spacing.lg,
  borderTop: `1px solid ${m3Theme.colors.footerBorder}`,
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.onSurfaceDim,
});

export const Availability = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: m3Theme.colors.onSurfaceMuted,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.medium,
});

export const StatusDot = styled('span')({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: m3Theme.colors.success,
  boxShadow: `0 0 6px ${m3Theme.colors.success}`,
  marginRight: '6px',
  animation: 'pulse 2s ease-in-out infinite',
});
