'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import { Container, Section, FilterBar } from '@/components/ui';
import { PageHero } from '@/components/ui/PageHero';

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.xl,
  rowGap: m3Theme.spacing.xl,
  columnGap: m3Theme.spacing.xl,
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: m3Theme.spacing.lg,
    rowGap: m3Theme.spacing.lg,
    columnGap: m3Theme.spacing.lg,
  },
  '@media (max-width: 620px)': {
    gridTemplateColumns: '1fr',
    gap: m3Theme.spacing.lg,
    rowGap: m3Theme.spacing.lg,
  },
});

const ProjectLink = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: 1,
});

const ProjectCard = styled('div')({
  position: 'relative',
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: 'color-mix(in srgb, var(--kady-surface) 75%, transparent)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: m3Theme.radius.large,
  padding: m3Theme.spacing.lg,
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
  borderLeft: `3px solid ${m3Theme.colors.surfaceBorder}`,
  overflow: 'hidden',
  boxShadow: m3Theme.elevation.level1,
  transition: `border-color ${m3Theme.animation.base}, transform ${m3Theme.animation.base}, box-shadow ${m3Theme.animation.base}`,
  userSelect: 'none',

  [`${ProjectLink}:hover &`]: {
    borderColor: m3Theme.colors.surfaceBorderHover,
    borderLeftColor: m3Theme.colors.accent,
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 28px color-mix(in srgb, var(--kady-accent) 12%, transparent), ${m3Theme.elevation.level2}`,
  },

  [`${ProjectLink}:focus-visible &`]: {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
  },
});

const Index = styled('span')({
  position: 'absolute',
  top: m3Theme.spacing.md,
  right: m3Theme.spacing.lg,
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes['4xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: 1,
  color: m3Theme.colors.primarySoft,
  userSelect: 'none',
});

const CategoryBadge = styled('span')({
  display: 'inline-block',
  alignSelf: 'flex-start',
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.xs,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: m3Theme.colors.accent,
  background: m3Theme.colors.successSoft,
  padding: '0.2rem 0.6rem',
  borderRadius: m3Theme.radius.small,
  marginBottom: m3Theme.spacing.md,
});

const ProjectTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.35,
  margin: 0,
  fontWeight: m3Theme.font.weights.semibold,
  transition: 'color 0.2s ease',
  [`${ProjectLink}:hover &`]: { color: m3Theme.colors.accent },
});

const ProjectDesc = styled('p')({
  color: m3Theme.colors.onSurfaceMuted,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.7,
  marginTop: m3Theme.spacing.md,
  marginBottom: 'auto',
  flex: 1,
});

const ProjectFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
  paddingTop: m3Theme.spacing.md,
  paddingBottom: m3Theme.spacing.xs,
  minHeight: '48px',
  borderTop: `1px solid ${m3Theme.colors.surfaceBorder}`,
});

const ProjectDate = styled('span')({
  color: m3Theme.colors.onSurfaceDim,
  fontSize: m3Theme.font.sizes.xs,
  fontFamily: m3Theme.font.mono,
  whiteSpace: 'nowrap',
});

const TagRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: m3Theme.spacing.xs,
});

const Tag = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: m3Theme.radius.small,
  padding: '0.25rem 0.6rem',
  fontSize: '0.75rem',
  fontWeight: 500,
  fontFamily: m3Theme.font.mono,
  color: m3Theme.colors.onSurfaceMuted,
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
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
              <AnimatedFadeIn
                key={project.slug}
                delay={index * 0.12}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <ProjectLink href={`/portfolio/${project.slug}/`}>
                  <ProjectCard>
                    <Index>{String(index + 1).padStart(2, '0')}</Index>
                    <CategoryBadge>{(project.tags && project.tags[0]) || 'Projet'}</CategoryBadge>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDesc>{project.description}</ProjectDesc>
                    <ProjectFooter>
                      <ProjectDate>{project.date}</ProjectDate>
                      {project.tags && project.tags.length > 0 && (
                        <TagRow>
                          {(project.tags.length > 1
                            ? project.tags.slice(1, 4)
                            : project.tags.slice(0, 1)
                          ).map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </TagRow>
                      )}
                    </ProjectFooter>
                  </ProjectCard>
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
