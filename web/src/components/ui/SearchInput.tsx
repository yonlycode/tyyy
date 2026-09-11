'use client';

import { IconWrapper, Input, SearchIcon, Wrapper } from './SearchInput.styles';

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

/* ── Component ─────────────────────────────────────────────────────── */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
