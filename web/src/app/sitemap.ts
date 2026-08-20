import type { MetadataRoute } from 'next';
import { getSortedArticles } from '@/lib/md';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getSortedArticles('articles');
  const projects = getSortedArticles('projects');

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/articles'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/portfolio'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/contact'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/privacy'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    lastModified: project.date ? new Date(project.date) : new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticPages, ...articleUrls, ...projectUrls];
}
export const dynamic = "force-static";
