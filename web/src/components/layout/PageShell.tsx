import type { ReactNode } from 'react';
import { Navbar, Footer } from '@/components/ui';
import { getLinks } from '@/lib/links';

const pageStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: '100vh',
};

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={pageStyles}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer links={getLinks().links} />
    </div>
  );
}