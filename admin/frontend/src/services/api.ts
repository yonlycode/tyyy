import {
  ClearCache,
  DeleteArticle,
  DeleteProject,
  GetArticle,
  GetConfig,
  GetFullConfig,
  GetLinks,
  GetProject,
  ListArticles,
  ListDeployments,
  ListMedia,
  ListProjects,
  ListTags,
  DeleteMedia,
  SaveArticle,
  SaveLinks,
  SaveProject,
  SetConfig,
  UploadMedia,
} from "../../bindings/admin/pkg/app/app";
import type {
  Article,
  Config,
  Deployment,
  LinksData,
  Media,
  Project,
} from "../../bindings/admin/pkg/content/models";

export interface SetConfigPayload {
  token: string;
  owner: string;
  repo: string;
  baseDir: string;
  imgDir: string;
  branch: string;
}

export interface PersistedConfig extends Config {
  configured: boolean;
}

// CancellablePromise is a thenable, so it's compatible with await/then patterns.
// We cast through unknown to satisfy TypeScript's strict structural checks.
function p<T>(cp: { then: Function }): Promise<T> {
  return cp as unknown as Promise<T>;
}

export interface ConfigResponse {
  configured: boolean;
  owner: string;
  repo: string;
  baseDir: string;
  imgDir: string;
  branch: string;
}

export const api = {
  getConfig: () => p<ConfigResponse>(GetConfig()),
  setConfig: (cfg: SetConfigPayload) => p<void>(SetConfig(cfg as unknown as Config)),
  listArticles: () => p<Article[]>(ListArticles()),
  listProjects: () => p<Project[]>(ListProjects()),
  listTags: () => p<string[]>(ListTags()),
  listDeployments: (limit = 10) => p<Deployment[]>(ListDeployments(limit)),
  getArticle: (slug: string) => p<Article>(GetArticle(slug)),
  getProject: (slug: string) => p<Project>(GetProject(slug)),
  saveArticle: (article: Article) => p<void>(SaveArticle(article)),
  saveProject: (project: Project) => p<void>(SaveProject(project)),
  deleteArticle: (slug: string) => p<void>(DeleteArticle(slug)),
  deleteProject: (slug: string) => p<void>(DeleteProject(slug)),
  getLinks: () => p<LinksData>(GetLinks()),
  saveLinks: (data: LinksData) => p<void>(SaveLinks(data)),
  uploadImage: (fileName: string, data: string) => p<string>(UploadMedia(fileName, data)),
  listMedia: () => p<Media[]>(ListMedia()),
  deleteMedia: (fileName: string) => p<void>(DeleteMedia(fileName)),
  clearCache: () => p<void>(ClearCache()),
  loadConfig: () => p<PersistedConfig | null>(GetFullConfig()),
};
