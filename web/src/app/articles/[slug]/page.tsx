import type { Metadata } from 'next';
import { ArticleView } from '../../../components/articles/ArticleView';
import { JsonLd } from '@/components/JsonLd';
import { getArticleBySlug, getSortedArticles } from '../../../lib/md';
import { buildMetadata, absoluteUrl, SITE_NAME } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const articles = getSortedArticles('articles');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, 'articles');

  if (!article) {
    return buildMetadata({
      title: 'Article non trouvé',
      path: `/articles/${slug}`,
      absoluteTitle: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${slug}`,
    type: 'article',
    canonicalUrl: article.canonicalUrl || undefined,
    images: [`/articles/${slug}/opengraph-image`],
    keywords: article.tags,
    tags: article.tags,
    publishedTime: article.date ? new Date(article.date).toISOString() : undefined,
    authors: [SITE_NAME],
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, 'articles');

  if (!article) {
    return <h1>Article non trouvé</h1>;
  }

  const articleUrl = absoluteUrl(`/articles/${slug}`);

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: articleUrl,
    ...(article.canonicalUrl ? { mainEntityOfPage: article.canonicalUrl } : { mainEntityOfPage: articleUrl }),
    datePublished: article.date ? new Date(article.date).toISOString() : undefined,
    author: { '@type': 'Person', name: SITE_NAME },
    publisher: { '@type': 'Person', name: SITE_NAME },
    keywords: article.tags.join(', '),
    inLanguage: 'fr-FR',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: absoluteUrl('/articles') },
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <JsonLd data={[blogPostingJsonLd, breadcrumbJsonLd]} />
      <ArticleView article={article} />
    </>
  );
}