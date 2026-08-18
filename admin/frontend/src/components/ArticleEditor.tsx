import { useEffect, useMemo, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import type { Article } from "../types";
import { api } from "../services/api";
import ImageUploader from "./ImageUploader";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function ArticleEditor({
  article,
  onBack,
  onSaved,
  onDelete,
}: {
  article: Article | null;
  onBack: () => void;
  onSaved: (a: Article) => void;
  onDelete: (a: Article) => Promise<void>;
}) {
  const [form, setForm] = useState<Article>(
    article ?? {
      slug: "",
      path: "",
      frontmatter: { title: "", description: "", date: "", tags: [], published: true },
      body: "",
    }
  );
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setForm(
      article ?? {
        slug: "",
        path: "",
        frontmatter: { title: "", description: "", date: "", tags: [], published: true },
        body: "",
      }
    );
    setError("");
  }, [article]);

  useEffect(() => {
    remark()
      .use(html)
      .process(form.body)
      .then((file) => setPreview(String(file)))
      .catch(() => setPreview(""));
  }, [form.body]);

  const isNew = useMemo(() => !article, [article]);

  function setFm(patch: Partial<Article["frontmatter"]>) {
    setForm((f) => ({ ...f, frontmatter: { ...f.frontmatter, ...patch } }));
  }

  function setTags(raw: string) {
    const tags = raw.split(",").map((t) => t.trim()).filter(Boolean);
    setFm({ tags });
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
            Title
            <input value={form.frontmatter.title} onChange={(e) => setFm({ title: e.target.value })} />
          </label>
          <label>
            Description
            <textarea value={form.frontmatter.description} onChange={(e) => setFm({ description: e.target.value })} rows={3} />
          </label>
          <label>
            Date
            <input type="date" value={form.frontmatter.date} onChange={(e) => setFm({ date: e.target.value })} />
          </label>
          <label>
            Tags (comma separated)
            <input value={(form.frontmatter.tags || []).join(", ")} onChange={(e) => setTags(e.target.value)} />
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={form.frontmatter.published !== false}
              onChange={(e) => setFm({ published: e.target.checked })}
            />
            Published (visible on site)
          </label>
          <ImageUploader onInserted={(md) => setForm((f) => ({ ...f, body: f.body + "\n" + md + "\n" }))} />
        </div>

        <div className="md-columns">
          <div className="md-pane">
            <h3>Markdown</h3>
            <textarea
              className="md-input"
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              placeholder="# Write your article…"
            />
          </div>
          <div className="md-pane">
            <h3>Preview</h3>
            <div className="preview" dangerouslySetInnerHTML={{ __html: preview }} />
          </div>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {!isNew && article && confirming && (
        <DeleteConfirmModal
          article={article}
          onCancel={() => setConfirming(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}