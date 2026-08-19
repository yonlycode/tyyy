'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import {
  FeatureCard,
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  SectionSubtitle,
} from '@/components/ui';

const Grid3 = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
});

const BadgeIcon = styled('div')<{ color: string }>(({ color }) => ({
  width: '48px',
  height: '48px',
  borderRadius: m3Theme.radius.medium,
  background: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: m3Theme.spacing.md,
}));

const Dot = styled('span')<{ color: string }>(({ color }) => ({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  background: color,
  display: 'block',
}));

const FeatureTitle = styled('h3')<{ color: string }>(({ color }) => ({
  fontSize: m3Theme.font.sizes.xl,
  color,
  marginBottom: m3Theme.spacing.md,
}));

const FeatureText = styled('p')({
  color: m3Theme.colors.onSurfaceVariant,
  lineHeight: 1.7,
  margin: 0,
});

const features = [
  {
    accent: m3Theme.colors.primary,
    container: m3Theme.colors.primaryContainer,
    title: 'LLMOps & Edge AI',
    text: 'Inférence locale et benchmarking de modèles frontières (Mistral, Llama, DeepSeek) sur architectures de rupture (AMD Strix Halo, Ryzen AI Max).',
  },
  {
    accent: m3Theme.colors.secondary,
    container: m3Theme.colors.secondaryContainer,
    title: 'Souveraineté Numérique',
    text: 'Passer du cloud à l’infrastructure locale on-premise pour garantir une souveraineté totale des données et diviser les coûts d’inférence par 10.',
  },
  {
    accent: m3Theme.colors.success,
    container: m3Theme.colors.successContainer,
    title: 'Performance Hardware',
    text: 'Optimisation hardware sur architectures locales, quantification (GGUF, AWQ, 4-bit, 8-bit) et distillation de modèles.',
  },
];

export function FeaturesSection() {
  return (
    <Section >
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
              <FeatureCard
                style={{ height: '100%', borderTop: `4px solid ${f.container}` }}
              >
                <BadgeIcon color={f.container}>
                  <Dot color={f.accent} />
                </BadgeIcon>
                <FeatureTitle color={f.accent}>{f.title}</FeatureTitle>
                <FeatureText>{f.text}</FeatureText>
              </FeatureCard>
            </AnimatedFadeIn>
          ))}
        </Grid3>
      </Container>
    </Section>
  );
}
