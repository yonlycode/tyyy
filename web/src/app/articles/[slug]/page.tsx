import type { Metadata } from 'next';
import { ArticleView } from '../../../components/articles/ArticleView';
import { getArticleBySlug, getSortedArticles } from '../../../lib/md';

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
  return {
    title: article ? article.title : 'Article non trouvé',
    description: article?.description || 'Page d’article',
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, 'articles');

  if (!article) {
    return <h1>Article non trouvé</h1>;
  }

  return <ArticleView article={article} />;
}