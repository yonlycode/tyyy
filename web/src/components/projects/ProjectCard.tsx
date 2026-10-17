'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/project';

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--brand), var(--brand-secondary));
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: var(--brand);
    box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.12), 0 0 16px -4px rgba(0, 212, 170, 0.2);

    &::before {
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Title = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.35;
  letter-spacing: -0.015em;
  transition: color 0.2s ease;

  ${Card}:hover & {
    color: var(--brand);
  }
`;

const Client = styled.span`
  font-size: 0.85rem;
  color: var(--ink-subtle);
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 0.975rem;
  color: var(--ink-muted);
  line-height: 1.65;
  margin-bottom: 1.75rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.75rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: var(--surface-elevated);
  color: var(--ink-muted);
  border: 1px solid var(--border-subtle);
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-subtle);
`;

const DetailLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--brand);
  text-decoration: none;
  transition: gap 0.2s ease;

  &:hover {
    gap: 0.65rem;
  }
`;

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <div>
        <Header>
          <TitleGroup>
            <Title>{project.title}</Title>
            <Client>{project.client} • {project.period}</Client>
          </TitleGroup>
          {project.badge && (
            <Badge variant="default">{project.badge}</Badge>
          )}
        </Header>

        <Description>{project.description}</Description>

        <Tags>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </div>

      <Footer>
        <DetailLink href={`/projets/${project.slug}`}>
          Fiche détaillée <ArrowRight size={15} />
        </DetailLink>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ink-muted)' }}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </Footer>
    </Card>
  );
}
