'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  CheckIcon,
  Checkbox,
  ChevronIcon,
  Chip,
  ChipRemove,
  ClearLink,
  CountBadge,
  EmptyLabel,
  Footer,
  Option,
  OptionList,
  Panel,
  SearchInput,
  SelectedChips,
  TriggerButton,
  Wrapper,
} from './MultiSelect.styles';

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Filtres',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = useCallback(
    (option: string) => {
      onChange(
        selected.includes(option)
          ? selected.filter((s) => s !== option)
          : [...selected, option],
      );
    },
    [selected, onChange],
  );

  const remove = useCallback(
    (option: string) => {
      onChange(selected.filter((s) => s !== option));
    },
    [selected, onChange],
  );

  const clearAll = useCallback(() => onChange([]), [onChange]);

  // Click-outside handler
  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Focus search input when opening
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const triggerLabel =
    selected.length > 0
      ? `${selected.length} sélectionné${selected.length > 1 ? 's' : ''}`
      : placeholder;

  return (
    <Wrapper ref={containerRef}>
      <TriggerButton
        type="button"
        onClick={() => { setOpen(!open); setSearch(''); }}
      >
        {selected.length > 0 && (
          <SelectedChips>
            {selected.slice(0, 3).map((tag) => (
              <Chip key={tag}>
                {tag}
                <ChipRemove onClick={(e) => { e.stopPropagation(); remove(tag); }}>×</ChipRemove>
              </Chip>
            ))}
            {selected.length > 3 && <CountBadge>+{selected.length - 3}</CountBadge>}
          </SelectedChips>
        )}
        {selected.length === 0 && <span>{triggerLabel}</span>}
        <ChevronIcon open={open}>
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </ChevronIcon>
      </TriggerButton>

      {open && (
        <Panel>
          <SearchInput
            ref={searchRef}
            type="text"
            placeholder="Rechercher un tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
          <OptionList>
            {filtered.length === 0 ? (
              <EmptyLabel>Aucun tag trouvé</EmptyLabel>
            ) : (
              filtered.map((option) => (
                <Option
                  key={option}
                  selected={selected.includes(option)}
                  onClick={() => toggle(option)}
                >
                  <Checkbox checked={selected.includes(option)}>
                    {selected.includes(option) && (
                      <CheckIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </CheckIcon>
                    )}
                  </Checkbox>
                  {option}
                </Option>
              ))
            )}
          </OptionList>
          {selected.length > 0 && (
            <Footer>
              <ClearLink onClick={clearAll}>Tout effacer</ClearLink>
            </Footer>
          )}
        </Panel>
      )}
    </Wrapper>
  );
}

/* ── Component ─────────────────────────────────────────────────────── */

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}
