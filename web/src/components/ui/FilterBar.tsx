'use client';

import styled from '@emotion/styled';
import { m3Theme } from '@/styles/theme';
import { SearchInput, MultiSelect } from '@/components/ui';

/* ── Styles ────────────────────────────────────────────────────────── */

const Container = styled('div')({
  marginBottom: m3Theme.spacing.xxl,
});

const SearchRow = styled('div')({
  marginBottom: m3Theme.spacing.md,
});

const FilterRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  flexWrap: 'wrap',
  marginBottom: m3Theme.spacing.sm,
});

const ResultsCount = styled('p')({
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.onSurfaceVariant,
  marginTop: m3Theme.spacing.sm,
  marginBottom: 0,
});

const ClearAllButton = styled('button')({
  fontSize: m3Theme.font.sizes.sm,
  color: m3Theme.colors.primary,
  fontWeight: m3Theme.font.weights.medium,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '0.25rem 0.5rem',
  borderRadius: m3Theme.radius.small,
  fontFamily: m3Theme.font.family,
  transition: `background ${m3Theme.animation.base}`,

  '&:hover': {
    background: m3Theme.colors.primaryContainer,
  },
});

/* ── Component ─────────────────────────────────────────────────────── */

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  resultsCount?: number;
  searchPlaceholder?: string;
  filterPlaceholder?: string;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  allTags,
  selectedTags,
  onTagsChange,
  resultsCount,
  searchPlaceholder = 'Rechercher…',
  filterPlaceholder = 'Filtres',
}: FilterBarProps) {
  const filtersActive = searchQuery.length > 0 || selectedTags.length > 0;

  return (
    <Container>
      <SearchRow>
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      </SearchRow>

      {allTags.length > 0 && (
        <FilterRow>
          <MultiSelect
            options={allTags}
            selected={selectedTags}
            onChange={onTagsChange}
            placeholder={filterPlaceholder}
          />
          {selectedTags.length > 0 && (
            <ClearAllButton onClick={() => onTagsChange([])}>
              Réinitialiser les filtres
            </ClearAllButton>
          )}
        </FilterRow>
      )}

      {filtersActive && resultsCount !== undefined && (
        <ResultsCount>
          {resultsCount} résultat{resultsCount !== 1 ? 's' : ''} affiché{resultsCount !== 1 ? 's' : ''}
        </ResultsCount>
      )}
    </Container>
  );
}
