'use client';

import { SearchInput, MultiSelect } from '@/components/ui';
import {
  ClearAllButton,
  Container,
  FilterRow,
  ResultsCount,
  SearchRow,
} from './FilterBar.styles';

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
