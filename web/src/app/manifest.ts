import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'tyyy',
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    // Le manifest PWA est du JSON statique : var(--kady-*) y serait invalide
    // (ignoré par le navigateur). Hex statiques = valeurs kady du thème par
    // défaut (dark Abysse), cf. tokens du package @karulab/kady-ui.
    background_color: '#080B14',
    theme_color: '#6B5CE7',
    lang: 'fr',
    icons: [
      {
        src: '/icon.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
export const dynamic = "force-static";
