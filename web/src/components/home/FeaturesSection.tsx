'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import {
  FeatureCard,
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  SectionSubtitle,
} from '@/components/ui';
import {
  BadgeIcon,
  Dot,
  FeatureText,
  FeatureTitle,
  Grid3,
} from './FeaturesSection.styles';

const features = [
  {
    title: 'LLMOps & Edge AI',
    text: 'Inférence locale et benchmarking de modèles frontières (Mistral, Llama, DeepSeek) sur architectures de rupture (AMD Strix Halo, Ryzen AI Max).',
  },
  {
    title: 'Souveraineté Numérique',
    text: 'Passer du cloud à l\'infrastructure locale on-premise pour garantir une souveraineté totale des données et diviser les coûts d\'inférence par 10.',
  },
  {
    title: 'Performance Hardware',
    text: 'Optimisation hardware sur architectures locales, quantification (GGUF, AWQ, 4-bit, 8-bit) et distillation de modèles.',
  },
];

export function FeaturesSection() {
  return (
    <Section>
      <Container>
        <AnimatedFadeIn>
          <SectionHeader>
            <Eyebrow>Expertise</Eyebrow>
            <SectionTitle>Une expertise de bout en bout</SectionTitle>
            <SectionSubtitle>
              Du choix du matériel à la mise en production des modèles, en passant par la
              souveraineté des données.
            </SectionSubtitle>
          </SectionHeader>
        </AnimatedFadeIn>

        <Grid3>
          {features.map((f, i) => (
            <AnimatedFadeIn key={f.title} delay={0.1 + i * 0.15}>
              <FeatureCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <BadgeIcon>
                  <Dot />
                </BadgeIcon>
                <FeatureTitle>{f.title}</FeatureTitle>
                <FeatureText>{f.text}</FeatureText>
              </FeatureCard>
            </AnimatedFadeIn>
          ))}
        </Grid3>
      </Container>
    </Section>
  );
}
