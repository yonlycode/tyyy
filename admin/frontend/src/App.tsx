import { useState } from "react";
import type { Article, Deployment, LinksData, Project } from "./types";
import { api } from "./services/api";
import { useAdminData } from "./hooks/useAdminData";
import SettingsModal from "./components/SettingsModal";
import SettingsPage from "./components/SettingsPage";
import ArticleList from "./components/ArticleList";
import ArticleEditor from "./components/ArticleEditor";
import ProjectList from "./components/ProjectList";
import ProjectEditor from "./components/ProjectEditor";
import Deployments from "./components/Deployments";
import LinksEditor from "./components/LinksEditor";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

type Tab = "articles" | "projects" | "links" | "deployments";

export default function App() {
  const { config, cachedConfig, articles, error, loading, setError, loadArticles, onConfigSaved, refreshConfigOnly } =
    useAdminData();
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [deployLoading, setDeployLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [creatingProject, setCreatingProject] = useState(false);
  const [busyProjectSlug, setBusyProjectSlug] = useState<string | null>(null);
  const [confirmProjectSlug, setConfirmProjectSlug] = useState<string | null>(null);
  const [linksData, setLinksData] = useState<LinksData | null>(null);
  const [linksLoading, setLinksLoading] = useState(false);

  async function loadLinks() {
    setLinksLoading(true);
    setError("");
    try {
      setLinksData(await api.getLinks());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLinksLoading(false);
    }
  }

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

  async function loadProjects() {
    setProjectsLoading(true);
    setError("");
    try {
      setProjects(await api.listProjects());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setProjectsLoading(false);
    }
  }

  function onSelectTab(tab: Tab) {
    setActiveTab(tab);
    if (tab === "deployments" && deployments.length === 0) {
      void loadDeployments();
    }
    if (tab === "projects" && projects.length === 0) {
      void loadProjects();
    }
    if (tab === "links" && linksData === null) {
      void loadLinks();
    }
  }

  async function onSavedConfig() {
    await onConfigSaved();
    setShowSettings(false);
  }

  // Clear the persisted cache: remove saved credentials, then reload config so
  // the app returns to the unconfigured connection screen.
  async function onCacheCleared() {
    await refreshConfigOnly();
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

  function onEditProject(project: Project) {
    setCreatingProject(false);
    setEditingProject(project);
    setError("");
  }

  function onCreateProject() {
    setEditingProject(null);
    setCreatingProject(true);
    setError("");
  }

  function onBackProject() {
    setEditingProject(null);
    setCreatingProject(false);
    void loadProjects();
  }

  async function onSavedProject(updated: Project) {
    await loadProjects();
    setEditingProject(updated);
    setCreatingProject(false);
  }

  function onDeleteProject(project: Project) {
    setConfirmProjectSlug(project.slug);
  }

  async function onDeleteProjectConfirmed(project: Project) {
    setConfirmProjectSlug(null);
    setBusyProjectSlug(project.slug);
    setError("");
    try {
      await api.deleteProject(project.slug);
      await loadProjects();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyProjectSlug(null);
    }
  }

  async function onDeleteProjectFromEditor(project: Project) {
    await api.deleteProject(project.slug);
    await loadProjects();
  }

  const confirmTarget = confirmSlug ? articles.find((a) => a.slug === confirmSlug) : null;
  const confirmProjectTarget = confirmProjectSlug
    ? projects.find((p) => p.slug === confirmProjectSlug)
    : null;

  // Not configured yet — show the connection modal
  if (!config?.configured) {
    return <SettingsModal onSaved={onSavedConfig} onCacheCleared={onCacheCleared} initialConfig={cachedConfig || undefined} />;
  }

  // Settings modal overlay
  if (showSettings) {
    return <SettingsPage config={config} onBack={() => setShowSettings(false)} onCacheCleared={onCacheCleared} />;
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

  if (creatingProject) {
    return (
      <ProjectEditor
        project={null}
        onBack={onBackProject}
        onSaved={onSavedProject}
        onDelete={onDeleteProjectFromEditor}
      />
    );
  }

  if (editingProject) {
    return (
      <ProjectEditor
        project={editingProject}
        onBack={onBackProject}
        onSaved={onSavedProject}
        onDelete={onDeleteProjectFromEditor}
      />
    );
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
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => onSelectTab("projects")}
        >
          Projects
        </button>
        <button
          className={activeTab === "links" ? "active" : ""}
          onClick={() => onSelectTab("links")}
        >
          Links
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
      {activeTab === "projects" && (
        <>
          {projectsLoading && <p className="hint">Loading projects…</p>}
          <ProjectList
            projects={projects}
            onEdit={onEditProject}
            onCreate={onCreateProject}
            onDelete={onDeleteProject}
            busySlug={busyProjectSlug}
          />
        </>
      )}
      {activeTab === "deployments" && (
        <>
          {deployLoading && <p className="hint">Loading deployments…</p>}
          <Deployments deployments={deployments} busy={deployLoading} onRefresh={loadDeployments} />
        </>
      )}
      {activeTab === "links" && (
        <>
          {linksLoading && <p className="hint">Loading links…</p>}
          {linksData !== null && (
            <LinksEditor
              data={linksData}
              onSaved={setLinksData}
              onBack={() => loadLinks()}
            />
          )}
        </>
      )}
      {confirmTarget && (
        <DeleteConfirmModal
          slug={confirmTarget.slug}
          kind="article"
          onCancel={() => setConfirmSlug(null)}
          onConfirm={() => onDeleteConfirmed(confirmTarget)}
        />
      )}
      {confirmProjectTarget && (
        <DeleteConfirmModal
          slug={confirmProjectTarget.slug}
          kind="project"
          onCancel={() => setConfirmProjectSlug(null)}
          onConfirm={() => onDeleteProjectConfirmed(confirmProjectTarget)}
        />
      )}
    </div>
  );
}
