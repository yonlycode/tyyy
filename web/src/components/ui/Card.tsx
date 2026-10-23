'use client';

import { KadyCardHost } from './kady-host';

/* ── Wrappers kady-card ──────────────────────────────────────────────
   Card / FeatureCard / BorderCard (primitives Emotion glassmorphism) sont
   désormais des wrappers minces de <kady-card> (API officielle : variant
   default | raised | interactive ; slots header / défaut / footer).
   Variant retenu : « default » partout — « interactive » ajoute role=button +
   tabindex (les cartes du site ne sont pas cliquables en elles-mêmes : les
   FeatureCard d'articles sont enveloppées dans un <a>, un nested
   interactive serait un péché d'accessibilité). Le rendu (coins radius-lg,
   ombre shadow-sm, bordure line) est donc exactement celui de kady-ui.
   Les call-sites passent style (height/flex/padding) et className : posés
   sur l'hôte, ils composent avec le shadow DOM sans conflit. */

type KadyCardProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export function Card(props: KadyCardProps) {
  return <KadyCardHost variant="default" {...props} />;
}

/** Carte « feature » — même rendu kady-card default (pas de variant kady
 *  « hover-glow » sans sémantique cliquable). */
export function FeatureCard(props: KadyCardProps) {
  return <KadyCardHost variant="default" {...props} />;
}

/** Carte à bordure accentuée — kady-card default (la bordure kady suffit). */
export function BorderCard(props: KadyCardProps) {
  return <KadyCardHost variant="default" {...props} />;
}
