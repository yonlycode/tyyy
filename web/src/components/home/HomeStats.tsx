'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { Container, Stat } from '@/components/ui';

const StatsBand = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: m3Theme.spacing.md,
  background: m3Theme.colors.surface,
  borderRadius: m3Theme.radius.extraLarge,
  boxShadow: m3Theme.elevation.level1,
  padding: m3Theme.spacing.lg,
  marginTop: `calc(-${m3Theme.spacing.section} / 2)`,
  position: 'relative',
  zIndex: 2,
  '@media (max-width: 700px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
});

const stats = [
  { value: '10×', label: 'Réduction des coûts d’inférence' },
  { value: '100%', label: 'Souveraineté des données' },
  { value: '∞', label: 'Modèles frontières testés' },
  { value: '0', label: 'Dépendance au cloud' },
];

export function HomeStats() {
  return (
    <Container>
      <StatsBand>
        {stats.map((s, i) => (
          <AnimatedFadeIn key={s.label} delay={i * 0.1}>
            <Stat value={s.value} label={s.label} />
          </AnimatedFadeIn>
        ))}
      </StatsBand>
    </Container>
  );
}