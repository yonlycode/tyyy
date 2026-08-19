'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { Eyebrow, SectionSubtitle } from '@/components/ui';

/* ── Keyframes ───────────────────────────────────────────────────── */

const float = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(30px, -40px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

const floatAlt = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-40px, 30px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
`;

const avatarGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4), 0 8px 32px rgba(99, 102, 241, 0.2); }
  50%      { box-shadow: 0 0 0 16px rgba(99, 102, 241, 0), 0 8px 32px rgba(99, 102, 241, 0.3); }
`;

/* ── Styles ──────────────────────────────────────────────────────── */

const HeroArea = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: m3Theme.radius.extraLarge,
  background: m3Theme.gradients.hero,
  padding: `${m3Theme.spacing.xxxl} ${m3Theme.spacing.xl}`,
  marginBottom: m3Theme.spacing.xxl,
});

const HeroInner = styled('div')({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
});

const Blob = styled('div')<{ variant: 'a' | 'b'; size: number; top: string; left?: string; right?: string }>(
  ({ variant, size, top, left, right }) => ({
    position: 'absolute',
    width: size,
    height: size,
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
  }),
);

const Avatar = styled('div')({
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
});

const HeroTitle = styled('h2')({
  fontSize: m3Theme.font.sizes['6xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  letterSpacing: '-0.03em',
  background: m3Theme.gradients.text,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  marginBottom: m3Theme.spacing.sm,
});

/* ── Component ───────────────────────────────────────────────────── */

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  avatar?: string; // initials to display, e.g. "YF" — omitted for non-personal pages
}

export function PageHero({ eyebrow, title, subtitle, avatar }: PageHeroProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatedFadeIn>
      <HeroArea>
        {!reducedMotion && (
          <>
            <Blob variant="a" size={320} top="-15%" left="-8%" />
            <Blob variant="b" size={260} top="40%" right="-10%" />
          </>
        )}

        <HeroInner>
          {avatar && <Avatar>{avatar}</Avatar>}
          <Eyebrow>{eyebrow}</Eyebrow>
          <HeroTitle>{title}</HeroTitle>
          {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
        </HeroInner>
      </HeroArea>
    </AnimatedFadeIn>
  );
}
