'use client';

import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';
import type { ArticleMeta } from '@/lib/md';
import {
  Container,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  SectionSubtitle,
} from '@/components/ui';
import {
  ArrowLink,
  CategoryBadge,
  Index,
  ProjectCard,
  ProjectDate,
  ProjectDesc,
  ProjectFooter,
  ProjectGrid,
  ProjectLink,
  ProjectTitle,
  Tag,
  TagRow,
  TintedSection,
} from './ProjectsPreview.styles';

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
