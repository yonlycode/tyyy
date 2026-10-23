'use client';

import styled from '@emotion/styled';
import { KadyInputHost, type KadyInputElement } from './kady-host';

/* ── Wrapper kady-input ──────────────────────────────────────────────
   SearchInput Emotion → <kady-input> (API officielle : label, placeholder,
   value, type, name, slots label/prefix/suffix/error). L'icône recherche
   passe par le slot « prefix » du composant — plus de positionnement absolu
   maison.
   Événements : le <input> interne émet un événement natif `input`
   (composed:true) qui traverse la frontière du shadow DOM et est retargeté
   sur l'hôte ; l'hôte kady-input expose le getter .value (API officielle) —
   on le lit directement, pas besoin d'écouter kady-input/kady-change à la
   main. Le composant reste contrôlé (value repassée en attribut à chaque
   render).
   Signature conservée : { value, onChange(value), placeholder }. */

const Wrapper = styled('div')({
  maxWidth: 480,
  width: '100%',
  margin: '0 auto',
});

const SearchIcon = (
  <svg
    slot="prefix"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* ── Component ─────────────────────────────────────────────────────── */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Rechercher…',
}: SearchInputProps) {
  return (
    <Wrapper>
      <KadyInputHost
        type="text"
        placeholder={placeholder}
        value={value}
        onInput={(e: React.FormEvent<HTMLElement>) =>
          onChange((e.target as KadyInputElement).value)
        }
      >
        {SearchIcon}
      </KadyInputHost>
    </Wrapper>
  );
}
