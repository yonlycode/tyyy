'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export const StatsBand = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  marginTop: m3Theme.spacing.section,
  position: 'relative',
  zIndex: 2,

  /* Vertical dividers between columns */
  '& > *:not(:last-child)': {
    borderRight: `1px solid ${m3Theme.colors.surfaceBorder}`,
  },

  '@media (max-width: 700px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    '& > *:nth-child(2)': {
      borderRight: 'none',
    },
    '& > *:nth-child(3), & > *:nth-child(4)': {
      borderRight: 'none',
    },
    /* Add horizontal divider on mobile */
    '& > *:nth-child(n+3)': {
      borderTop: `1px solid ${m3Theme.colors.surfaceBorder}`,
    },
  },
});
