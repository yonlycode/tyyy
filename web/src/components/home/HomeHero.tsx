'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import {
  ButtonLink,
  OutlineButtonLink,
  Badge,
  Container,
  Section,
} from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import { TechMarquee } from './TechMarquee';
import { CtaRow, ScrollHint, TagsRow } from './HomeHero.styles';

export function HomeHero() {
  return (
    <Section>
      <Container>
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
      </Container>
    </Section>
  );
}
