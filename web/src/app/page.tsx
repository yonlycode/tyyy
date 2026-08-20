import { HomeHero } from '../components/home/HomeHero';
import { HomeStats } from '../components/home/HomeStats';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { ArticlesPreview } from '../components/home/ArticlesPreview';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { CtaBanner } from '../components/home/CtaBanner';
import { JsonLd } from '@/components/JsonLd';
import { getSortedArticles } from '@/lib/md';
import { getLinks } from '@/lib/links';
import { buildMetadata, absoluteUrl, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata = buildMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
  type: 'website',
  images: ['/opengraph-image'],
  absoluteTitle: true,
});

export default function HomePage() {
  const articles = getSortedArticles('articles').slice(0, 3);
  const projects = getSortedArticles('projects').slice(0, 3);
  const links = getLinks();

  const sameAs = links.links
    .map((link) => link.url)
    .filter((url) => url.startsWith('http'));

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'tyyy',
    url: absoluteUrl('/'),
    jobTitle: 'Architecte IA & Lead LLMOps',
    description: SITE_DESCRIPTION,
    sameAs,
    knowsAbout: ['Intelligence artificielle', 'LLMOps', 'Quantisation', 'Architecture logicielle'],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: absoluteUrl('/'),
    description: SITE_DESCRIPTION,
    inLanguage: 'fr-FR',
  };

  return (
    <main>
      <JsonLd data={[personJsonLd, websiteJsonLd]} />
      <HomeHero />
      <HomeStats />
      <FeaturesSection />
      <ArticlesPreview articles={articles} />
      <ProjectsPreview projects={projects} />
      <CtaBanner />
    </main>
  );
}