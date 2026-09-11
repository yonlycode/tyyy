'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/* ── Icon ──────────────────────────────────────────────────────────── */

export const SearchIcon = styled('svg')({
  width: 18,
  height: 18,
  flexShrink: 0,
  color: m3Theme.colors.onSurfaceVariant,
  pointerEvents: 'none',
});

/* ── Styles ────────────────────────────────────────────────────────── */

export const Wrapper = styled('div')({
  position: 'relative',
  maxWidth: 480,
  width: '100%',
  margin: '0 auto',
});

export const Input = styled('input')({
  width: '100%',
  height: 44,
  padding: '0 0 0 2.5rem',
  borderRadius: m3Theme.radius.medium,
  border: `1.5px solid ${m3Theme.colors.outline}`,
  background: m3Theme.colors.surface,
  color: m3Theme.colors.onSurface,
  fontSize: m3Theme.font.sizes.md,
  fontFamily: m3Theme.font.family,
  outline: 'none',
  transition: `border-color ${m3Theme.animation.base}, box-shadow ${m3Theme.animation.base}`,

  '&::placeholder': {
    color: m3Theme.colors.onSurfaceVariant,
  },

  '&:focus': {
    borderColor: m3Theme.colors.primary,
    boxShadow: m3Theme.elevation.focus,
  },
});

export const IconWrapper = styled('div')({
  position: 'absolute',
  left: '0.875rem',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
});
