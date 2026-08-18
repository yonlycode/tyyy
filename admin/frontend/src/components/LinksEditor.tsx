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

      <div className="fields">
        <label>
          Title
          <input value={form.title} onChange={(e) => setMeta({ title: e.target.value })} />
        </label>
        <label>
          Subtitle
          <input value={form.subtitle} onChange={(e) => setMeta({ subtitle: e.target.value })} />
        </label>
      </div>

      <div className="list-head">
        <h2>Links</h2>
        <button className="primary" onClick={addLink} onBlur={ensureIds}>
          + Add link
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Label</th>
            <th>URL</th>
            <th>Icon</th>
            <th>Enabled</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {form.links.map((link, index) => (
            <tr key={link.id || `new-${index}`}>
              <td className="actions">
                <button disabled={index === 0} onClick={() => moveLink(index, -1)} title="Move up">
                  ↑
                </button>
                <button
                  disabled={index === form.links.length - 1}
                  onClick={() => moveLink(index, 1)}
                  title="Move down"
                >
                  ↓
                </button>
              </td>
              <td>
                <input
                  value={link.label}
                  placeholder="GitHub"
                  onChange={(e) => patchLink(index, { label: e.target.value })}
                />
              </td>
              <td>
                <input
                  value={link.url}
                  placeholder="https://…"
                  onChange={(e) => patchLink(index, { url: e.target.value })}
                />
              </td>
              <td>
                <select value={link.icon} onChange={(e) => patchLink(index, { icon: e.target.value })}>
                  {ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={link.enabled}
                    onChange={(e) => patchLink(index, { enabled: e.target.checked })}
                  />
                </label>
              </td>
              <td className="actions">
                <button className="danger" onClick={() => removeLink(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p className="error">{error}</p>}
    </div>
  );
}