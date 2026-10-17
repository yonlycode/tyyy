'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Badge } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import { FilterBar } from '@/components/ui/FilterBar';

const Section = styled('section')({
  paddingBlock: m3Theme.spacing.xxl,
});

const ArticleGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
  gap: m3Theme.spacing.xl,
  width: '100%',

  [`@media (max-width: ${m3Theme.breakpoints.mobile})`]: {
    gridTemplateColumns: '1fr',
    gap: m3Theme.spacing.lg,
  },
});

const ArticleLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  height: '100%',
  outline: 'none',
  borderRadius: '20px',

  '&:focus-visible': {
    boxShadow: m3Theme.elevation.focus,
  },
});

const ArticleCard = styled('article')({
  background: 'var(--surface)',
  borderRadius: '20px',
  padding: '2.25rem',
  border: '1px solid var(--border)',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, var(--brand), var(--brand-secondary))',
    opacity: 0,
    transition: 'opacity 0.25s ease',
  },

  [`${ArticleLink}:hover &`]: {
    transform: 'translateY(-4px)',
    borderColor: 'var(--brand)',
    boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.12), 0 0 16px -4px rgba(0, 212, 170, 0.2)',

    '&::before': {
      opacity: 1,
    },
  },
});

const CategoryBadge = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'flex-start',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--brand)',
  backgroundColor: 'rgba(0, 212, 170, 0.1)',
  border: '1px solid rgba(0, 212, 170, 0.25)',
  borderRadius: '9999px',
  padding: '0.3rem 0.85rem',
  marginBottom: '1.25rem',
});

const ArticleTitle = styled('h2')({
  fontSize: '1.4rem',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  color: 'var(--ink)',
  lineHeight: 1.3,
  margin: '0 0 1rem 0',
  transition: 'color 0.2s ease',

  [`${ArticleLink}:hover &`]: {
    color: 'var(--brand)',
  },
});

const ArticleDesc = styled('p')({
  fontSize: '0.975rem',
  color: 'var(--ink-muted)',
  lineHeight: 1.65,
  margin: 0,
  flex: 1,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const TagRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.45rem',
  marginTop: '1.5rem',
});

const Tag = styled('span')({
  backgroundColor: 'var(--surface-elevated)',
  color: 'var(--ink-muted)',
  fontSize: '0.75rem',
  fontWeight: 500,
  borderRadius: '6px',
  padding: '0.2rem 0.6rem',
  border: '1px solid var(--border-subtle)',
});

const ArticleMeta = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '1.75rem',
  paddingTop: '1.25rem',
  borderTop: '1px solid var(--border-subtle)',
});

const ArticleDate = styled('span')({
  color: 'var(--ink-subtle)',
  fontSize: '0.85rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
});

const ReadMore = styled('span')({
  color: 'var(--brand)',
  fontSize: '0.875rem',
  fontWeight: 700,
  transition: 'gap 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',

  [`${ArticleLink}:hover &`]: {
    gap: '0.65rem',
  },
});

const FooterRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: m3Theme.spacing.xxl,
});

const EmptyState = styled('div')({
  textAlign: 'center',
  padding: `${m3Theme.spacing.xxl} 0`,
  color: 'var(--ink-muted)',
  fontSize: '1.15rem',
});

/* ── View ──────────────────────────────────────────────────────────── */

export function ArticlesView({ articles }: { articles: ArticleMeta[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return articles.filter((article) => {
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query);
      const matchesTags =
        activeTags.length === 0 ||
        article.tags.some((tag) => activeTags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [articles, searchQuery, activeTags]);

  return (
    <Section>
      <Container>
        <PageHero
          eyebrow="LAB & INGÉNIERIE"
          title="Articles & Retours du Lab"
          subtitle="Architectures souveraines, inférence locale et flottes multi-agents sans filtre. Des retours d'expérience bruts, 100 % ancrés sur notre code en production."
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTags={allTags}
          selectedTags={activeTags}
          onTagsChange={setActiveTags}
          resultsCount={filteredArticles.length}
          searchPlaceholder="Rechercher un article ou un mot-clé…"
        />

        {filteredArticles.length === 0 ? (
          <EmptyState>
            Aucun article ne correspond à vos critères de recherche.
          </EmptyState>
        ) : (
          <ArticleGrid>
            {filteredArticles.map((article, index) => (
              <AnimatedFadeIn
                key={article.slug}
                delay={index * 0.05}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <ArticleLink href={`/articles/${article.slug}/`}>
                  <ArticleCard>
                    <CategoryBadge>{(article.tags && article.tags[0]) || 'LAB'}</CategoryBadge>
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <ArticleDesc>{article.description}</ArticleDesc>
                    {article.tags && article.tags.length > 0 && (
                      <TagRow>
                        {article.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag}>#{tag}</Tag>
                        ))}
                      </TagRow>
                    )}
                    <ArticleMeta>
                      <ArticleDate>{article.date}</ArticleDate>
                      <ReadMore>
                        Lire l'article <span aria-hidden="true">→</span>
                      </ReadMore>
                    </ArticleMeta>
                  </ArticleCard>
                </ArticleLink>
              </AnimatedFadeIn>
            ))}
          </ArticleGrid>
        )}

        <FooterRow>
          <Link
            href="/#projets"
            style={{
              textDecoration: 'none',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--ink)',
              borderRadius: '9999px',
              padding: '0.875rem 1.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
            }}
          >
            Découvrir les réalisations du Lab →
          </Link>
        </FooterRow>
      </Container>
    </Section>
  );
}
