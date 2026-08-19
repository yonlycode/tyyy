'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import {
  FeatureCard,
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  SectionSubtitle,
} from '@/components/ui';

const ArticleGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
});

const ArticleLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  height: '100%',
});

const CategoryBadge = styled('span')({
  display: 'inline-block',
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
  fontSize: m3Theme.font.sizes.lg,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.4,
  margin: 0,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.primaryHover },
});

const ArticleDesc = styled('p')({
  color: m3Theme.colors.onSurfaceMuted,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.6,
  marginTop: m3Theme.spacing.md,
  marginBottom: 'auto',
});

const ArticleFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
  paddingTop: m3Theme.spacing.md,
  borderTop: `1px solid ${m3Theme.colors.surfaceBorder}`,
});

const ArticleDate = styled('span')({
  color: m3Theme.colors.onSurfaceDim,
  fontSize: m3Theme.font.sizes.xs,
  fontFamily: m3Theme.font.mono,
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

const ArrowLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  color: m3Theme.colors.primaryHover,
  fontWeight: m3Theme.font.weights.semibold,
  textDecoration: 'none',
  marginTop: m3Theme.spacing.xl,
  transition: 'gap 0.2s ease, color 0.2s ease',

  '&:hover': { color: m3Theme.colors.primary, gap: m3Theme.spacing.md },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderRadius: m3Theme.radius.small,
  },
});

export function ArticlesPreview({ articles }: { articles: ArticleMeta[] }) {
  return (
    <Section>
      <Container>
        <AnimatedFadeIn>
          <SectionHeader>
            <Eyebrow>Blog</Eyebrow>
            <SectionTitle>Derniers articles</SectionTitle>
            <SectionSubtitle>
              Mes réflexions sur l'architecture IA, les performances et le développement web.
            </SectionSubtitle>
          </SectionHeader>
        </AnimatedFadeIn>

        <ArticleGrid>
          {articles.map((article, i) => (
            <AnimatedFadeIn key={article.slug} delay={0.1 + i * 0.12}>
              <ArticleLink href={`/articles/${article.slug}/`}>
                <FeatureCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CategoryBadge>Article</CategoryBadge>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleDesc>{article.description}</ArticleDesc>
                  <ArticleFooter>
                    <ArticleDate>{article.date}</ArticleDate>
                    <ReadMore>
                      Lire la suite <span aria-hidden="true">→</span>
                    </ReadMore>
                  </ArticleFooter>
                </FeatureCard>
              </ArticleLink>
            </AnimatedFadeIn>
          ))}
        </ArticleGrid>

        <div style={{ textAlign: 'center' }}>
          <ArrowLink href="/articles/">Voir tous les articles</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
