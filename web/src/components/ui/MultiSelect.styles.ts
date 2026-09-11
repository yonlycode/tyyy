'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { m3Theme } from '@/styles/theme';

/* ── Keyframes ─────────────────────────────────────────────────────── */

export const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Styles ────────────────────────────────────────────────────────── */

export const Wrapper = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

export const TriggerButton = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  padding: '0.5rem 1rem',
  borderRadius: m3Theme.radius.small,
  border: `1.5px solid ${m3Theme.colors.outline}`,
  background: m3Theme.colors.surface,
  color: m3Theme.colors.onSurface,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.medium,
  fontFamily: m3Theme.font.family,
  cursor: 'pointer',
  transition: `border-color ${m3Theme.animation.base}, background ${m3Theme.animation.base}`,
  whiteSpace: 'nowrap',

  '&:hover': {
    borderColor: m3Theme.colors.primary,
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

export const ChevronIcon = styled('svg')<{ open: boolean }>(({ open }) => ({
  width: 14,
  height: 14,
  flexShrink: 0,
  transition: `transform ${m3Theme.animation.base}`,
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  color: m3Theme.colors.onSurfaceVariant,
}));

export const SelectedChips = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.xs,
  flexWrap: 'wrap',
  maxHeight: 28,
  overflow: 'hidden',
});

export const Chip = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  borderRadius: m3Theme.radius.small,
  padding: '0.125rem 0.375rem 0.125rem 0.5rem',
  fontSize: '0.75rem',
  fontWeight: 500,
  background: m3Theme.colors.primary,
  color: m3Theme.colors.onPrimary,
  lineHeight: 1,
});

export const ChipRemove = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 14,
  height: 14,
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: 10,
  lineHeight: 1,
  opacity: 0.7,
  transition: 'opacity 0.15s ease',

  '&:hover': {
    opacity: 1,
  },
});

export const CountBadge = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 18,
  height: 18,
  borderRadius: m3Theme.radius.circular,
  background: m3Theme.colors.primary,
  color: m3Theme.colors.onPrimary,
  fontSize: '0.6875rem',
  fontWeight: 600,
  lineHeight: 1,
});

export const Panel = styled('div')({
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 0,
  width: 320,
  maxHeight: 360,
  borderRadius: m3Theme.radius.medium,
  background: m3Theme.colors.surface,
  border: `1px solid ${m3Theme.colors.outlineVariant}`,
  boxShadow: m3Theme.elevation.level3,
  zIndex: m3Theme.z.overlay,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  animation: `${fadeSlideUp} 0.15s ease forwards`,
});

export const SearchInput = styled('input')({
  width: '100%',
  padding: '0.625rem 0.75rem',
  border: 'none',
  borderBottom: `1px solid ${m3Theme.colors.outlineVariant}`,
  background: 'transparent',
  color: m3Theme.colors.onSurface,
  fontSize: m3Theme.font.sizes.sm,
  fontFamily: m3Theme.font.family,
  outline: 'none',

  '&::placeholder': {
    color: m3Theme.colors.onSurfaceVariant,
  },
});

export const OptionList = styled('div')({
  overflowY: 'auto',
  maxHeight: 280,
  padding: '0.25rem 0',
  scrollbarWidth: 'thin',
  scrollbarColor: `${m3Theme.colors.outlineVariant} transparent`,
});

export const Option = styled('div', {
  shouldForwardProp: (prop: string) => prop !== 'selected',
})<{ selected: boolean }>(
  ({ selected }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: m3Theme.spacing.sm,
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    fontSize: m3Theme.font.sizes.sm,
    color: selected ? m3Theme.colors.primary : m3Theme.colors.onSurface,
    fontWeight: selected ? m3Theme.font.weights.semibold : m3Theme.font.weights.regular,
    transition: `background ${m3Theme.animation.fast}`,
    userSelect: 'none' as const,

    '&:hover': {
      background: m3Theme.colors.primarySoft,
    },
  }),
);

export const Checkbox = styled('div')<{ checked: boolean }>(({ checked }) => ({
  width: 18,
  height: 18,
  borderRadius: 4,
  border: checked ? 'none' : `1.5px solid ${m3Theme.colors.outline}`,
  background: checked ? m3Theme.colors.primary : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: `background ${m3Theme.animation.fast}, border-color ${m3Theme.animation.fast}`,
}));

export const CheckIcon = styled('svg')({
  width: 12,
  height: 12,
  color: m3Theme.colors.onPrimary,
  pointerEvents: 'none',
});

export const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0.375rem 0.5rem',
  borderTop: `1px solid ${m3Theme.colors.outlineVariant}`,
});

export const ClearLink = styled('button')({
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

export const EmptyLabel = styled('div')({
  padding: '1rem 0.75rem',
  textAlign: 'center',
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.sm,
});
