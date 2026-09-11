'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import {
  FeatureCard,
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  SectionSubtitle,
} from '@/components/ui';
import {
  ArrowLink,
  ArticleDate,
  ArticleDesc,
  ArticleFooter,
  ArticleGrid,
  ArticleLink,
  ArticleTitle,
  CategoryBadge,
  ReadMore,
} from './ArticlesPreview.styles';

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
