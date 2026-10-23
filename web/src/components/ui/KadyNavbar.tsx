'use client';

import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { LogoMark } from './Navbar';

// Le bundle kady-ui est embarqué EN LOCAL dans public/ (copie de
// kady-ui/dist, jamais de CDN). next/script ne préfixe PAS automatiquement
// le basePath ('/tyyy' en prod, '' en dev — cf. next.config.ts), donc on
// construit l'URL nous-mêmes (même pattern que src/lib/seo.ts).
const assetBasePath = process.env.NODE_ENV === 'production' ? '/tyyy' : '';

// Typage minimal de l'élément <kady-navbar> (API officielle kady-ui :
// attributs sticky / theme-toggle / links / label ; slots brand, défaut,
// actions ; événement kady-theme-toggle). Rendu via ElementType typé :
// React 19 passe les props string en attributs sur le custom element.
type KadyNavbarHostProps = React.HTMLAttributes<HTMLElement> & {
  sticky?: string;
  'theme-toggle'?: string;
  links?: string;
  label?: string;
  ref?: React.Ref<HTMLElement>;
};

const KadyNavbarHost = 'kady-navbar' as unknown as React.ElementType<
  KadyNavbarHostProps & React.Attributes
>;

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/articles/', label: 'Articles' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/contact/', label: 'Contact' },
];

function isActive(href: string, pathname: string | null): boolean {
  return (
    pathname === href || (href !== '/' && pathname?.startsWith(href)) || false
  );
}

// Pont thème : <kady-navbar> ne gère AUCUNE persistance. Il lit data-theme
// sur <html> (icône soleil/lune) et émet `kady-theme-toggle` { theme } —
// c'est le consommateur (ici) qui applique l'attribut + localStorage.
// Depuis le socle harmonisé, data-theme pilote TOUT le site : les composants
// kady (shadow DOM, tokens via public/tokens.css) ET la page Emotion (le
// thème m3Theme consomme les mêmes variables --kady-*).
function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('kady-theme', theme);
  } catch {
    // Mode privé / stockage indisponible : on garde le thème en mémoire.
  }
}

export function KadyNavbar() {
  const pathname = usePathname();
  const hostRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const onThemeToggle = (event: Event) => {
      const detail = (event as CustomEvent<{ theme?: 'light' | 'dark' }>).detail;
      applyTheme(detail?.theme === 'light' ? 'light' : 'dark');
    };
    // L'événement est émis composed:true + bubbles:true depuis le shadow DOM.
    host.addEventListener('kady-theme-toggle', onThemeToggle);
    return () => host.removeEventListener('kady-theme-toggle', onThemeToggle);
  }, []);

  return (
    <>
      {/* Injection unique du bundle (next/script déduplique par src).
          type="module" : le script s'exécute après le parsing, Lit définit
          le custom element et « upgrade » le <kady-navbar> déjà présent
          dans le HTML — aucun flash, aucun warning d'hydratation. */}
      <Script
        src={`${assetBasePath}/kady-ui.js`}
        type="module"
        strategy="afterInteractive"
      />
      <KadyNavbarHost ref={hostRef} sticky="" theme-toggle="" label="Navigation">
        {/* Marque du portfolio : visuel actuel conservé (LogoMark « TY3 »). */}
        <Link href="/" slot="brand">
          <LogoMark>TY3</LogoMark>
        </Link>
        {/* Slot par défaut : next/link rend un <a> normal, projeté tel quel
            dans le slot et stylé par le composant (::slotted(a)). */}
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href, pathname) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
        {/* Pas de slot actions : le Navbar actuel n'a aucun CTA. */}
      </KadyNavbarHost>
    </>
  );
}
