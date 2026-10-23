'use client';

import { KadyBadgeHost } from './kady-host';

/* ── Wrapper kady-badge ──────────────────────────────────────────────
   Badge Emotion (pillule tag/statut) → <kady-badge> (API officielle :
   variant primary | accent | secondary | success | warning | danger |
   neutral ; size sm | md ; dot ; slot par défaut).
   Mapping retenu : inactif → « neutral » (fond ink 6 %, texte muted —
   l'équivalent kady de l'ancien fond surfaceBorder) ; actif/sélectionné →
   « secondary » (texte primary sur surface + inset line — l'équivalent de
   l'ancien primarySoft + texte primaryHover). Signature props conservée
   (active, onClick, children). */

export interface BadgeProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ active = false, onClick, children, ...rest }: BadgeProps) {
  return (
    <KadyBadgeHost
      variant={active ? 'secondary' : 'neutral'}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
      {...rest}
    >
      {children}
    </KadyBadgeHost>
  );
}
