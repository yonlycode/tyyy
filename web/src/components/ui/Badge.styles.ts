'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

export interface BadgeProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

/** Badge component — supports read-only and clickable (active) variants */
export const Badge = styled('span', {
  shouldForwardProp: (prop: string) => prop !== 'active' && prop !== 'onClick',
})<BadgeProps>(
  ({ active = false, onClick }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: m3Theme.radius.small,
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: m3Theme.font.mono,
    background: active ? m3Theme.colors.primarySoft : m3Theme.colors.surfaceBorder,
    color: active ? m3Theme.colors.primaryHover : m3Theme.colors.onSurfaceMuted,
    cursor: onClick ? 'pointer' : 'default',
    transition: `background ${m3Theme.animation.base}, color ${m3Theme.animation.base}, transform ${m3Theme.animation.fast}`,
    userSelect: 'none' as const,

    ...(onClick
      ? {
          '&:hover': {
            background: active
              ? m3Theme.colors.primary
              : m3Theme.colors.surfaceHover,
            color: active ? m3Theme.colors.onPrimary : m3Theme.colors.onSurface,
            transform: 'scale(1.05)',
          },
        }
      : {}),
  }),
);
