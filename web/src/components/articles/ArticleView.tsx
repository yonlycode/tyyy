'use client';

import Link from 'next/link';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { Article } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Badge } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import {
  ArticleBody,
  BackLink,
  FooterBar,
  MetaRow,
  Wrapper,
} from './ArticleView.styles';

export function ArticleView({ article }: { article: Article }) {
  return (
    <Wrapper>
      <Container>
        <PageHero
          eyebrow="Blog"
          title={article.title}
        />

        <AnimatedFadeIn>
          <BackLink href="/articles/">← Retour aux articles</BackLink>
          <div>
            <MetaRow>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              {article.tags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    gap: m3Theme.spacing.xs,
                    flexWrap: 'wrap',
                    marginLeft: m3Theme.spacing.sm,
                  }}
                >
                  {article.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              )}
            </MetaRow>
            <ArticleBody
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
            <FooterBar>
              <Link
                href="/articles/"
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
                ← Tous les articles
              </Link>
            </FooterBar>
          </div>
        </AnimatedFadeIn>
      </Container>
    </Wrapper>
  );
}
