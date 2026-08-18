export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published?: boolean;
}

export interface Article {
  slug: string;
  path: string;
  sha?: string;
  frontmatter: Frontmatter;
  body: string;
}

export interface Config {
  configured: boolean;
  owner: string;
  repo: string;
  dir: string;
  imgDir: string;
  branch: string;
}

export const DEFAULT_CONFIG = {
  owner: "yonlycode",
  repo: "tyy",
  dir: "web/content/articles",
  imgDir: "web/public/images",
  branch: "main",
};
