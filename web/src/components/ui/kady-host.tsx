'use client';

import { useEffect } from 'react';

/* ── Chargeur du bundle kady-ui ──────────────────────────────────────
   Le bundle (@karulab/kady-ui, point d'entrée exports "." → dist/kady-ui.js)
   appelle customElements.define à l'évaluation du module : un import statique
   serait évalué côté serveur pendant le prerender Next (output: 'export') et
   crasherait (pas de customElements en Node). D'où l'import DYNAMIQUE dans un
   useEffect : le chunk est bundlé et fingerprinté par Next (plus de fichier
   libre dans public/), chargé après hydratation, et Lit « upgrade » alors les
   custom elements déjà présents dans le DOM — même sémantique que l'ancien
   next/script strategy="afterInteractive".
   NB : le sous-chemin './dist/kady-ui.js' n'est pas exposé par le champ
   exports du package ; c'est le specifier nu '@karulab/kady-ui' qu'il faut
   importer. */
export function KadyElements() {
  useEffect(() => {
    import('@karulab/kady-ui');
  }, []);
  return null;
}

/* ── Hôtes typés pour les custom elements kady-ui ────────────────────
   Même pattern que KadyNavbar.tsx : un ElementType typé pour que TS accepte
   les attributs custom ; React 19 passe les props string en attributs et
   retire l'attribut quand la valeur est false/null (sémantique booléenne Lit
   compatible). Les props objet ne sont PAS utilisées ici (tout est string ou
   booléen simple dans l'API kady-ui consommée). */

type HostProps = React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> };

export const KadyButtonHost = 'kady-button' as unknown as React.ElementType<
  HostProps & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    href?: string;
    name?: string;
    value?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: '' | true;
  }
>;

export const KadyCardHost = 'kady-card' as unknown as React.ElementType<
  HostProps & { variant?: 'default' | 'raised' | 'interactive' }
>;

export const KadyBadgeHost = 'kady-badge' as unknown as React.ElementType<
  HostProps & {
    variant?: 'primary' | 'accent' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
    size?: 'sm' | 'md';
    dot?: '' | true;
  }
>;

/** kady-input : le champ interne vit dans le shadow DOM ; l'événement natif
 *  `input` (composed:true) traverse la frontière et est retargeté sur l'hôte,
 *  qui expose le getter .value (API officielle du composant). */
export interface KadyInputElement extends HTMLElement {
  value: string;
}

export const KadyInputHost = 'kady-input' as unknown as React.ElementType<
  HostProps & {
    label?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    type?: string;
    name?: string;
    disabled?: '' | true;
    required?: '' | true;
  }
>;

export const KadyHeroHost = 'kady-hero' as unknown as React.ElementType<
  HostProps & { eyebrow?: string; title?: string; subtitle?: string }
>;

export const KadyMrrStatHost = 'kady-mrr-stat' as unknown as React.ElementType<
  HostProps & {
    value?: string | number;
    currency?: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    label?: string;
    period?: string;
    subtitle?: string;
  }
>;
