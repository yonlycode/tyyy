'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { Container, Stat } from '@/components/ui';
import { StatsBand } from './HomeStats.styles';

const stats = [
  { value: '10×', label: 'Réduction des coûts d\'inférence' },
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
