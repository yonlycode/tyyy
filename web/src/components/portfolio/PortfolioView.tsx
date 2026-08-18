'use client';

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
  FeatureCard,
  Badge,
  OutlineButtonLink,
} from '@/components/ui';

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: m3Theme.spacing.lg,
  '@media (max-width: 900px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 620px)': { gridTemplateColumns: '1fr' },
});

const ProjectLink = styled('a')({
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

export function PortfolioView({ projects }: { projects: ArticleMeta[] }) {
  return (
    <Section>
      <Container>
        <AnimatedFadeIn>
          <SectionHeader>
            <Eyebrow>Portfolio</Eyebrow>
            <SectionTitle>Projets &amp; réalisations</SectionTitle>
            <SectionSubtitle>
              Un aperçu des projets significatifs sur lesquels j’ai travaillé, de l’architecture
              IA à l’optimisation web.
            </SectionSubtitle>
          </SectionHeader>
        </AnimatedFadeIn>

        <Grid>
          {projects.map((project, index) => (
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

        <FooterRow>
          <OutlineButtonLink
            href="/"
            style={{ borderColor: m3Theme.colors.primary, color: m3Theme.colors.primary }}
          >
            ← Retour à l’accueil
          </OutlineButtonLink>
        </FooterRow>
      </Container>
    </Section>
  );
}