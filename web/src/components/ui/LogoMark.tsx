'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const LogoMark = styled('span')({
  width: '34px',
  height: '34px',
  borderRadius: m3Theme.radius.medium,
  background: m3Theme.gradients.glow,
  color: m3Theme.colors.onPrimary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.bold,
  boxShadow: m3Theme.elevation.level1,
});
