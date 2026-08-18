'use client';

import { useEffect } from 'react';

/** Google Analytics 4 component */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    // Ne pas charger GA4 si l'ID n'est pas configuré
    if (!gaId) return;

    // Charge le script de manière asynchrone
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    ;(window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', gaId);

    // Nettoyage au démontage
    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [gaId]);

  // Le composant ne rend rien (c'est un effet de side-effect)
  return null;
}