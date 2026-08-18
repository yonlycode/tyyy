import { useState } from "react";
import type { Article, Deployment } from "./types";
import { api } from "./services/api";
import { useAdminData } from "./hooks/useAdminData";
import SettingsModal from "./components/SettingsModal";
import SettingsPage from "./components/SettingsPage";
import ArticleList from "./components/ArticleList";
import ArticleEditor from "./components/ArticleEditor";
import Deployments from "./components/Deployments";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

type Tab = "articles" | "deployments";

export default function App() {
  const { config, cachedConfig, articles, error, loading, setError, loadArticles, onConfigSaved } =
    useAdminData();
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [deployLoading, setDeployLoading] = useState(false);

  async function loadDeployments() {
    setDeployLoading(true);
    setError("");
    try {
      setDeployments(await api.listDeployments());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeployLoading(false);
    }
  }

  function onSelectTab(tab: Tab) {
    setActiveTab(tab);
    if (tab === "deployments" && deployments.length === 0) {
      void loadDeployments();
    }
  }

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

  function onDelete(article: Article) {
    setConfirmSlug(article.slug);
  }

  async function onDeleteConfirmed(article: Article) {
    setConfirmSlug(null);
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

  async function onDeleteArticle(article: Article) {
    await api.deleteArticle(article.slug);
    await loadArticles();
  }

  const confirmTarget = confirmSlug ? articles.find((a) => a.slug === confirmSlug) : null;

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
        onDelete={onDeleteArticle}
      />
    );
  }

  if (editing) {
    return <ArticleEditor article={editing} onBack={onBack} onSaved={onSaved} onDelete={onDeleteArticle} />;
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
      <nav className="tabs">
        <button
          className={activeTab === "articles" ? "active" : ""}
          onClick={() => onSelectTab("articles")}
        >
          Articles
        </button>
        <button
          className={activeTab === "deployments" ? "active" : ""}
          onClick={() => onSelectTab("deployments")}
        >
          Deployments
        </button>
      </nav>
      {error && <p className="error">{error}</p>}
      {activeTab === "articles" && (
        <>
          {loading && <p className="hint">Loading articles…</p>}
          <ArticleList
            articles={articles}
            onEdit={onEdit}
            onCreate={onCreate}
            onDelete={onDelete}
            busySlug={busySlug}
          />
        </>
      )}
      {activeTab === "deployments" && (
        <>
          {deployLoading && <p className="hint">Loading deployments…</p>}
          <Deployments deployments={deployments} busy={deployLoading} onRefresh={loadDeployments} />
        </>
      )}
      {confirmTarget && (
        <DeleteConfirmModal
          article={confirmTarget}
          onCancel={() => setConfirmSlug(null)}
          onConfirm={onDeleteConfirmed}
        />
      )}
    </div>
  );
}
