import { ImageResponse } from 'next/og';
import { OGFrame, OG_SIZE } from '@/components/og/OGImage';
import { getArticleBySlug, getSortedArticles } from '@/lib/md';

export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getSortedArticles('projects').map((project) => ({
    slug: project.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getArticleBySlug(slug, 'projects');

  return new ImageResponse(
    <OGFrame
      badge="PROJET"
      title={project?.title ?? 'Projet'}
      subtitle={project?.description}
      footerLeft={project?.date ?? ''}
      footerRight="Portfolio · Yoann Fort"
    />,
    { ...size }
  );
}
export const dynamic = "force-static";
