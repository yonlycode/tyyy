'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Section, FilterBar } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';

const ArticleGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.xl,
  rowGap: m3Theme.spacing.xl,
  columnGap: m3Theme.spacing.xl,
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: m3Theme.spacing.lg,
    rowGap: m3Theme.spacing.lg,
    columnGap: m3Theme.spacing.lg,
  },
  '@media (max-width: 620px)': {
    gridTemplateColumns: '1fr',
    gap: m3Theme.spacing.lg,
    rowGap: m3Theme.spacing.lg,
  },
});

const ArticleLink = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: 1,
});

const ArticleCard = styled('div')({
  position: 'relative',
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(15, 21, 38, 0.75)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: m3Theme.radius.large,
  padding: m3Theme.spacing.lg,
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: m3Theme.elevation.level1,
  transition: `border-color ${m3Theme.animation.base}, transform ${m3Theme.animation.base}, box-shadow ${m3Theme.animation.base}`,
  userSelect: 'none',

  [`${ArticleLink}:hover &`]: {
    borderColor: m3Theme.colors.surfaceBorderHover,
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 32px ${m3Theme.colors.primaryGlow}, ${m3Theme.elevation.level2}`,
  },

  [`${ArticleLink}:focus-visible &`]: {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

const CategoryBadge = styled('span')({
  display: 'inline-block',
  alignSelf: 'flex-start',
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.xs,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: m3Theme.colors.primaryHover,
  background: m3Theme.colors.primarySoft,
  padding: '0.2rem 0.6rem',
  borderRadius: m3Theme.radius.small,
  marginBottom: m3Theme.spacing.md,
});

const ArticleTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.35,
  margin: 0,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.primaryHover },
});

const ArticleDesc = styled('p')({
  color: m3Theme.colors.onSurfaceMuted,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.7,
  marginTop: m3Theme.spacing.md,
  marginBottom: 'auto',
  flex: 1,
});

const TagRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: m3Theme.spacing.xs,
  marginTop: m3Theme.spacing.md,
});

const Tag = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: m3Theme.radius.small,
  padding: '0.2rem 0.5rem',
  fontSize: '0.75rem',
  fontWeight: 500,
  fontFamily: m3Theme.font.mono,
  color: m3Theme.colors.onSurfaceDim,
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
});

const ArticleMeta = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
  paddingTop: m3Theme.spacing.md,
  paddingBottom: m3Theme.spacing.xs,
  minHeight: '48px',
  borderTop: `1px solid ${m3Theme.colors.surfaceBorder}`,
});

const ArticleDate = styled('span')({
  color: m3Theme.colors.onSurfaceDim,
  fontSize: m3Theme.font.sizes.xs,
  fontFamily: m3Theme.font.mono,
  whiteSpace: 'nowrap',
});

const ReadMore = styled('span')({
  color: m3Theme.colors.primaryHover,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease, gap 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.xs,

  [`${ArticleLink}:hover &`]: {
    color: m3Theme.colors.primary,
    gap: m3Theme.spacing.sm,
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
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.lg,
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
          eyebrow="Blog"
          title="Articles &amp; billets"
          subtitle="Mes écrits sur l'architecture IA, la performance et le développement web."
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTags={allTags}
          selectedTags={activeTags}
          onTagsChange={setActiveTags}
          resultsCount={filteredArticles.length}
          searchPlaceholder="Rechercher un article…"
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
                delay={index * 0.1}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <ArticleLink href={`/articles/${article.slug}/`}>
                  <ArticleCard>
                    <CategoryBadge>{(article.tags && article.tags[0]) || 'Article'}</CategoryBadge>
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <ArticleDesc>{article.description}</ArticleDesc>
                    {article.tags && article.tags.length > 0 && (
                      <TagRow>
                        {article.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagRow>
                    )}
                    <ArticleMeta>
                      <ArticleDate>{article.date}</ArticleDate>
                      <ReadMore>
                        Lire la suite <span aria-hidden="true">→</span>
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
            href="/"
            style={{
              textDecoration: 'none',
              border: `2px solid ${m3Theme.colors.primary}`,
              color: m3Theme.colors.primary,
              borderRadius: m3Theme.radius.medium,
              padding: '0.875rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            ← Retour à l'accueil
          </Link>
        </FooterRow>
      </Container>
    </Section>
  );
}
