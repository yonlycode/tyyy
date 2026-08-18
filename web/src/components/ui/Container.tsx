'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Centered, max-width content wrapper */
export const Container = styled('div')({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  paddingInline: m3Theme.spacing.xl,
});