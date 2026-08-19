'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { ButtonLink, OutlineButtonLink, Badge } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import { TechMarquee } from './TechMarquee';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
`;

const CtaRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
});

const TagsRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: m3Theme.spacing.sm,
  marginTop: m3Theme.spacing.md,
});

const ScrollHint = styled('div')({
  color: m3Theme.colors.primaryHover,
  opacity: 0.5,
  fontSize: m3Theme.font.sizes.xl,
  animation: `${bounce} 2s ease-in-out infinite`,
  marginTop: m3Theme.spacing.xl,
});

export function HomeHero() {
  return (
    <>
      <PageHero
        eyebrow="Home"
        title="Architecte IA &amp; Lead LLMOps"
        subtitle="Je conçois des architectures IA souveraines, du hardware au modèle quantifié, pour éliminer la dépendance cloud et diviser les coûts d'inférence par 10."
        avatar="TY3"
      />

      <TechMarquee />

      <AnimatedFadeIn delay={0.3}>
        <CtaRow>
          <ButtonLink href="/portfolio/">
            Découvrir mes projets
          </ButtonLink>
          <OutlineButtonLink href="/articles/">
            Lire mes articles
          </OutlineButtonLink>
        </CtaRow>
      </AnimatedFadeIn>

      <AnimatedFadeIn delay={0.5}>
        <TagsRow>
          <Badge>#AI</Badge>
          <Badge>#LLMOps</Badge>
          <Badge>#OnPremise</Badge>
          <Badge>#Quantization</Badge>
        </TagsRow>
      </AnimatedFadeIn>

      <AnimatedFadeIn delay={0.7}>
        <ScrollHint aria-label="Faire défiler">↓</ScrollHint>
      </AnimatedFadeIn>
    </>
  );
}
