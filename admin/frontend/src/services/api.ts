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
} from "../../wailsjs/go/app/App";
import type { content } from "../../wailsjs/go/models";
import type { Article, Config, Deployment, LinksData, Media, PersistedConfig, Project } from "../types";

export interface SetConfigPayload {
  token: string;
  owner: string;
  repo: string;
  baseDir: string;
  imgDir: string;
  branch: string;
}

export const api = {
  getConfig: () => GetConfig() as Promise<Config>,
  setConfig: (cfg: SetConfigPayload) => SetConfig(cfg),
  listArticles: () => ListArticles() as Promise<Article[]>,
  listProjects: () => ListProjects() as Promise<Project[]>,
  listTags: () => ListTags() as Promise<string[]>,
  listDeployments: (limit = 10) => ListDeployments(limit) as Promise<Deployment[]>,
  getArticle: (slug: string) => GetArticle(slug) as Promise<Article>,
  getProject: (slug: string) => GetProject(slug) as Promise<Project>,
  saveArticle: (article: Article) => SaveArticle(article as unknown as content.Article),
  saveProject: (project: Project) => SaveProject(project as unknown as content.Project),
  deleteArticle: (slug: string) => DeleteArticle(slug),
  deleteProject: (slug: string) => DeleteProject(slug),
  getLinks: () => GetLinks() as Promise<LinksData>,
  saveLinks: (data: LinksData) => SaveLinks(data as unknown as content.LinksData),
  uploadImage: (fileName: string, data: string) => UploadMedia(fileName, data),
  listMedia: () => ListMedia() as Promise<Media[]>,
  deleteMedia: (fileName: string) => DeleteMedia(fileName),
  clearCache: () => ClearCache(),
  loadConfig: () => GetFullConfig() as Promise<PersistedConfig | null>,
};
