'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/* ── Keyframes ───────────────────────────────────────────────────── */

export const float = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(30px, -40px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

export const floatAlt = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-40px, 30px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
`;

export const avatarGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4), 0 8px 32px rgba(99, 102, 241, 0.2); }
  50%      { box-shadow: 0 0 0 16px rgba(99, 102, 241, 0), 0 8px 32px rgba(99, 102, 241, 0.3); }
`;

/* ── Styles ──────────────────────────────────────────────────────── */

export const HeroArea = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: m3Theme.radius.extraLarge,
  background: m3Theme.gradients.hero,
  padding: `${m3Theme.spacing.xxxl} ${m3Theme.spacing.xl}`,
  marginBottom: m3Theme.spacing.xxl,

  [`@media (max-width: ${m3Theme.breakpoints.tablet}px)`]: {
    padding: `${m3Theme.spacing.xxl} ${m3Theme.spacing.lg}`,
  },

  [`@media (max-width: ${m3Theme.breakpoints.mobile}px)`]: {
    padding: `${m3Theme.spacing.xxl} ${m3Theme.spacing.md}`,
    borderRadius: m3Theme.radius.large,
    marginBottom: m3Theme.spacing.xl,
  },
});

export const HeroInner = styled('div')({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
});

export const Blob = styled('div')<{ variant: 'a' | 'b'; size: number; top: string; left?: string; right?: string }>(
  ({ variant, size, top, left, right }) => ({
    '--blob-size': `${size}px`,
    position: 'absolute',
    width: 'var(--blob-size)',
    height: 'var(--blob-size)',
    top,
    left,
    right,
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.2,
    background:
      variant === 'a'
        ? 'radial-gradient(circle, #6366F1, #4F46E5)'
        : 'radial-gradient(circle, #34D399, #059669)',
    animation: `${variant === 'a' ? float : floatAlt} 20s ease-in-out infinite`,
    pointerEvents: 'none',
    zIndex: 0,

    [`@media (max-width: ${m3Theme.breakpoints.tablet}px)`]: {
      '--blob-size': `${size * 0.7}px`,
      filter: 'blur(60px)',
    },

    [`@media (max-width: ${m3Theme.breakpoints.mobile}px)`]: {
      '--blob-size': `${size * 0.5}px`,
      filter: 'blur(45px)',
    },
  }),
);

export const Avatar = styled('div')({
  width: '88px',
  height: '88px',
  margin: '0 auto',
  borderRadius: m3Theme.radius.circular,
  background: m3Theme.gradients.glow,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: m3Theme.font.sizes['2xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  color: m3Theme.colors.onPrimary,
  animation: `${avatarGlow} 3.5s ease-in-out infinite`,
  marginBottom: m3Theme.spacing.lg,

  [`@media (max-width: ${m3Theme.breakpoints.mobile}px)`]: {
    width: '72px',
    height: '72px',
    fontSize: m3Theme.font.sizes.xl,
  },
});

export const HeroTitle = styled('h2')({
  fontSize: m3Theme.font.sizes['6xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  letterSpacing: '-0.03em',
  background: m3Theme.gradients.text,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  marginBottom: m3Theme.spacing.sm,

  [`@media (max-width: ${m3Theme.breakpoints.tablet}px)`]: {
    fontSize: m3Theme.font.sizes['4xl'],
  },

  [`@media (max-width: ${m3Theme.breakpoints.mobile}px)`]: {
    fontSize: m3Theme.font.sizes['2xl'],
  },
});
