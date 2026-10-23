'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import { m3Theme } from '@/styles/theme';
import { KadyHeroHost } from './kady-host';

/* ── Wrapper kady-hero ─────────────────────────────────────────────
   PageHero Emotion (hero centré, blobs animés, dégradés) → <kady-hero>, la
   section hero officielle de kady-ui (API : attributs eyebrow/title/subtitle
   avec repli, slots eyebrow, title, subtitle, cta, media, défaut ; grille
   responsive 2 colonnes).
   L'API colle : eyebrow et subtitle sont des strings (attributs → rendu
   interne stylé par kady) ; title peut être un ReactNode (HomeHero passe un
   fragment avec <br>) → on passe TOUJOURS par le slot « title » pour ne pas
   perdre le JSX, avec un h2 typé sur les tokens kady (mêmes valeurs que la
   classe .title interne : font-display, text-3xl/2.75rem, 700, ink) — le
   contenu slotté n'est pas stylable depuis le shadow DOM, d'où la copie
   tokenisée. L'avatar (pas d'équivalent dans l'API kady) est projeté dans le
   slot « media ». Les blobs décoratifs Emotion tombent : le rendu retenu est
   celui de kady-ui. Signature conservée :
   { eyebrow?, title: string | ReactNode, subtitle?, avatar? }. */

const avatarGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--kady-primary) 40%, transparent), 0 8px 32px color-mix(in srgb, var(--kady-primary) 20%, transparent); }
  50%      { box-shadow: 0 0 0 16px transparent, 0 8px 32px color-mix(in srgb, var(--kady-primary) 30%, transparent); }
`;

/** Titre slotté : calque les styles de la classe .title interne de kady-hero
 *  (tokens uniquement, zéro hex) pour un rendu identique au repli attribut. */
const SlottedTitle = styled('h2')({
  fontFamily: 'var(--kady-font-display)',
  fontSize: 'var(--kady-text-3xl)',
  fontWeight: 700,
  lineHeight: 1.15,
  color: 'var(--kady-ink)',
  margin: 0,

  [`@media (min-width: 768px)`]: {
    fontSize: '2.75rem',
  },
});

const Avatar = styled('div')({
  width: '88px',
  height: '88px',
  borderRadius: '50%',
  background: m3Theme.gradients.glow,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: m3Theme.font.sizes['2xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  color: 'var(--kady-ink-inverse)',
  animation: `${avatarGlow} 3.5s ease-in-out infinite`,

  [`@media (max-width: ${m3Theme.breakpoints.mobile}px)`]: {
    width: '72px',
    height: '72px',
    fontSize: m3Theme.font.sizes.xl,
  },
});

/* ── Component ───────────────────────────────────────────────────── */

interface PageHeroProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  avatar?: string;
}

export function PageHero({ eyebrow, title, subtitle, avatar }: PageHeroProps) {
  return (
    <AnimatedFadeIn>
      <KadyHeroHost eyebrow={eyebrow} subtitle={subtitle}>
        <SlottedTitle slot="title">{title}</SlottedTitle>
        {avatar && <Avatar slot="media">{avatar}</Avatar>}
      </KadyHeroHost>
    </AnimatedFadeIn>
  );
}
