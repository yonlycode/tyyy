'use client';

import Link from 'next/link';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { Article } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Badge } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import {
  BackLink,
  FooterBar,
  MetaRow,
  ProjectBody,
  Wrapper,
} from './ProjectDetailView.styles';

export function ProjectDetailView({ project }: { project: Article }) {
  return (
    <Wrapper>
      <Container>
        <PageHero
          eyebrow="Portfolio"
          title={project.title}
        />

        <AnimatedFadeIn>
          <BackLink href="/portfolio/">← Retour au portfolio</BackLink>
          <div>
            <MetaRow>
              <span>{project.date}</span>
              <span>•</span>
              <Badge>Projet</Badge>
              {project.tags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    gap: m3Theme.spacing.xs,
                    flexWrap: 'wrap',
                    marginLeft: m3Theme.spacing.sm,
                  }}
                >
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              )}
            </MetaRow>
            <ProjectBody
              className="project-body"
              dangerouslySetInnerHTML={{ __html: project.contentHtml }}
            />
            <FooterBar>
              <Link
                href="/portfolio/"
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
                ← Retour au portfolio
              </Link>
            </FooterBar>
          </div>
        </AnimatedFadeIn>
      </Container>
    </Wrapper>
  );
}
