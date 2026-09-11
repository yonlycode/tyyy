'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Button component with enhanced dark-mode states */
export const Button = styled('button')({
  background: m3Theme.colors.primary,
  color: m3Theme.colors.onPrimary,
  border: 'none',
  borderRadius: m3Theme.radius.medium,
  padding: '0.875rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background 0.2s ease, transform 0.1s ease',

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },

  '&:active': {
    transform: 'scale(0.98)',
  },

  '&:hover': {
    background: m3Theme.colors.primaryHover,
    transform: 'translateY(-1px)',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: m3Theme.colors.onSurfaceDim,
    color: m3Theme.colors.onSurface,
  },
});

/** Primary CTA variant - larger, more prominent */
export const PrimaryButton = styled(Button)({
  background: m3Theme.colors.primary,
  color: m3Theme.colors.onPrimary,

  '&:hover': {
    background: m3Theme.colors.primaryHover,
    transform: 'translateY(-2px)',
  },
});

/** Outlined button variant */
export const OutlineButton = styled(Button)({
  background: 'transparent',
  border: `2px solid ${m3Theme.colors.primary}`,
  color: m3Theme.colors.primaryHover,

  '&:hover': {
    background: m3Theme.colors.primarySoft,
    color: m3Theme.colors.primaryHover,
  },

  '&:focus-visible': {
    boxShadow: m3Theme.elevation.focus,
    borderColor: m3Theme.colors.primary,
  },
});

/** Small button variant for compact UI */
export const SmallButton = styled(Button)({
  padding: '0.5rem 1rem',
  fontSize: '0.875rem',
  borderRadius: m3Theme.radius.small,
});

/** Filled button rendered as an anchor link — primary CTA (solid dark purple) */
export const ButtonLink = styled(Link)({
  background: m3Theme.colors.primaryDark,
  color: m3Theme.colors.onPrimary,
  border: 'none',
  borderRadius: m3Theme.radius.large,
  padding: '1.125rem 2.25rem',
  fontSize: '1.0625rem',
  fontWeight: m3Theme.font.weights.semibold,
  letterSpacing: '0.01em',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)',

  '&:focus-visible': {
    outline: 'none',
    boxShadow: `${m3Theme.elevation.focus}, 0 4px 16px rgba(79, 70, 229, 0.4)`,
  },

  '&:active': {
    transform: 'scale(0.97)',
  },

  '&:hover': {
    background: m3Theme.colors.primary,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(99, 102, 241, 0.45)',
  },
});

/** Outlined button rendered as an anchor link — ghost/secondary CTA */
export const OutlineButtonLink = styled(Link)({
  background: 'transparent',
  border: `1.5px solid ${m3Theme.colors.onSurfaceDim}`,
  color: m3Theme.colors.onSurfaceMuted,
  borderRadius: m3Theme.radius.large,
  padding: '1.125rem 2.25rem',
  fontSize: '1.0625rem',
  fontWeight: m3Theme.font.weights.semibold,
  letterSpacing: '0.01em',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

  '&:hover': {
    borderColor: m3Theme.colors.primary,
    color: m3Theme.colors.primaryHover,
    background: m3Theme.colors.primarySoft,
    transform: 'translateY(-2px)',
  },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderColor: m3Theme.colors.primary,
  },
});
