'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';

/* ── Icon ──────────────────────────────────────────────────────────── */

const SearchIcon = styled('svg')({
  width: 18,
  height: 18,
  flexShrink: 0,
  color: m3Theme.colors.onSurfaceVariant,
  pointerEvents: 'none',
});

/* ── Styles ────────────────────────────────────────────────────────── */

const Wrapper = styled('div')({
  position: 'relative',
  maxWidth: 480,
  width: '100%',
  margin: '0 auto',
});

const Input = styled('input')({
  width: '100%',
  height: 44,
  padding: '0 0 0 2.5rem',
  borderRadius: m3Theme.radius.medium,
  border: `1.5px solid ${m3Theme.colors.outline}`,
  background: m3Theme.colors.surface,
  color: m3Theme.colors.onSurface,
  fontSize: m3Theme.font.sizes.md,
  fontFamily: m3Theme.font.family,
  outline: 'none',
  transition: `border-color ${m3Theme.animation.base}, box-shadow ${m3Theme.animation.base}`,

  '&::placeholder': {
    color: m3Theme.colors.onSurfaceVariant,
  },

  '&:focus': {
    borderColor: m3Theme.colors.primary,
    boxShadow: m3Theme.elevation.focus,
  },
});

const IconWrapper = styled('div')({
  position: 'absolute',
  left: '0.875rem',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
});

/* ── Component ─────────────────────────────────────────────────────── */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Rechercher…',
}: SearchInputProps) {
  return (
    <Wrapper>
      <IconWrapper>
        <SearchIcon
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </SearchIcon>
      </IconWrapper>
      <Input
        type="text"
        inputMode="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </Wrapper>
  );
}
