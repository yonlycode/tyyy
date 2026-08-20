'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Centered, max-width content wrapper */
export const Container = styled('div')({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  paddingInline: `clamp(${m3Theme.spacing.md}, 4vw, ${m3Theme.spacing.xl})`,
});
