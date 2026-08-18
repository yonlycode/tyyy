import { useState } from "react";
import type { Config } from "../types";
import { api } from "../services/api";

export default function SettingsPage({
  config,
  onBack,
}: {
  config: Config;
  onBack: () => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState(config.owner);
  const [repo, setRepo] = useState(config.repo);
  const [baseDir, setBaseDir] = useState(config.baseDir);
  const [imgDir, setImgDir] = useState(config.imgDir);
  const [branch, setBranch] = useState(config.branch);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api.setConfig({ token, owner, repo, baseDir, imgDir, branch });
      onBack();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function startEdit() {
    setEditMode(true);
    setError("");
  }

  function cancelEdit() {
    setEditMode(false);
    setToken("");
    setOwner(config.owner);
    setRepo(config.repo);
    setBaseDir(config.baseDir);
    setImgDir(config.imgDir);
    setBranch(config.branch);
    setError("");
  }

  if (!editMode) {
    return (
      <div className="overlay">
        <div className="modal settings-page">
          <h2>Repository settings</h2>
          <dl className="settings-list">
            <dt>Owner</dt>
            <dd>{config.owner}</dd>
            <dt>Repo</dt>
            <dd>{config.repo}</dd>
            <dt>Branch</dt>
            <dd>{config.branch}</dd>
            <dt>Content base directory</dt>
            <dd>{config.baseDir}</dd>
            <dt>Images directory</dt>
            <dd>{config.imgDir}</dd>
            <dt>Token</dt>
            <dd className="token-hidden">••••••••</dd>
          </dl>
          <div className="actions">
            <button onClick={startEdit}>Edit</button>
            <button className="primary" onClick={onBack}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <form className="modal settings-page" onSubmit={handleSave}>
        <h2>Edit repository settings</h2>
        <p className="hint">
          Update any field below. Changing the token requires a fresh personal access token from GitHub.
        </p>
        <label>
          Personal Access Token
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} autoFocus />
        </label>
        <div className="row">
          <label>
            Owner
            <input value={owner} onChange={(e) => setOwner(e.target.value)} required />
          </label>
          <label>
            Repo
            <input value={repo} onChange={(e) => setRepo(e.target.value)} required />
          </label>
        </div>
        <label>
          Content base directory
          <input value={baseDir} onChange={(e) => setBaseDir(e.target.value)} required />
        </label>
        <label>
          Images directory
          <input value={imgDir} onChange={(e) => setImgDir(e.target.value)} required />
        </label>
        <label>
          Branch
          <input value={branch} onChange={(e) => setBranch(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="button" onClick={cancelEdit}>Cancel</button>
          <button type="submit" className="primary" disabled={busy}>
            {busy ? "Saving…" : "Save & Reconnect"}
          </button>
        </div>
      </form>
    </div>
  );
}
