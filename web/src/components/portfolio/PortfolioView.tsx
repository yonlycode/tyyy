'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Section, FeatureCard, Badge, FilterBar } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';
import {
  EmptyState,
  FooterRow,
  Grid,
  ProjectDesc,
  ProjectLink,
  ProjectTitle,
  TagRow,
} from './PortfolioView.styles';

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
