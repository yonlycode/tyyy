'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { Eyebrow, SectionSubtitle } from '@/components/ui';
import { Avatar, Blob, HeroArea, HeroInner, HeroTitle } from './PageHero.styles';

export function PageHero({ eyebrow, title, subtitle, avatar }: PageHeroProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatedFadeIn>
      <HeroArea>
        {!reducedMotion && (
          <>
            <Blob variant="a" size={320} top="-15%" left="-8%" />
            <Blob variant="b" size={260} top="40%" right="-10%" />
          </>
        )}

        <HeroInner>
          {avatar && <Avatar>{avatar}</Avatar>}
          <Eyebrow>{eyebrow}</Eyebrow>
          <HeroTitle>{title}</HeroTitle>
          {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
        </HeroInner>
      </HeroArea>
    </AnimatedFadeIn>
  );
}

/* ── Component ───────────────────────────────────────────────────── */

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  avatar?: string; // initials to display, e.g. "YF" — omitted for non-personal pages
}
