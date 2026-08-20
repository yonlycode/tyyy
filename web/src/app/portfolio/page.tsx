import { PortfolioView } from '../../components/portfolio/PortfolioView';
import { getSortedArticles } from '../../lib/md';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Portfolio de projets et réalisations de Yoann Fort : IA, architectures souveraines, LLMOps et applications web.',
  path: '/portfolio',
  type: 'website',
  images: ['/opengraph-image'],
  keywords: ['portfolio', 'projets', 'réalisations', 'IA'],
});

export default function PortfolioPage() {
  const projects = getSortedArticles('projects');

  return <PortfolioView projects={projects} />;
}