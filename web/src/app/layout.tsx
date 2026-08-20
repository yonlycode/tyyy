import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { GoogleAnalytics } from '@/components/analytics';
import { PageShell } from '@/components/layout/PageShell';
import type { ReactNode } from 'react';
import { m3Theme } from '@/styles/theme';
import './globals.css';

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'tyyy';

export const metadata = {
  title: 'Yoann Fort - Portfolio & Blog',
  description: "Portfolio professionnel et blog d'architecte IA et software engineer",
  icons: { icon: isProd ? `/${repoName}/favicon.png` : '/favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fr">
      <head>
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

export const viewport = {
  themeColor: m3Theme.colors.primary,
};
