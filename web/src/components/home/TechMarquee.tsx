'use client';

import { MarqueeItem, MarqueeSection, MarqueeTrack } from './TechMarquee.styles';

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
