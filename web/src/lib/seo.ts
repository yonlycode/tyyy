import type { Metadata } from 'next';

const basePath = '/tyyy';

export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://yonlycode.github.io${basePath}`
    : 'http://localhost:3000';

export const SITE_NAME = 'Yoann Fort';

export const SITE_TITLE = 'Yoann Fort - Architecte IA & Lead LLMOps';

export const SITE_DESCRIPTION =
  "Portfolio professionnel et blog d'architecte IA et software engineer : architectures IA souveraines, LLMOps, quantisation et modèles locaux.";

export const SITE_KEYWORDS = [
  'Yoann Fort',
  'architecte IA',
  'LLMOps',
  'IA souveraine',
  'modèles locaux',
  'quantisation',
  'software engineer',
  'portfolio',
  'blog tech',
];

export function absoluteUrl(path = '/', opts: { trailingSlash?: boolean } = {}): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  const lastSegment = clean.split('/').pop() ?? '';
  const isFile = lastSegment.includes('.') || /(?:opengraph|twitter)-image$/.test(lastSegment);
  const addSlash = opts.trailingSlash ?? !isFile;
  return `${SITE_URL}${addSlash ? `${clean}/` : clean}`;
}

export interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  images?: string | string[];
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  authors?: string[];
  absoluteTitle?: boolean;
}

export function buildMetadata(opts: BuildMetadataOptions = {}): Metadata {
  const {
    title,
    description,
    path = '/',
    type = 'website',
    keywords = [],
    images,
    canonicalUrl,
    publishedTime,
    modifiedTime,
    tags = [],
    authors = [SITE_NAME],
    absoluteTitle = false,
  } = opts;

  const canonical = canonicalUrl || absoluteUrl(path);
  const titleValue = title ?? SITE_TITLE;
  const descriptionValue = description ?? SITE_DESCRIPTION;

  const ogImages = images
    ? (Array.isArray(images) ? images : [images]).map((img) => ({
        url: img.startsWith('http') ? img : absoluteUrl(img, { trailingSlash: false }),
        width: 1200,
        height: 630,
        alt: titleValue,
      }))
    : undefined;

  return {
    title: absoluteTitle ? { absolute: titleValue } : titleValue,
    description: descriptionValue,
    alternates: { canonical },
    keywords: [...new Set([...SITE_KEYWORDS, ...keywords])],
    authors: authors.map((author) => ({ name: author })),
    openGraph: {
      type,
      title: titleValue,
      description: descriptionValue,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(tags.length ? { tags } : {}),
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: titleValue,
      description: descriptionValue,
      images: ogImages?.map((img) => img.url),
    },
  };
}