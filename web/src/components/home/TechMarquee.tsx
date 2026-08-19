'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

/* Fade edges via pseudo-elements */
const MarqueeSection = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  paddingBlock: '1.5rem',
  background: m3Theme.colors.surface,
  borderTop: `1px solid ${m3Theme.colors.surfaceBorder}`,
  borderBottom: `1px solid ${m3Theme.colors.surfaceBorder}`,

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '120px',
    zIndex: 2,
    pointerEvents: 'none',
  },

  '&::before': {
    left: 0,
    background: 'linear-gradient(to right, #0B0F19 0%, transparent 100%)',
  },

  '&::after': {
    right: 0,
    background: 'linear-gradient(to left, #0B0F19 0%, transparent 100%)',
  },
});

const MarqueeTrack = styled('div')({
  display: 'flex',
  width: 'max-content',
  gap: m3Theme.spacing.lg,
  animation: `${marquee} 32s linear infinite`,
});

const MarqueeItem = styled('span')({
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.onSurfaceMuted,
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,

  '&::before': {
    content: '""',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: m3Theme.colors.primary,
    flexShrink: 0,
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
