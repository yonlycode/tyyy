import { useEffect, useState } from "react";
import { DEFAULT_CONFIG } from "../types";
import type { PersistedConfig } from "../types";
import { api } from "../services/api";
import ClearCacheConfirmModal from "./ClearCacheConfirmModal";
import Card from "./ui/Card";
import Field from "./ui/Field";

export default function SettingsModal({
  onSaved,
  onCacheCleared,
  initialConfig,
}: {
  onSaved: () => void;
  onCacheCleared: () => void;
  initialConfig?: PersistedConfig;
}) {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [owner, setOwner] = useState(DEFAULT_CONFIG.owner);
  const [repo, setRepo] = useState(DEFAULT_CONFIG.repo);
  const [baseDir, setBaseDir] = useState(DEFAULT_CONFIG.baseDir);
  const [imgDir, setImgDir] = useState(DEFAULT_CONFIG.imgDir);
  const [branch, setBranch] = useState(DEFAULT_CONFIG.branch);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setToken(initialConfig.token);
      setOwner(initialConfig.owner);
      setRepo(initialConfig.repo);
      setBaseDir(initialConfig.baseDir);
      setImgDir(initialConfig.imgDir);
      setBranch(initialConfig.branch);
    }
  }, [initialConfig]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api.setConfig({ token, owner, repo, baseDir, imgDir, branch });
      onSaved();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function clearCache() {
    setConfirmClear(false);
    setError("");
    setBusy(true);
    try {
      await api.clearCache();
      setCleared(true);
      onCacheCleared();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overlay">
      <form className="modal modal--wide" onSubmit={submit}>
        <h2>GitHub connection</h2>
        <p className="hint">
          Configuration is saved to disk so the form is pre-filled on restart.
          The token is also cached — store it securely.
        </p>

        <Card title="Authentication">
          <Field
            label="Personal Access Token"
            hint="Used to read and commit content to the repository"
          >
            <div className="secret-input">
              <input
                type={showToken ? "text" : "password"}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                autoFocus
                autoComplete="off"
              />
              <button
                type="button"
                className="ghost-btn reveal-btn"
                onClick={() => setShowToken((s) => !s)}
                aria-label={showToken ? "Hide token" : "Show token"}
              >
                {showToken ? "Hide" : "Show"}
              </button>
            </div>
          </Field>
        </Card>

        <Card title="Repository">
          <div className="field-row">
            <Field label="Owner">
              <input value={owner} onChange={(e) => setOwner(e.target.value)} required />
            </Field>
            <Field label="Repo">
              <input value={repo} onChange={(e) => setRepo(e.target.value)} required />
            </Field>
          </div>
          <Field label="Content base directory" hint="Where articles, projects and links live">
            <input value={baseDir} onChange={(e) => setBaseDir(e.target.value)} required className="mono-input" />
          </Field>
          <div className="field-row">
            <Field label="Images directory">
              <input value={imgDir} onChange={(e) => setImgDir(e.target.value)} required className="mono-input" />
            </Field>
            <Field label="Branch">
              <input value={branch} onChange={(e) => setBranch(e.target.value)} required className="mono-input" />
            </Field>
          </div>
        </Card>

        {error && <p className="error">{error}</p>}
        {cleared && (
          <p className="hint">
            Cache cleared. Your saved credentials have been removed from disk.
          </p>
        )}
        <div className="actions">
          <button type="button" className="danger" onClick={() => setConfirmClear(true)}>
            Clear cache
          </button>
          <button type="submit" className="primary" disabled={busy}>
            {busy ? "Connecting…" : "Connect"}
          </button>
        </div>
      </form>
      {confirmClear && (
        <ClearCacheConfirmModal onCancel={() => setConfirmClear(false)} onConfirm={clearCache} />
      )}
    </div>
  );
}
