import type { ReactNode } from 'react';
import { Footer } from '@/components/ui';
import { KadyNavbar } from '@/components/ui/KadyNavbar';
import { getLinks } from '@/lib/links';

const pageStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  minHeight: '100vh',
};

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={pageStyles}>
      <KadyNavbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer links={getLinks().links} />
    </div>
  );
}