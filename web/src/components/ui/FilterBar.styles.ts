'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/* ── Styles ────────────────────────────────────────────────────────── */

export const Container = styled('div')({
  marginBottom: m3Theme.spacing.xxl,
});

export const SearchRow = styled('div')({
  marginBottom: m3Theme.spacing.md,
});

export const FilterRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  flexWrap: 'wrap',
  marginBottom: m3Theme.spacing.sm,
});

export const ResultsCount = styled('p')({
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.onSurfaceVariant,
  marginTop: m3Theme.spacing.sm,
  marginBottom: 0,
});

export const ClearAllButton = styled('button')({
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.primary,
  fontWeight: m3Theme.font.weights.medium,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '0.25rem 0.5rem',
  borderRadius: m3Theme.radius.small,
  fontFamily: m3Theme.font.family,
  transition: `background ${m3Theme.animation.base}`,

  '&:hover': {
    background: m3Theme.colors.primaryContainer,
  },
});
