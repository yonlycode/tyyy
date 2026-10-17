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
  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
  gap: m3Theme.spacing.xl,
  width: '100%',
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: m3Theme.spacing.lg,
  },
  '@media (max-width: 620px)': {
    gridTemplateColumns: '1fr',
    gap: m3Theme.spacing.lg,
  },
});

const ProjectLink = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: 1,
  borderRadius: '20px',
  outline: 'none',
  '&:focus-visible': {
    boxShadow: m3Theme.elevation.focus,
  },
});

const ProjectCard = styled('article')({
  position: 'relative',
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(15, 21, 38, 0.75)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '20px',
  padding: '2.25rem',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderLeft: `3px solid ${m3Theme.colors.surfaceBorder}`,
  overflow: 'hidden',
  boxShadow: m3Theme.elevation.level1,
  transition: `border-color ${m3Theme.animation.base}, transform ${m3Theme.animation.base}, box-shadow ${m3Theme.animation.base}`,
  userSelect: 'none',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, var(--brand), var(--brand-secondary))',
    opacity: 0,
    transition: 'opacity 0.25s ease',
  },

  [`${ProjectLink}:hover &`]: {
    borderColor: m3Theme.colors.surfaceBorderHover,
    borderLeftColor: m3Theme.colors.accent,
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 32px rgba(0, 212, 170, 0.15), ${m3Theme.elevation.level2}`,
    '&::before': {
      opacity: 1,
    },
  },
});

const Index = styled('span')({
  position: 'absolute',
  top: '1.25rem',
  right: '1.5rem',
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes['3xl'],
  fontWeight: m3Theme.font.weights.extrabold,
  lineHeight: 1,
  color: 'rgba(255, 255, 255, 0.05)',
  userSelect: 'none',
});

const CategoryBadge = styled('span')({
  display: 'inline-block',
  alignSelf: 'flex-start',
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.xs,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: m3Theme.colors.accent,
  background: m3Theme.colors.successSoft,
  padding: '0.25rem 0.65rem',
  borderRadius: '9999px',
  marginBottom: m3Theme.spacing.md,
  border: '1px solid rgba(0, 212, 170, 0.2)',
});

const ProjectTitle = styled('h3')({
  fontSize: m3Theme.font.sizes.xl,
  color: m3Theme.colors.onSurface,
  lineHeight: 1.35,
  margin: 0,
  fontWeight: m3Theme.font.weights.bold,
  letterSpacing: '-0.02em',
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
  borderRadius: '6px',
  padding: '0.2rem 0.55rem',
  fontSize: '0.75rem',
  fontWeight: 500,
  fontFamily: m3Theme.font.mono,
  color: m3Theme.colors.onSurfaceMuted,
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
  background: 'rgba(255, 255, 255, 0.03)',
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
          eyebrow="RÉALISATIONS DU LAB"
          title="Projets & Systèmes en Production"
          subtitle="Appliances physiques, architectures d'agents autonomes et plateformes web critiques. Zéro fiction, des systèmes qui tournent."
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTags={allTags}
          selectedTags={activeTags}
          onTagsChange={setActiveTags}
          resultsCount={filteredProjects.length}
          searchPlaceholder="Rechercher un projet ou une technologie…"
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
                delay={index * 0.05}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <ProjectLink href={`/portfolio/${project.slug}/`}>
                  <ProjectCard>
                    <Index>{String(index + 1).padStart(2, '0')}</Index>
                    <CategoryBadge>
                      {(project.tags && project.tags[0]) || 'PROJET'}
                    </CategoryBadge>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDesc>{project.description}</ProjectDesc>
                    <ProjectFooter>
                      <ProjectDate>{project.date}</ProjectDate>
                      {project.tags && project.tags.length > 0 && (
                        <TagRow>
                          {project.tags.slice(0, 3).map((tag) => (
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
            href="/articles/"
            style={{
              textDecoration: 'none',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--brand)',
              borderRadius: '9999px',
              padding: '0.875rem 1.75rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
            }}
          >
            Lire nos articles techniques →
          </Link>
        </FooterRow>
      </Container>
    </Section>
  );
}
