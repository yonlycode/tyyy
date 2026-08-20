import { ImageResponse } from 'next/og';
import { OGFrame, OG_SIZE } from '@/components/og/OGImage';
import { getArticleBySlug, getSortedArticles } from '@/lib/md';

export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getSortedArticles('articles').map((article) => ({
    slug: article.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, 'articles');

  return new ImageResponse(
    <OGFrame
      badge="ARTICLE"
      title={article?.title ?? 'Article'}
      subtitle={article?.description}
      footerLeft={article?.date ?? ''}
      footerRight={`${article?.readTime ?? ''} · tyyy`}
    />,
    { ...size }
  );
}
export const dynamic = "force-static";
