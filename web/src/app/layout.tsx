import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PageShell } from '@/components/layout/PageShell';
import type { ReactNode } from 'react';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: 'tyyy' }],
  creator: 'tyyy',
  publisher: 'tyyy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'tyyy',
    locale: 'fr_FR',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  // Le thème du site est piloté par data-theme (toggle kady-navbar), pas par
  // prefers-color-scheme : ce meta (chrome navigateur) est best-effort, sur
  // les fonds kady. var(--kady-*) serait invalide ici — hex statiques.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#080B14' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    // suppressHydrationWarning : le script anti-flash ci-dessous peut poser
    // data-theme="light" sur <html> avant l'hydratation (pattern standard).
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* kady-ui : tokens de design (variables --kady-*), bundle local.
            Source de vérité du thème dual du portfolio : le thème Emotion
            (src/styles/theme.ts) consomme ces variables. basePath construit
            comme dans next.config.ts. */}
        <link
          rel="stylesheet"
          href={`${process.env.NODE_ENV === 'production' ? '/tyyy' : ''}/tokens.css`}
        />
        {/* Anti-flash : applique le thème persisté par KadyNavbar avant le
            premier paint (dark = défaut des tokens kady et du thème Emotion,
            rien à poser ; 'light' doit être posé avant le paint pour éviter
            le FOUC, la page entière — page + shadow DOM kady — suivant
            data-theme). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('kady-theme')==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <PageShell>{children}</PageShell>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-2ZHCGP7VD4" />
      </body>
    </html>
  );
}