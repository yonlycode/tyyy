import type { Metadata } from 'next';
import { ProjectDetailView } from '../../../components/portfolio/ProjectDetailView';
import { getArticleBySlug, getSortedArticles } from '../../../lib/md';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const projects = getSortedArticles('projects');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getArticleBySlug(slug, 'projects');
  return {
    title: project ? project.title : 'Projet non trouvé',
    description: project?.description || 'Page de projet',
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getArticleBySlug(slug, 'projects');

  if (!project) {
    return <h1>Projet non trouvé</h1>;
  }

  return <ProjectDetailView project={project} />;
}
