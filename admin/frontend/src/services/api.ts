import {
  DeleteArticle,
  GetArticle,
  GetConfig,
  GetFullConfig,
  ListArticles,
  ListDeployments,
  SaveArticle,
  SetConfig,
  UploadMedia,
} from "../../wailsjs/go/app/App";
import type { content } from "../../wailsjs/go/models";
import type { Article, Config, Deployment, PersistedConfig } from "../types";

export interface SetConfigPayload {
  token: string;
  owner: string;
  repo: string;
  dir: string;
  imgDir: string;
  branch: string;
}

export const api = {
  getConfig: () => GetConfig() as Promise<Config>,
  setConfig: (cfg: SetConfigPayload) => SetConfig(cfg),
  listArticles: () => ListArticles() as Promise<Article[]>,
  listDeployments: (limit = 10) => ListDeployments(limit) as Promise<Deployment[]>,
  getArticle: (slug: string) => GetArticle(slug) as Promise<Article>,
  saveArticle: (article: Article) => SaveArticle(article as unknown as content.Article),
  deleteArticle: (slug: string) => DeleteArticle(slug),
  uploadImage: (fileName: string, data: string) => UploadMedia(fileName, data),
  loadConfig: () => GetFullConfig() as Promise<PersistedConfig | null>,
};
