import { useState } from "react";
import type { Media } from "../types";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Images({
  media,
  owner,
  repo,
  busy,
  onRefresh,
  onDelete,
}: {
  media: Media[];
  owner: string;
  repo: string;
  busy: boolean;
  onRefresh: () => void;
  onDelete: (item: Media) => void;
}) {
  const [copied, setCopied] = useState<string>("");

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? "" : c)), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="images">
      <div className="list-head">
        <h2>Images</h2>
        <button className="primary" disabled={busy} onClick={onRefresh}>
          {busy ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {media.length === 0 && !busy && <p className="hint">No images yet.</p>}
      <div className="media-grid">
        {media.map((m) => {
          const markdown = `![${m.name}](/images/${m.name})`;
          const siteUrl = `https://${owner}.github.io/${repo}/images/${m.name}`;
          return (
            <div className="media-card" key={m.path}>
              {m.downloadUrl ? (
                <img className="media-thumb" src={m.downloadUrl} alt={m.name} />
              ) : (
                <div className="media-thumb media-thumb-empty">?</div>
              )}
              <div className="media-info">
                <div className="media-name" title={m.name}>
                  {m.name}
                </div>
                <div className="media-meta">{formatSize(m.size)}</div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copy(markdown, `md-${m.name}`)}
                >
                  {copied === `md-${m.name}` ? "Copied!" : "Copy markdown"}
                </button>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copy(siteUrl, `url-${m.name}`)}
                >
                  {copied === `url-${m.name}` ? "Copied!" : "Copy URL"}
                </button>
                <button type="button" className="danger" onClick={() => onDelete(m)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}