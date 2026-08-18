'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Vertical rhythm wrapper for content sections */
export const Section = styled('section')({
  paddingBlock: m3Theme.spacing.section,
  position: 'relative',
});

/** Centered section header with eyebrow + title + subtitle */
export const SectionHeader = styled('div')({
  maxWidth: '640px',
  margin: '0 auto',
  textAlign: 'center',
  marginBottom: m3Theme.spacing.xxl,
});

export const Eyebrow = styled('span')({
  display: 'inline-block',
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.xs,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: m3Theme.colors.primary,
  background: m3Theme.colors.primarySoft,
  padding: '0.4rem 0.9rem',
  borderRadius: m3Theme.radius.circular,
  fontWeight: m3Theme.font.weights.semibold,
  marginBottom: m3Theme.spacing.md,
});

export const SectionTitle = styled('h2')({
  fontSize: m3Theme.font.sizes['3xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  color: m3Theme.colors.onSurface,
  marginBottom: m3Theme.spacing.md,
  letterSpacing: '-0.02em',
});

export const SectionSubtitle = styled('p')({
  fontSize: m3Theme.font.sizes.lg,
  lineHeight: m3Theme.font.lineHeights.relaxed,
  color: m3Theme.colors.onSurfaceVariant,
});