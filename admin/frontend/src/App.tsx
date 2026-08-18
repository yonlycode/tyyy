import { useState } from "react";
import type { Article } from "./types";
import { api } from "./services/api";
import { useAdminData } from "./hooks/useAdminData";
import SettingsModal from "./components/SettingsModal";
import SettingsPage from "./components/SettingsPage";
import ArticleList from "./components/ArticleList";
import ArticleEditor from "./components/ArticleEditor";

export default function App() {
  const { config, cachedConfig, articles, error, loading, setError, loadArticles, onConfigSaved } =
    useAdminData();
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  async function onSavedConfig() {
    await onConfigSaved();
    setShowSettings(false);
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

  // Not configured yet — show the connection modal
  if (!config?.configured) {
    return <SettingsModal onSaved={onSavedConfig} initialConfig={cachedConfig || undefined} />;
  }

  // Settings modal overlay
  if (showSettings) {
    return <SettingsPage config={config} onBack={() => setShowSettings(false)} />;
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
        <h1>tyyy admin</h1>
        <span className="repo">
          {config.owner}/{config.repo} · {config.branch}
        </span>
        <button className="settings-btn" onClick={() => setShowSettings(true)} title="Settings">
          Settings
        </button>
      </header>
      {error && <p className="error">{error}</p>}
      {loading && <p className="hint">Loading articles…</p>}
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
