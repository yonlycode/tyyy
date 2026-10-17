'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { ButtonLink, OutlineButtonLink, Badge, Container, Section } from '@/components/ui';
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
    <Section>
      <Container>
        <PageHero
          eyebrow="Karuka Conseil"
          title={
            <>
              Architecte en IA Souveraine
              <br />
              <span style={{ fontSize: '0.8em', opacity: 0.92 }}>
                Systèmes Critiques &amp; Hardware Edge
              </span>
            </>
          }
          subtitle="Fondateur de Karuka Conseil. J'émancipe les organisations de la rente cloud US en concevant des architectures d'IA souveraines bare-metal : déploiement de box locales Kady (HaaS), optimisation fine de l'inférence APU Strix Halo / N100 sous vLLM et orchestration de flottes multi-agents critiques."
          avatar="YF"
        />

        <TechMarquee />

        <AnimatedFadeIn delay={0.3}>
          <CtaRow>
            <ButtonLink href="/portfolio/">
              Découvrir les cas d'usage
            </ButtonLink>
            <OutlineButtonLink href="/articles/">
              Lire mes analyses tech
            </OutlineButtonLink>
          </CtaRow>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.5}>
          <TagsRow>
            <Badge>#IASouveraine</Badge>
            <Badge>#KarukaConseil</Badge>
            <Badge>#KadyHaaS</Badge>
            <Badge>#APUStrixHalo</Badge>
            <Badge>#vLLM</Badge>
            <Badge>#MultiAgents</Badge>
          </TagsRow>
        </AnimatedFadeIn>

        <AnimatedFadeIn delay={0.7}>
          <ScrollHint aria-label="Faire défiler">↓</ScrollHint>
        </AnimatedFadeIn>
      </Container>
    </Section>
  );
}
