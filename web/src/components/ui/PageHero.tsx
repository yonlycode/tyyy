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

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(187, 134, 252, 0.45), 0 10px 40px rgba(103, 80, 164, 0.35); }
  50%      { box-shadow: 0 0 0 22px rgba(187, 134, 252, 0), 0 10px 40px rgba(103, 80, 164, 0.45); }
`;

/* ── Styles ──────────────────────────────────────────────────────── */

const Blob = styled('div')<{ variant: 'a' | 'b'; size: number; top: string; left?: string; right?: string }>(
  ({ variant, size, top, left, right }) => ({
    position: 'absolute',
    width: size,
    height: size,
    top,
    left,
    right,
    borderRadius: '50%',
    filter: 'blur(70px)',
    opacity: 0.35,
    background:
      variant === 'a'
        ? 'radial-gradient(circle, #BB86FC, #6750A4)'
        : 'radial-gradient(circle, #5E35B1, #E8C9FF)',
    animation: `${variant === 'a' ? float : floatAlt} 18s ease-in-out infinite`,
    pointerEvents: 'none',
    zIndex: 0,
  }),
);

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
  animation: `${glowPulse} 3.5s ease-in-out infinite`,
  marginBottom: m3Theme.spacing.lg,
});

const HeroTitle = styled('h2')({
  fontSize: m3Theme.font.sizes['3xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  letterSpacing: '-0.02em',
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
            <Blob variant="a" size={280} top="-10%" left="-5%" />
            <Blob variant="b" size={240} top="50%" right="-8%" />
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
