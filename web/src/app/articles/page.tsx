import { ArticlesView } from '../../components/articles/ArticlesView';
import { getSortedArticles } from '../../lib/md';

export const metadata = {
  title: 'Articles - Yoann Fort',
  description: 'Liste des articles et billets de blog',
};

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