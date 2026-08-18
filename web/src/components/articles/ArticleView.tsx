'use client';

import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { Article } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Card, Badge, OutlineButtonLink } from '@/components/ui';

const Wrapper = styled('div')({
  paddingBlock: m3Theme.spacing.xxl,
});

const BackLink = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  color: m3Theme.colors.primary,
  textDecoration: 'none',
  fontWeight: m3Theme.font.weights.semibold,
  fontSize: m3Theme.font.sizes.sm,
  marginBottom: m3Theme.spacing.lg,
  transition: 'gap 0.2s ease, color 0.2s ease',

  '&:hover': { color: m3Theme.colors.secondary, gap: m3Theme.spacing.md },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderRadius: m3Theme.radius.small,
  },
});

const Title = styled('h1')({
  fontSize: m3Theme.font.sizes['4xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: m3Theme.font.lineHeights.tight,
  letterSpacing: '-0.02em',
  color: m3Theme.colors.onSurface,
  margin: 0,
});

const MetaRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.md,
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.sm,
});

const ArticleBody = styled('div')({
  marginTop: m3Theme.spacing.xl,
});

const FooterBar = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: m3Theme.spacing.xl,
  paddingTop: m3Theme.spacing.xl,
  borderTop: `1px solid ${m3Theme.colors.outlineVariant}`,
});

export function ArticleView({ article }: { article: Article }) {
  return (
    <Wrapper>
      <Container>
        <AnimatedFadeIn>
          <BackLink href="/articles/">← Retour aux articles</BackLink>
          <Card style={{ padding: m3Theme.spacing.xxl }}>
            <Title>{article.title}</Title>
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
              <OutlineButtonLink
                href="/articles/"
                style={{ borderColor: m3Theme.colors.primary, color: m3Theme.colors.primary }}
              >
                ← Tous les articles
              </OutlineButtonLink>
            </FooterBar>
          </Card>
        </AnimatedFadeIn>
      </Container>
    </Wrapper>
  );
}