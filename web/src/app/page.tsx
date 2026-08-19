import { HomeHero } from '../components/home/HomeHero';
import { HomeStats } from '../components/home/HomeStats';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { ArticlesPreview } from '../components/home/ArticlesPreview';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { CtaBanner } from '../components/home/CtaBanner';
import { getSortedArticles } from '@/lib/md';

export const metadata = {
  title: 'Yoann Fort - Architecte IA & Lead LLMOps',
  description: "Portfolio professionnel et blog d'architecte IA et software engineer",
};

export default function HomePage() {
  const articles = getSortedArticles('articles').slice(0, 3);
  const projects = getSortedArticles('projects').slice(0, 3);

  return (
    <main>
      <HomeHero />
      <HomeStats />
      <FeaturesSection />
      <ArticlesPreview articles={articles} />
      <ProjectsPreview projects={projects} />
      <CtaBanner />
    </main>
  );
}
