import { useCallback, useEffect, useState } from "react";
import type { Article, Config, PersistedConfig } from "../types";
import { api } from "../services/api";

// useAdminData centralises all data loading for the admin: the active config,
// the persisted (cached) config, the article list and the errors that arise
// while talking to the backend. It exposes actions to reload each slice.
export function useAdminData() {
  const [config, setConfig] = useState<Config | null>(null);
  const [cachedConfig, setCachedConfig] = useState<PersistedConfig | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Initial load: fetch config + cached config, then the article list if the
  // app is already configured (e.g. config restored from the cache file).
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const [cfg, full] = await Promise.all([api.getConfig(), api.loadConfig()]);
        if (cancelled) return;
        setConfig(cfg);
        setCachedConfig(full);
        if (cfg?.configured) {
          await refreshArticles(cancelled);
        }
      } catch {
        if (!cancelled) setConfig(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshArticles = useCallback(async (cancelled = false) => {
    try {
      const list = await api.listArticles();
      if (!cancelled) setArticles(list);
      if (!cancelled) setError("");
    } catch (err) {
      if (!cancelled) setError((err as Error).message);
    }
  }, []);

  // Reload config (and cached config) after settings are saved, then refresh
  // the article list since the repository may have changed.
  const onConfigSaved = useCallback(async () => {
    const cfg = await api.getConfig();
    setConfig(cfg);
    const full = await api.loadConfig();
    if (full) setCachedConfig(full);
    await refreshArticles();
  }, [refreshArticles]);

  // Reload config without touching the article list — used after clearing the
  // cache, when the repository no longer exists.
  const refreshConfigOnly = useCallback(async () => {
    const cfg = await api.getConfig();
    setConfig(cfg);
    setCachedConfig(await api.loadConfig());
  }, []);

  return {
    config,
    cachedConfig,
    articles,
    error,
    loading,
    setError,
    loadArticles: refreshArticles,
    onConfigSaved,
    refreshConfigOnly,
  };
}