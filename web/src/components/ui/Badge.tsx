'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/** Badge component */
export const Badge = styled('span')({
  background: m3Theme.colors.surfaceVariant,
  color: m3Theme.colors.onSurfaceVariant,
  borderRadius: m3Theme.radius.small,
  padding: '0.25rem 0.75rem',
  fontSize: '0.875rem',
  fontWeight: 500,
});