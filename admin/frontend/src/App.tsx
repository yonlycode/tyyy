import { useEffect, useState } from "react";
import type { Article, Config } from "./types";
import { api } from "./services/api";
import SettingsModal from "./components/SettingsModal";
import ArticleList from "./components/ArticleList";
import ArticleEditor from "./components/ArticleEditor";

export default function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getConfig().then(setConfig).catch(() => setConfig(null));
  }, []);

  async function loadArticles() {
    try {
      setArticles(await api.listArticles());
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSavedConfig() {
    const cfg = await api.getConfig();
    setConfig(cfg);
    await loadArticles();
  }

  function onEdit(article: Article) {
    setCreating(false);
    setEditing(article);
    setError("");
  }

  function onCreate() {
    setEditing(null);
    setCreating(true);
    setError("");
  }

  function onBack() {
    setEditing(null);
    setCreating(false);
    void loadArticles();
  }

  async function onSaved(updated: Article) {
    await loadArticles();
    setEditing(updated);
    setCreating(false);
  }

  async function onDelete(article: Article) {
    if (!window.confirm(`Delete "${article.slug}"?`)) return;
    setBusySlug(article.slug);
    setError("");
    try {
      await api.deleteArticle(article.slug);
      await loadArticles();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusySlug(null);
    }
  }

  if (!config?.configured) {
    return <SettingsModal onSaved={onSavedConfig} />;
  }

  if (creating) {
    return (
      <ArticleEditor
        article={null}
        onBack={onBack}
        onSaved={onSaved}
      />
    );
  }

  if (editing) {
    return <ArticleEditor article={editing} onBack={onBack} onSaved={onSaved} />;
  }

  return (
    <div className="app">
      <header>
        <h1>yo-port admin</h1>
        <span className="repo">
          {config.owner}/{config.repo} · {config.branch}
        </span>
      </header>
      {error && <p className="error">{error}</p>}
      <ArticleList
        articles={articles}
        onEdit={onEdit}
        onCreate={onCreate}
        onDelete={onDelete}
        busySlug={busySlug}
      />
    </div>
  );
}