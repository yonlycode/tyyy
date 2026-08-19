import { useEffect, useMemo, useState } from "react";
import type { Article } from "../types";
import { api } from "../services/api";
import ImageUploader from "./ImageUploader";
import DeleteConfirmModal from "./DeleteConfirmModal";
import MarkdownPreviewModal from "./MarkdownPreviewModal";
import TagInput from "./TagInput";

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
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setForm(article ?? empty);
    setError("");
  }, [article]);

  const isNew = useMemo(() => !article, [article]);

  function setFm(patch: Partial<Article["frontmatter"]>) {
    setForm((f) => ({ ...f, frontmatter: { ...f.frontmatter, ...patch } }));
  }

  async function save(publish: boolean) {
    setError("");
    setBusy(true);
    try {
      const updated: Article = {
        ...form,
        frontmatter: { ...form.frontmatter, published: publish },
      };
      await api.saveArticle(updated);
      const saved = await api.getArticle(updated.slug);
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
        <button onClick={onBack}>← Back</button>
        <h2>{isNew ? "New article" : form.frontmatter.title || form.slug}</h2>
        <div className="actions">
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

      <div className="form-grid">
        <div className="fields">
          <div className="row">
            <label>
              Slug (file name)
              <input
                value={form.slug}
                disabled={!isNew}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    slug: e.target.value.replace(/[^a-z0-9-_]/g, "-").toLowerCase(),
                  }))
                }
              />
            </label>
            <label>
              Date
              <input type="date" value={form.frontmatter.date} onChange={(e) => setFm({ date: e.target.value })} />
            </label>
          </div>
          <label>
            Title
            <input value={form.frontmatter.title} onChange={(e) => setFm({ title: e.target.value })} />
          </label>
          <label>
            Description
            <textarea value={form.frontmatter.description} onChange={(e) => setFm({ description: e.target.value })} rows={2} />
          </label>
          <div className="row">
            <label>
              Tags
              <TagInput
                value={form.frontmatter.tags || []}
                onChange={(tags) => setFm({ tags })}
                suggestions={allTags}
              />
            </label>
            <label className="check inline-check">
              <input
                type="checkbox"
                checked={form.frontmatter.published !== false}
                onChange={(e) => setFm({ published: e.target.checked })}
              />
              Published
            </label>
          </div>
          <ImageUploader onInserted={(md) => setForm((f) => ({ ...f, body: f.body + "\n" + md + "\n" }))} />
        </div>
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
