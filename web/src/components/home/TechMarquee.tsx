'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const MarqueeSection = styled('div')({
  borderTop: `1px solid ${m3Theme.colors.outlineVariant}`,
  borderBottom: `1px solid ${m3Theme.colors.outlineVariant}`,
  background: m3Theme.colors.surfaceBright,
  overflow: 'hidden',
  paddingBlock: m3Theme.spacing.lg,
});

const MarqueeTrack = styled('div')({
  display: 'flex',
  width: 'max-content',
  gap: m3Theme.spacing.lg,
  animation: `${marquee} 28s linear infinite`,
});

const MarqueeItem = styled('span')({
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.onSurfaceVariant,
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  '&::before': {
    content: '""',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: m3Theme.gradients.glow,
  },
});

const techStack = [
  'Next.js',
  'TypeScript',
  'React',
  'Python',
  'Llama',
  'Mistral',
  'DeepSeek',
  'GGUF',
  'AWQ',
  'PyTorch',
  'Docker',
  'Kubernetes',
];

export function TechMarquee() {
  return (
    <MarqueeSection>
      <MarqueeTrack>
        {[...techStack, ...techStack].map((tech, i) => (
          <MarqueeItem key={`${tech}-${i}`}>{tech}</MarqueeItem>
        ))}
      </MarqueeTrack>
    </MarqueeSection>
  );
}