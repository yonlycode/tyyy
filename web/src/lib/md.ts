import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  canonicalUrl?: string;
  published: boolean;
  readTime: string;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

export function getSortedArticles(type: 'articles' | 'projects' = 'articles'): ArticleMeta[] {
  const dirPath = path.join(contentDirectory, type);
  if (!fs.existsSync(dirPath)) return [];

  const fileNames = fs.readdirSync(dirPath);
  const allData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(dirPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        tags: data.tags || [],
        canonicalUrl: data.canonicalUrl || '',
        published: data.published !== false,
        readTime: stats.text,
      };
    })
    .filter((item) => item.published);

  return allData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string, type: 'articles' | 'projects' = 'articles'): Promise<Article | null> {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
    tags: data.tags || [],
    canonicalUrl: data.canonicalUrl || '',
    published: data.published !== false,
    readTime: stats.text,
    contentHtml,
  };
}