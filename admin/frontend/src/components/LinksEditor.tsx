import { useState } from "react";
import type { Link, LinksData } from "../types";
import { EMPTY_LINKS } from "../types";
import { api } from "../services/api";

const ICONS = ["github", "linkedin", "twitter", "email", "link"];

function newLink(): Link {
  return { id: "", label: "", url: "", icon: "link", enabled: true };
}

function toId(label: string) {
  return (
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `link-${Date.now()}`
  );
}

export default function LinksEditor({
  data,
  onSaved,
  onBack,
}: {
  data: LinksData;
  onSaved: (d: LinksData) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState<LinksData>(data ?? { ...EMPTY_LINKS });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function setMeta(patch: Partial<LinksData>) {
    setForm((f) => ({ ...f, ...patch }));
  }

  function patchLink(index: number, patch: Partial<Link>) {
    setForm((f) => {
      const links = f.links.map((l, i) => (i === index ? { ...l, ...patch } : l));
      return { ...f, links };
    });
  }

  function addLink() {
    setForm((f) => ({ ...f, links: [...f.links, newLink()] }));
  }

  function removeLink(index: number) {
    setForm((f) => ({ ...f, links: f.links.filter((_, i) => i !== index) }));
  }

  function moveLink(index: number, dir: -1 | 1) {
    setForm((f) => {
      const target = index + dir;
      if (target < 0 || target >= f.links.length) return f;
      const links = [...f.links];
      const [item] = links.splice(index, 1);
      links.splice(target, 0, item);
      return { ...f, links };
    });
  }

  function ensureIds() {
    setForm((f) => ({
      ...f,
      links: f.links.map((l, i) => ({ ...l, id: l.id || toId(l.label) || `link-${i + 1}` })),
    }));
  }

  async function save() {
    setError("");
    const next = {
      ...form,
      links: form.links.map((l, i) => ({
        ...l,
        id: l.id || toId(l.label) || `link-${i + 1}`,
      })),
    };
    setForm(next);
    setBusy(true);
    try {
      await api.saveLinks(next);
      const saved = await api.getLinks();
      onSaved(saved);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="editor">
      <div className="editor-bar">
        <button onClick={onBack}>← Back</button>
        <h2>Contact links</h2>
        <div className="actions">
          <button className="primary" disabled={busy} onClick={save}>
            {busy ? "Saving…" : "Save links"}
          </button>
        </div>
      </div>

      <div className="form-grid">
        <div className="fields">
          <div className="row">
            <label>
              Title
              <input value={form.title} onChange={(e) => setMeta({ title: e.target.value })} />
            </label>
            <label>
              Subtitle
              <input value={form.subtitle} onChange={(e) => setMeta({ subtitle: e.target.value })} />
            </label>
          </div>
        </div>
      </div>

      <div className="list-head">
        <h2>Links</h2>
        <button className="primary" onClick={addLink} onBlur={ensureIds}>
          + Add link
        </button>
      </div>

      <div className="link-list">
        {form.links.map((link, index) => (
          <div className="link-row" key={link.id || `new-${index}`}>
            <div className="link-order">
              <button
                className="icon-btn"
                disabled={index === 0}
                onClick={() => moveLink(index, -1)}
                title="Move up"
              >
                ↑
              </button>
              <span className="index">{index + 1}</span>
              <button
                className="icon-btn"
                disabled={index === form.links.length - 1}
                onClick={() => moveLink(index, 1)}
                title="Move down"
              >
                ↓
              </button>
            </div>
            <div className="link-fields">
              <input
                value={link.label}
                placeholder="GitHub"
                onChange={(e) => patchLink(index, { label: e.target.value })}
              />
              <input
                value={link.url}
                placeholder="https://…"
                onChange={(e) => patchLink(index, { url: e.target.value })}
              />
            </div>
            <div className="link-options">
              <span className="badge icon-badge">{link.icon}</span>
              <select value={link.icon} onChange={(e) => patchLink(index, { icon: e.target.value })}>
                {ICONS.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
              <label className="check inline-check" title={link.enabled ? "Enabled" : "Disabled"}>
                <input
                  type="checkbox"
                  checked={link.enabled}
                  onChange={(e) => patchLink(index, { enabled: e.target.checked })}
                />
              </label>
              <button className="danger" onClick={() => removeLink(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}