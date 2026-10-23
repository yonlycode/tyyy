'use client';

import { useRouter } from 'next/navigation';
import { KadyButtonHost } from './kady-host';

/* ── Wrappers kady-button ────────────────────────────────────────────
   Primitives Emotion remplacées par des wrappers minces du web component
   <kady-button> (API officielle kady-ui 0.1.2 : variant primary | secondary |
   ghost | danger, href → rendu <a>, disabled, type, slot par défaut).
   Les clics sur le <button>/<a> interne (shadow DOM) sont composés : ils
   traversent la frontière et déclenchent bien le onClick React posé sur
   l'hôte — aucun listener manuel nécessaire.

   Les noms/signatures exportés sont conservés (Button, PrimaryButton,
   OutlineButton, SmallButton, ButtonLink, OutlineButtonLink) pour que les
   call-sites (home/, articles/, portfolio/, contact/) ne changent pas.
   kady-button n'a pas de prop de taille : SmallButton rend le variant primary
   standard (le compact Emotion n'a pas d'équivalent dans l'API kady). */

type KadyButtonBaseProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  value?: string;
  id?: string;
  'aria-label'?: string;
};

function KadyButtonInner({
  variant,
  children,
  onClick,
  disabled,
  type = 'button',
  ...rest
}: KadyButtonBaseProps & { variant: 'primary' | 'secondary' | 'ghost' | 'danger' }) {
  return (
    <KadyButtonHost
      variant={variant}
      type={type}
      disabled={disabled ? '' : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </KadyButtonHost>
  );
}

/** Bouton primaire (ex-styled button Emotion) → kady-button primary. */
export function Button(props: KadyButtonBaseProps) {
  return <KadyButtonInner variant="primary" {...props} />;
}

/** CTA primaire — même rendu kady que Button (pas de taille en API kady). */
export function PrimaryButton(props: KadyButtonBaseProps) {
  return <KadyButtonInner variant="primary" {...props} />;
}

/** Bouton outlined → kady-button secondary (surface + bordure line-strong). */
export function OutlineButton(props: KadyButtonBaseProps) {
  return <KadyButtonInner variant="secondary" {...props} />;
}

/** Variante compacte — rendu kady standard (kady-button n'expose pas de taille). */
export function SmallButton(props: KadyButtonBaseProps) {
  return <KadyButtonInner variant="primary" {...props} />;
}

/* ── Variantes « lien » (CTA de navigation interne) ───────────────── */

// basePath du build statique (cf. next.config.ts) : l'attribut href rendu par
// kady-button est un href brut (le router Next ne le préfixe pas) — on le
// préfixe nous-mêmes pour que clic milieu / cmd+clic / no-JS fonctionnent.
const assetBasePath = process.env.NODE_ENV === 'production' ? '/tyyy' : '';

type KadyButtonLinkProps = KadyButtonBaseProps & { href: string };

/** Navigation SPA conservée : le clic natif (composé, retargeté sur l'hôte)
 *  est intercepté puis routé par Next ; les clics modifiés (clic milieu,
 *  cmd/ctrl/shift/alt) passent par l'<a> natif de kady-button. */
function useKadyLinkClick(href: string): React.MouseEventHandler<HTMLElement> {
  const router = useRouter();
  return (e) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    router.push(href);
  };
}

/** CTA primaire rendu comme lien (ex-styled next/link) → kady-button href primary. */
export function ButtonLink({ href, children, disabled, ...rest }: KadyButtonLinkProps) {
  const onClick = useKadyLinkClick(href);
  return (
    <KadyButtonHost
      variant="primary"
      href={`${assetBasePath}${href}`}
      disabled={disabled ? '' : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </KadyButtonHost>
  );
}

/** CTA outlined rendu comme lien → kady-button href secondary. */
export function OutlineButtonLink({ href, children, disabled, ...rest }: KadyButtonLinkProps) {
  const onClick = useKadyLinkClick(href);
  return (
    <KadyButtonHost
      variant="secondary"
      href={`${assetBasePath}${href}`}
      disabled={disabled ? '' : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </KadyButtonHost>
  );
}
