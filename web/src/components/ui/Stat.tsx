'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

const StatWrap = styled('div')({
  textAlign: 'center',
  padding: m3Theme.spacing.lg,
});

const StatValue = styled('div')({
  fontSize: m3Theme.font.sizes['4xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  background: m3Theme.gradients.text,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  lineHeight: m3Theme.font.lineHeights.tight,
  marginBottom: m3Theme.spacing.xs,
});

const StatLabel = styled('div')({
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.onSurfaceVariant,
  fontWeight: m3Theme.font.weights.medium,
});

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <StatWrap>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatWrap>
  );
}