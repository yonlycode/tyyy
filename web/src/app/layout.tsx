import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import { PageShell } from '@/components/layout/PageShell';
import type { ReactNode } from 'react';
import { m3Theme } from '@/styles/theme';
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

export const viewport = {
  themeColor: m3Theme.colors.primary,
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
            Coexistent avec le thème M3 du portfolio (garde-corps dans
            globals.css). basePath construit comme dans next.config.ts. */}
        <link
          rel="stylesheet"
          href={`${process.env.NODE_ENV === 'production' ? '/tyyy' : ''}/tokens.css`}
        />
        {/* Anti-flash : applique le thème persisté par KadyNavbar avant le
            premier paint (dark = défaut des deux systèmes, rien à poser). */}
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