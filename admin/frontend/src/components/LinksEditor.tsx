import { useState } from "react";
import type { Link, LinksData } from "../types";
import { EMPTY_LINKS } from "../types";
import { api } from "../services/api";
import { useToast } from "./ui/Toast";
import LoaderButton from "./ui/LoaderButton";
import Card from "./ui/Card";
import Field from "./ui/Field";
import Toggle from "./ui/Toggle";

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
  const [busy, setBusy] = useState(false);
  const toast = useToast();

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
      toast.success("Liens sauvegardés");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="editor editor--narrow">
      <div className="editor-bar">
        <button className="ghost-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="editor-title">
          <h2>Contact links</h2>
        </div>
        <div className="actions">
          <LoaderButton className="primary" busy={busy} busyLabel="Saving…" onClick={save}>
            Save links
          </LoaderButton>
        </div>
      </div>

      <Card title="Header" subtitle="Shown above the links on the contact section">
        <div className="field-row">
          <Field label="Title">
            <input value={form.title} onChange={(e) => setMeta({ title: e.target.value })} placeholder="Retrouvez-moi" />
          </Field>
          <Field label="Subtitle">
            <input value={form.subtitle} onChange={(e) => setMeta({ subtitle: e.target.value })} placeholder="Optional subtitle" />
          </Field>
        </div>
      </Card>

      <Card
        title="Links"
        subtitle="Order controls the display order on the site"
        actions={
          <button className="primary" onClick={addLink} onBlur={ensureIds}>
            + Add link
          </button>
        }
      >
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
                <select value={link.icon} onChange={(e) => patchLink(index, { icon: e.target.value })}>
                  {ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
                <Toggle
                  checked={link.enabled}
                  onChange={(c) => patchLink(index, { enabled: c })}
                  label={link.enabled ? "On" : "Off"}
                />
                <button className="icon-btn danger" onClick={() => removeLink(index)} title="Delete link">
                  ×
                </button>
              </div>
            </div>
          ))}
          {form.links.length === 0 && <p className="empty-state">No links yet — add one above.</p>}
        </div>
      </Card>
    </div>
  );
}
