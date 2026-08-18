'use client';

import { ThemeProvider as EmotionTheme } from '@emotion/react';
import type { ReactNode } from 'react';
import { m3Theme } from '@/styles/theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <EmotionTheme theme={m3Theme}>{children}</EmotionTheme>;
}
