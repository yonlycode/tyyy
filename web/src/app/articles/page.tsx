import { ArticlesView } from '../../components/articles/ArticlesView';
import { getSortedArticles } from '../../lib/md';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Articles',
  description:
    'Tous les articles et billets de blog de Yoann Fort : IA souveraine, LLMOps, modèles locaux, quantisation et développement.',
  path: '/articles',
  type: 'website',
  images: ['/opengraph-image'],
  keywords: ['blog', 'articles', 'IA', 'LLMOps'],
});

export function generateStaticParams() {
  const articles = getSortedArticles('articles');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlesPage() {
  const articles = getSortedArticles('articles');

  return <ArticlesView articles={articles} />;
}