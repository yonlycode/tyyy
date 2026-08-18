'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  SectionSubtitle,
  FeatureCard,
  Badge,
  OutlineButtonLink,
} from '@/components/ui';

const ArticleGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
});

const ArticleLink = styled('a')({
  textDecoration: 'none',
  display: 'block',
  height: '100%',
});

const ArticleTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.35,
  margin: 0,
  transition: 'color 0.2s ease',
  [`${ArticleLink}:hover &`]: { color: m3Theme.colors.primary },
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

const FooterRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: m3Theme.spacing.xxl,
});

export function ArticlesView({ articles }: { articles: ArticleMeta[] }) {
  return (
    <Section>
      <Container>
        <AnimatedFadeIn>
          <SectionHeader>
            <Eyebrow>Blog</Eyebrow>
            <SectionTitle>Articles &amp; billets</SectionTitle>
            <SectionSubtitle>
              Mes écrits sur l’architecture IA, la performance et le développement web.
            </SectionSubtitle>
          </SectionHeader>
        </AnimatedFadeIn>

        <ArticleGrid>
          {articles.map((article, index) => (
            <AnimatedFadeIn key={article.slug} delay={index * 0.1}>
              <ArticleLink href={`/articles/${article.slug}/`}>
                <FeatureCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: m3Theme.spacing.xs,
                      marginTop: m3Theme.spacing.md,
                    }}
                  >
                    {article.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <p
                    style={{
                      color: m3Theme.colors.onSurfaceVariant,
                      fontSize: m3Theme.font.sizes.sm,
                      lineHeight: 1.7,
                      marginTop: m3Theme.spacing.md,
                      marginBottom: 'auto',
                    }}
                  >
                    {article.description}
                  </p>
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

        <FooterRow>
          <OutlineButtonLink
            href="/"
            style={{ borderColor: m3Theme.colors.primary, color: m3Theme.colors.primary }}
          >
            ← Retour à l’accueil
          </OutlineButtonLink>
        </FooterRow>
      </Container>
    </Section>
  );
}