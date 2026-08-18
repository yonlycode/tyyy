import {
  DeleteArticle,
  GetArticle,
  GetConfig,
  GetFullConfig,
  ListArticles,
  SaveArticle,
  SetConfig,
  UploadMedia,
} from "../../wailsjs/go/app/App";
import type { content } from "../../wailsjs/go/models";
import type { Article, Config, PersistedConfig } from "../types";

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
  getArticle: (slug: string) => GetArticle(slug) as Promise<Article>,
  saveArticle: (article: Article) => SaveArticle(article as unknown as content.Article),
  deleteArticle: (slug: string) => DeleteArticle(slug),
  uploadImage: (fileName: string, data: string) => UploadMedia(fileName, data),
  loadConfig: () => GetFullConfig() as Promise<PersistedConfig | null>,
};
