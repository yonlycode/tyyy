'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { Article } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Badge } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';

const Wrapper = styled('div')({
  paddingBlock: m3Theme.spacing.xxl,
});

const ArticleContainer = styled('div')({
  maxWidth: '820px',
  margin: '0 auto',
});

const BackLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'var(--ink-muted)',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  marginBottom: '2.5rem',
  padding: '0.45rem 1.1rem',
  borderRadius: '9999px',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',

  '&:hover': {
    color: 'var(--brand)',
    borderColor: 'var(--brand)',
    transform: 'translateX(-3px)',
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

const HeaderCallout = styled('div')({
  position: 'relative',
  padding: '1.75rem 2rem',
  borderRadius: '16px',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderLeft: '4px solid var(--brand)',
  boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
  marginTop: '1.75rem',
  marginBottom: '3rem',

  '& p': {
    margin: 0,
    fontSize: '1.15rem',
    lineHeight: 1.75,
    color: 'var(--ink)',
    fontWeight: 450,
  },
});

const MetaRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.75rem',
  marginTop: '1.25rem',
  color: 'var(--ink-muted)',
  fontSize: '0.875rem',
});

const MetaPill = styled('span')({
  padding: '0.3rem 0.75rem',
  borderRadius: '6px',
  backgroundColor: 'var(--surface-elevated)',
  border: '1px solid var(--border)',
  fontWeight: 500,
});

const ArticleBody = styled('div')({
  fontSize: '1.125rem',
  lineHeight: 1.85,
  color: 'var(--ink)',
  letterSpacing: '-0.01em',

  '& h2': {
    fontSize: '1.85rem',
    fontWeight: 800,
    color: 'var(--ink)',
    margin: '3.5rem 0 1.25rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border-subtle)',
    lineHeight: 1.25,
    letterSpacing: '-0.025em',
  },

  '& h3': {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'var(--ink)',
    margin: '2.5rem 0 1rem',
    lineHeight: 1.3,
  },

  '& p': {
    margin: '1.6rem 0',
    color: 'var(--ink)',
    opacity: 0.92,
  },

  '& ul, & ol': {
    margin: '1.6rem 0',
    paddingLeft: '1.75rem',
  },

  '& li': {
    marginBottom: '0.75rem',
    paddingLeft: '0.25rem',
    color: 'var(--ink)',
    opacity: 0.92,
  },

  '& blockquote': {
    margin: '2.5rem 0',
    padding: '1.5rem 1.75rem',
    borderRadius: '12px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderLeft: '4px solid var(--brand)',
    fontStyle: 'normal',
    color: 'var(--ink)',
    fontWeight: 500,

    '& p': {
      margin: 0,
      fontSize: '1.15rem',
    },
  },

  '& code:not(pre code)': {
    backgroundColor: 'var(--surface-elevated)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '0.2rem 0.5rem',
    fontSize: '0.9em',
    color: 'var(--brand)',
    fontWeight: 600,
  },

  '& pre': {
    backgroundColor: 'var(--surface) !important',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
    margin: '2.25rem 0',
    overflowX: 'auto',
    boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.06)',
  },

  '& hr': {
    margin: '3.5rem 0',
    border: 'none',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
  },

  '& a': {
    color: 'var(--brand)',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    textDecorationThickness: '1.5px',

    '&:hover': {
      color: 'var(--ink)',
    },
  },

  '& strong': {
    color: 'var(--ink)',
    fontWeight: 700,
  },
});

const FooterBar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '4rem',
  paddingTop: '2rem',
  borderTop: '1px solid var(--border)',
});

export function ArticleView({ article }: { article: Article }) {
  return (
    <Wrapper>
      <Container>
        <ArticleContainer>
          <PageHero
            eyebrow="LAB & INGÉNIERIE"
            title={article.title}
          />

          <AnimatedFadeIn>
            <BackLink href="/articles/">
              <span>←</span> Retour aux articles
            </BackLink>
            <div>
              <MetaRow>
                <MetaPill>{article.date}</MetaPill>
                <MetaPill>{article.readTime}</MetaPill>
                {article.tags.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginLeft: '0.25rem',
                    }}
                  >
                    {article.tags.map((tag) => (
                      <Badge key={tag}>#{tag}</Badge>
                    ))}
                  </div>
                )}
              </MetaRow>

              <HeaderCallout>
                <p>{article.description}</p>
              </HeaderCallout>

              <ArticleBody
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />

              <FooterBar>
                <Link
                  href="/articles/"
                  style={{
                    textDecoration: 'none',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--brand)',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>←</span> Tous les articles
                </Link>

                <Link
                  href="/#projets"
                  style={{
                    textDecoration: 'none',
                    color: 'var(--ink-muted)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  Découvrir les projets <span>→</span>
                </Link>
              </FooterBar>
            </div>
          </AnimatedFadeIn>
        </ArticleContainer>
      </Container>
    </Wrapper>
  );
}
