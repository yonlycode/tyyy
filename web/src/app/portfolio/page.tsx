import { PortfolioView } from '../../components/portfolio/PortfolioView';
import { getSortedArticles } from '../../lib/md';

export const metadata = {
  title: 'Portfolio - Yoann Fort',
  description: 'Portfolio de projets et réalisations',
};

export default function PortfolioPage() {
  const projects = getSortedArticles('projects');

  return <PortfolioView projects={projects} />;
}