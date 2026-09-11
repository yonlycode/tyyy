'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
`;

export const CtaRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
});

export const TagsRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: m3Theme.spacing.sm,
  marginTop: m3Theme.spacing.md,
});

export const ScrollHint = styled('div')({
  color: m3Theme.colors.primaryHover,
  opacity: 0.5,
  fontSize: m3Theme.font.sizes.xl,
  animation: `${bounce} 2s ease-in-out infinite`,
  marginTop: m3Theme.spacing.xl,
});
