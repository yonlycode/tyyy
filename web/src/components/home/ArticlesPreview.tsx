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

const ArticleTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.lg,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.4,
  margin: 0,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.primary },
});

const ArticleDesc = styled('p')({
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.6,
  marginTop: m3Theme.spacing.md,
  marginBottom: 'auto',
});

const ArticleMeta = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
  paddingTop: m3Theme.spacing.md,
  borderTop: `1px solid ${m3Theme.colors.outlineVariant}`,
});

const ReadMore = styled('span')({
  color: m3Theme.colors.primary,
  fontSize: m3Theme.font.sizes.sm,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.brandAccent },
});

const ArrowLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  color: m3Theme.colors.primary,
  fontWeight: m3Theme.font.weights.semibold,
  textDecoration: 'none',
  marginTop: m3Theme.spacing.xl,
  transition: 'gap 0.2s ease, color 0.2s ease',

  '&:hover': { color: m3Theme.colors.secondary, gap: m3Theme.spacing.md },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderRadius: m3Theme.radius.small,
  },
});

export function ArticlesPreview({ articles }: { articles: ArticleMeta[] }) {
  return (
    <Section style={{ background: m3Theme.colors.surfaceBright }}>
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
                <FeatureCard
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleDesc>{article.description}</ArticleDesc>
                  <ArticleMeta>
                    <span style={{ color: m3Theme.colors.onSurfaceVariant, fontSize: m3Theme.font.sizes.xs }}>
                      {article.date}
                    </span>
                    <ReadMore>Lire plus →</ReadMore>
                  </ArticleMeta>
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
