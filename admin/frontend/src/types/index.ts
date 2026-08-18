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

export interface Deployment {
  id: number;
  runNumber: number;
  displayTitle: string;
  status: string;
  conclusion: string;
  headSha: string;
  headBranch: string;
  event: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  htmlUrl: string;
}

export interface Config {
  configured: boolean;
  owner: string;
  repo: string;
  dir: string;
  imgDir: string;
  branch: string;
}

// PersistedConfig mirrors the backend Config struct for cache operations.
// It includes the token so the settings form is fully pre-filled on restart.
export interface PersistedConfig {
  token: string;
  owner: string;
  repo: string;
  dir: string;
  imgDir: string;
  branch: string;
}

export const DEFAULT_CONFIG = {
  token: "",
  owner: "yonlycode",
  repo: "tyyy",
  dir: "web/content/articles",
  imgDir: "web/public/images",
  branch: "main",
};
