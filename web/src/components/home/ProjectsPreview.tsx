'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import { m3Theme } from '@/styles/theme';
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  SectionSubtitle,
} from '@/components/ui';

const TintedSection = styled(Section)({
  background:
    'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, rgba(11, 15, 25, 0) 100%)',
  borderTop: `1px solid ${m3Theme.colors.surfaceBorder}`,
  borderBottom: `1px solid ${m3Theme.colors.surfaceBorder}`,
});

const ProjectGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
});

const ProjectLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  height: '100%',
});

const ProjectCard = styled('div')({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: m3Theme.colors.surfaceElevated,
  borderRadius: m3Theme.radius.large,
  padding: m3Theme.spacing.lg,
  border: `1px solid ${m3Theme.colors.surfaceBorder}`,
  borderLeft: `3px solid ${m3Theme.colors.surfaceBorder}`,
  overflow: 'hidden',
  transition: `border-color ${m3Theme.animation.base}, transform ${m3Theme.animation.base}, box-shadow ${m3Theme.animation.base}`,

  [`${ProjectLink}:hover &`]: {
    borderColor: m3Theme.colors.surfaceBorderHover,
    borderLeftColor: m3Theme.colors.success,
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 28px rgba(52, 211, 153, 0.08), ${m3Theme.elevation.level2}`,
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
  fontFamily: m3Theme.font.mono,
  fontSize: m3Theme.font.sizes.xs,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: m3Theme.colors.success,
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
  [`${ProjectLink}:hover &`]: { color: m3Theme.colors.success },
});

const ProjectDesc = styled('p')({
  color: m3Theme.colors.onSurfaceMuted,
  fontSize: m3Theme.font.sizes.sm,
  lineHeight: 1.7,
  marginTop: m3Theme.spacing.md,
  marginBottom: 'auto',
});

const ProjectFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: m3Theme.spacing.md,
  marginTop: m3Theme.spacing.lg,
  paddingTop: m3Theme.spacing.md,
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

const ArrowLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: m3Theme.spacing.sm,
  color: m3Theme.colors.success,
  fontWeight: m3Theme.font.weights.semibold,
  textDecoration: 'none',
  marginTop: m3Theme.spacing.xl,
  transition: 'gap 0.2s ease, color 0.2s ease',

  '&:hover': { color: m3Theme.colors.onSurface, gap: m3Theme.spacing.md },

  '&:focus-visible': {
    outline: 'none',
    boxShadow: m3Theme.elevation.focus,
    borderRadius: m3Theme.radius.small,
  },
});

export function ProjectsPreview({ projects }: { projects: ArticleMeta[] }) {
  return (
    <TintedSection>
      <Container>
        <AnimatedFadeIn>
          <SectionHeader>
            <Eyebrow>Portfolio</Eyebrow>
            <SectionTitle>Derniers projets</SectionTitle>
            <SectionSubtitle>
              Un aperçu de mes projets et réalisations en architecture IA et développement web.
            </SectionSubtitle>
          </SectionHeader>
        </AnimatedFadeIn>

        <ProjectGrid>
          {projects.map((project, i) => (
            <AnimatedFadeIn key={project.slug} delay={0.1 + i * 0.12}>
              <ProjectLink href={`/portfolio/${project.slug}/`}>
                <ProjectCard>
                  <Index>{String(i + 1).padStart(2, '0')}</Index>
                  <CategoryBadge>Projet</CategoryBadge>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDesc>{project.description}</ProjectDesc>
                  <ProjectFooter>
                    <ProjectDate>{project.date}</ProjectDate>
                    <TagRow>
                      {project.tags.slice(0, 2).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagRow>
                  </ProjectFooter>
                </ProjectCard>
              </ProjectLink>
            </AnimatedFadeIn>
          ))}
        </ProjectGrid>

        <div style={{ textAlign: 'center' }}>
          <ArrowLink href="/portfolio/">Voir tous les projets</ArrowLink>
        </div>
      </Container>
    </TintedSection>
  );
}