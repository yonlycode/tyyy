import { useEffect, useMemo, useState } from "react";
import type { Article } from "../types";
import { api } from "../services/api";
import ImageUploader from "./ImageUploader";
import DeleteConfirmModal from "./DeleteConfirmModal";
import MarkdownPreviewModal from "./MarkdownPreviewModal";
import TagInput from "./TagInput";
import Card from "./ui/Card";
import Field from "./ui/Field";
import Toggle from "./ui/Toggle";
import SlugInput from "./ui/SlugInput";
import StatusPill from "./ui/StatusPill";

const TITLE_MAX = 120;
const DESC_MAX = 280;

export default function ArticleEditor({
  article,
  onBack,
  onSaved,
  onDelete,
  allTags,
}: {
  article: Article | null;
  onBack: () => void;
  onSaved: (a: Article) => void;
  onDelete: (a: Article) => Promise<void>;
  allTags: string[];
}) {
  const empty: Article = {
    slug: "",
    path: "",
    frontmatter: { title: "", description: "", date: "", tags: [], published: true },
    body: "",
  };
  const [form, setForm] = useState<Article>(article ?? empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setForm(article ?? empty);
    setError("");
    setSaved(false);
  }, [article]);

  const isNew = useMemo(() => !article, [article]);

  function setFm(patch: Partial<Article["frontmatter"]>) {
    setForm((f) => ({ ...f, frontmatter: { ...f.frontmatter, ...patch } }));
  }

  async function save(publish: boolean) {
    setError("");
    setBusy(true);
    setSaved(false);
    try {
      const updated: Article = {
        ...form,
        frontmatter: { ...form.frontmatter, published: publish },
      };
      await api.saveArticle(updated);
      const saved = await api.getArticle(updated.slug);
      setSaved(true);
      onSaved(saved);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete(article: Article) {
    setDeleting(true);
    setError("");
    try {
      await onDelete(article);
      onBack();
    } catch (err) {
      setError((err as Error).message);
      setConfirming(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="editor">
      <div className="editor-bar">
        <button className="ghost-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="editor-title">
          <h2>{isNew ? "New article" : form.frontmatter.title || form.slug}</h2>
          {!isNew && <StatusPill published={form.frontmatter.published !== false} />}
        </div>
        <div className="actions">
          {saved && <span className="save-ok">Saved ✓</span>}
          <button className="primary" disabled={busy || deleting} onClick={() => save(true)}>
            {busy ? "Saving…" : "Publish"}
          </button>
          <button disabled={busy || deleting} onClick={() => save(false)}>
            Save as draft
          </button>
          {!isNew && (
            <button className="danger" disabled={busy || deleting} onClick={() => setConfirming(true)}>
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
        </div>
      </div>

      <div className="editor-grid">
        <div className="editor-side">
          <Card
            title="Details"
            subtitle="Appears in the article list and metadata"
          >
            <Field
              label="Title"
              counter={{ value: form.frontmatter.title.length, max: TITLE_MAX }}
              hint="Used as the headline and SEO title"
            >
              <input
                value={form.frontmatter.title}
                maxLength={TITLE_MAX + 40}
                onChange={(e) => setFm({ title: e.target.value })}
                placeholder="Article title"
              />
            </Field>
            <Field label="Slug (file name)" hint={isNew ? "Auto-generated from the title" : "Read-only once published"}>
              <SlugInput
                value={form.slug}
                source={form.frontmatter.title}
                disabled={!isNew}
                onChange={(slug) => setForm((f) => ({ ...f, slug }))}
              />
            </Field>
            <div className="field-row">
              <Field label="Date">
                <input
                  type="date"
                  value={form.frontmatter.date}
                  onChange={(e) => setFm({ date: e.target.value })}
                />
              </Field>
              <div className="toggle-field">
                <span className="field-label">Published</span>
                <Toggle
                  checked={form.frontmatter.published !== false}
                  onChange={(c) => setFm({ published: c })}
                  label={form.frontmatter.published !== false ? "Visible" : "Hidden"}
                />
              </div>
            </div>
            <Field
              label="Description"
              counter={{ value: form.frontmatter.description.length, max: DESC_MAX }}
              hint="Short excerpt shown in listings and search"
            >
              <textarea
                value={form.frontmatter.description}
                rows={3}
                onChange={(e) => setFm({ description: e.target.value })}
                placeholder="Short description…"
              />
            </Field>
            <Field label="Tags" hint="Press Enter to add">
              <TagInput
                value={form.frontmatter.tags || []}
                onChange={(tags) => setFm({ tags })}
                suggestions={allTags}
              />
            </Field>
          </Card>

          <Card title="Media">
            <ImageUploader onInserted={(md) => setForm((f) => ({ ...f, body: f.body + "\n" + md + "\n" }))} />
          </Card>
        </div>

        <div className="md-pane">
          <div className="md-toolbar">
            <h3>Markdown</h3>
            <button onClick={() => setShowPreview(true)}>Preview</button>
          </div>
          <textarea
            className="md-input"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            placeholder="# Write your article…"
          />
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {showPreview && (
        <MarkdownPreviewModal
          markdown={form.body}
          title={form.frontmatter.title || "Preview"}
          onClose={() => setShowPreview(false)}
        />
      )}
      {!isNew && article && confirming && (
        <DeleteConfirmModal
          slug={article.slug}
          kind="article"
          onCancel={() => setConfirming(false)}
          onConfirm={() => confirmDelete(article)}
        />
      )}
    </div>
  );
}
