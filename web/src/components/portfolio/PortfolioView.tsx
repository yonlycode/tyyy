'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import {
  Container,
  Section,
  FeatureCard,
  Badge,
  FilterBar,
} from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 620px)': { gridTemplateColumns: '1fr' },
});

const ProjectLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  height: '100%',
});

const ProjectTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.35,
  margin: 0,
});

const ProjectDesc = styled('p')({
  color: m3Theme.colors.onSurfaceVariant,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.7,
  margin: `${m3Theme.spacing.md} 0`,
  flex: 1,
});

const TagRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: m3Theme.spacing.xs,
  marginTop: 'auto',
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

export function PortfolioView({ projects }: { projects: ArticleMeta[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);
      const matchesTags =
        activeTags.length === 0 ||
        project.tags.some((tag) => activeTags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [projects, searchQuery, activeTags]);

  return (
    <Section>
      <Container>
        <PageHero
          eyebrow="Portfolio"
          title="Projets &amp; réalisations"
          subtitle="Un aperçu des projets significatifs sur lesquels j'ai travaillé, de l'architecture IA à l'optimisation web."
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTags={allTags}
          selectedTags={activeTags}
          onTagsChange={setActiveTags}
          resultsCount={filteredProjects.length}
          searchPlaceholder="Rechercher un projet…"
        />

        {filteredProjects.length === 0 ? (
          <EmptyState>
            Aucun projet ne correspond à vos critères de recherche.
          </EmptyState>
        ) : (
          <Grid>
            {filteredProjects.map((project, index) => (
              <AnimatedFadeIn key={project.slug} delay={index * 0.12}>
                <ProjectLink href={`/portfolio/${project.slug}/`}>
                  <FeatureCard
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: m3Theme.spacing.lg,
                    }}
                  >
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDesc>{project.description}</ProjectDesc>
                    <TagRow>
                      {project.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </TagRow>
                  </FeatureCard>
                </ProjectLink>
              </AnimatedFadeIn>
            ))}
          </Grid>
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
