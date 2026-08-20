import type { Metadata } from 'next';
import { ProjectDetailView } from '../../../components/portfolio/ProjectDetailView';
import { JsonLd } from '@/components/JsonLd';
import { getArticleBySlug, getSortedArticles } from '../../../lib/md';
import { buildMetadata, absoluteUrl, SITE_NAME } from '@/lib/seo';

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

  if (!project) {
    return buildMetadata({
      title: 'Projet non trouvé',
      path: `/portfolio/${slug}`,
      absoluteTitle: true,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${slug}`,
    type: 'article',
    canonicalUrl: project.canonicalUrl || undefined,
    images: [`/portfolio/${slug}/opengraph-image`],
    keywords: project.tags,
    tags: project.tags,
    publishedTime: project.date ? new Date(project.date).toISOString() : undefined,
    authors: [SITE_NAME],
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getArticleBySlug(slug, 'projects');

  if (!project) {
    return <h1>Projet non trouvé</h1>;
  }

  const projectUrl = absoluteUrl(`/portfolio/${slug}`);

  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: projectUrl,
    dateCreated: project.date ? new Date(project.date).toISOString() : undefined,
    author: { '@type': 'Person', name: SITE_NAME },
    keywords: project.tags.join(', '),
    inLanguage: 'fr-FR',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: absoluteUrl('/portfolio') },
      { '@type': 'ListItem', position: 3, name: project.title, item: projectUrl },
    ],
  };

  return (
    <>
      <JsonLd data={[creativeWorkJsonLd, breadcrumbJsonLd]} />
      <ProjectDetailView project={project} />
    </>
  );
}