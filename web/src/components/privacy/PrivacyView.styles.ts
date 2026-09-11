'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const SectionBlock = styled('div')({
  marginTop: m3Theme.spacing.lg,
});

export const Heading = styled('h2')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.primary,
  margin: `0 0 ${m3Theme.spacing.md}`,
});

export const Paragraph = styled('p')({
  color: m3Theme.colors.onSurfaceVariant,
  lineHeight: m3Theme.font.lineHeights.relaxed,
  margin: 0,
});
