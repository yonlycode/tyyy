'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { Article } from '@/types/article';

interface ArticleViewProps {
  article: Article;
}

const Container = styled.article`
  max-width: 820px;
  margin: 0 auto;
  padding: 8rem 2rem 7rem;

  @media (max-width: 768px) {
    padding: 6.5rem 1.25rem 4rem;
  }
`;

const BackNav = styled.div`
  margin-bottom: 2.5rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ink-muted);
  text-decoration: none;
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  background: var(--surface);
  border: 1px solid var(--border);
  transition: all 0.2s ease;

  &:hover {
    color: var(--brand);
    border-color: var(--brand);
    transform: translateX(-3px);
  }
`;

const Header = styled.header`
  margin-bottom: 3.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-subtle);
`;

const MetaBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--ink-muted);
`;

const MetaPill = styled.span`
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  font-weight: 500;
`;

const TagBadge = styled.span`
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  background: rgba(0, 212, 170, 0.1);
  border: 1px solid rgba(0, 212, 170, 0.25);
  color: var(--brand);
  font-weight: 600;
  font-size: 0.8rem;
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--ink);
  line-height: 1.18;
  margin-bottom: 1.75rem;

  @media (max-width: 768px) {
    font-size: 2.15rem;
  }
`;

const LeadCallout = styled.div`
  position: relative;
  padding: 1.75rem 2rem;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 4px solid var(--brand);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);

  p {
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.75;
    color: var(--ink);
    font-weight: 450;
  }
`;

const Content = styled.div`
  font-size: 1.125rem;
  line-height: 1.85;
  color: var(--ink);
  letter-spacing: -0.01em;

  h2 {
    font-size: 1.85rem;
    font-weight: 800;
    color: var(--ink);
    margin: 3.5rem 0 1.25rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-subtle);
    line-height: 1.25;
    letter-spacing: -0.025em;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--ink);
    margin: 2.5rem 0 1rem;
    line-height: 1.3;
  }

  p {
    margin: 1.6rem 0;
    color: var(--ink);
    opacity: 0.92;
  }

  ul, ol {
    margin: 1.6rem 0;
    padding-left: 1.75rem;
  }

  li {
    margin-bottom: 0.75rem;
    padding-left: 0.25rem;
    color: var(--ink);
    opacity: 0.92;
  }

  blockquote {
    margin: 2.5rem 0;
    padding: 1.5rem 1.75rem;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 4px solid var(--brand);
    font-style: normal;
    color: var(--ink);
    font-weight: 500;

    p {
      margin: 0;
      font-size: 1.15rem;
    }
  }

  code:not(pre code) {
    background: var(--surface-elevated);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.2rem 0.5rem;
    font-size: 0.9em;
    color: var(--brand);
    font-weight: 600;
  }

  pre {
    background: var(--surface) !important;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
    margin: 2.25rem 0;
    overflow-x: auto;
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.06);
  }

  hr {
    margin: 3.5rem 0;
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
  }

  a {
    color: var(--brand);
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1.5px;

    &:hover {
      color: var(--ink);
    }
  }

  strong {
    color: var(--ink);
    font-weight: 700;
  }
`;

const Footer = styled.footer`
  margin-top: 4.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
`;

const FooterLink = styled(Link)`
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    text-decoration: underline;
  }
`;

export function ArticleView({ article }: ArticleViewProps) {
  return (
    <Container>
      <AnimatedFadeIn>
        <BackNav>
          <BackLink href="/articles">
            <span>←</span> Retour aux articles
          </BackLink>
        </BackNav>

        <Header>
          <MetaBar>
            <MetaPill>{article.date}</MetaPill>
            <MetaPill>{article.readingTime}</MetaPill>
            {article.tags?.map((tag) => (
              <TagBadge key={tag}>#{tag}</TagBadge>
            ))}
          </MetaBar>

          <Title>{article.title}</Title>

          <LeadCallout>
            <p>{article.description}</p>
          </LeadCallout>
        </Header>

        <Content dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

        <Footer>
          <FooterLink href="/articles">
            <span>←</span> Voir tous les articles
          </FooterLink>
          <FooterLink href="/#projets">
            Découvrir les projets du Lab <span>→</span>
          </FooterLink>
        </Footer>
      </AnimatedFadeIn>
    </Container>
  );
}
