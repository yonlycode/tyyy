'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { ButtonLink, OutlineButtonLink, Badge } from '@/components/ui';

const float = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -40px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

const floatAlt = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-40px, 30px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(187, 134, 252, 0.45), 0 10px 40px rgba(103, 80, 164, 0.35); }
  50% { box-shadow: 0 0 0 22px rgba(187, 134, 252, 0), 0 10px 40px rgba(103, 80, 164, 0.45); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const Hero = styled('section')({
  position: 'relative',
  minHeight: 'calc(100vh - 74px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: m3Theme.gradients.hero,
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
    filter: 'blur(70px)',
    opacity: 0.5,
    background:
      variant === 'a'
        ? 'radial-gradient(circle, #BB86FC, #6750A4)'
        : 'radial-gradient(circle, #5E35B1, #E8C9FF)',
    animation: `${variant === 'a' ? float : floatAlt} 18s ease-in-out infinite`,
    pointerEvents: 'none',
    zIndex: 0,
  }),
);

const HeroContent = styled('div')({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  maxWidth: '820px',
  paddingInline: m3Theme.spacing.xl,
  paddingBlock: m3Theme.spacing.xxxl,
});

const Avatar = styled('div')({
  width: '92px',
  height: '92px',
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
  marginBottom: m3Theme.spacing.xl,
});

const Title = styled('h1')({
  fontSize: m3Theme.font.sizes['5xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  letterSpacing: '-0.03em',
  background: m3Theme.gradients.text,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  marginBottom: m3Theme.spacing.lg,
});

const Subtitle = styled('p')({
  fontSize: m3Theme.font.sizes.xl,
  lineHeight: m3Theme.font.lineHeights.relaxed,
  color: m3Theme.colors.onSurfaceVariant,
  maxWidth: '620px',
  margin: '0 auto',
  marginBottom: m3Theme.spacing.xl,
});

const CtaRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: m3Theme.spacing.md,
  marginBottom: m3Theme.spacing.xxl,
});

const ScrollHint = styled('div')({
  color: m3Theme.colors.primary,
  opacity: 0.6,
  fontSize: m3Theme.font.sizes.xl,
  animation: `${bounce} 2s ease-in-out infinite`,
});

const TagsRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: m3Theme.spacing.sm,
  marginTop: m3Theme.spacing.md,
});

const onPrimaryBg = { background: m3Theme.colors.onPrimary, color: m3Theme.colors.primary };

export function HomeHero() {
  return (
    <Hero>
      <Blob variant="a" size={480} top="-10%" left="-5%" />
      <Blob variant="b" size={420} top="30%" right="-8%" />
      <Blob variant="a" size={320} top="70%" left="20%" />

      <HeroContent>
        <AnimatedFadeIn delay={0.1}>
          <Avatar>YF</Avatar>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.25}>
          <Title>Architecte IA &amp; Lead LLMOps</Title>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.4}>
          <Subtitle>
            Je conçois des architectures IA souveraines, du hardware au modèle quantifié, pour
            éliminer la dépendance cloud et diviser les coûts d’inférence par 10.
          </Subtitle>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.55}>
          <CtaRow>
            <ButtonLink href="/portfolio/" style={onPrimaryBg}>
              Découvrir mes projets
            </ButtonLink>
            <OutlineButtonLink href="/articles/">
              Lire mes articles
            </OutlineButtonLink>
          </CtaRow>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.7}>
          <TagsRow>
            <Badge>#AI</Badge>
            <Badge>#LLMOps</Badge>
            <Badge>#On-Premise</Badge>
            <Badge>#Quantization</Badge>
          </TagsRow>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={1.1}>
          <ScrollHint aria-label="Faire défiler">↓</ScrollHint>
        </AnimatedFadeIn>
      </HeroContent>
    </Hero>
  );
}