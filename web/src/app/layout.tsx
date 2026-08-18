import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { GoogleAnalytics } from '@/components/analytics';
import { PageShell } from '@/components/layout/PageShell';
import type { ReactNode } from 'react';
import { m3Theme } from '@/styles/theme';
import './globals.css';

export const metadata = {
  title: 'Yoann Fort - Portfolio & Blog',
  description: "Portfolio professionnel et blog d'architecte IA et software engineer",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <PageShell>{children}</PageShell>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-XXXXXXX" />
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: m3Theme.colors.primary,
};