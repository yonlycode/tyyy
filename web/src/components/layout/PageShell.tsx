'use client';

import type { ReactNode } from 'react';
import { Navbar, Footer } from '@/components/ui';

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
      <Footer />
    </div>
  );
}