import { useEffect, useMemo, useState } from "react";
import type { Project } from "../types";
import { api } from "../services/api";
import { useToast } from "./ui/Toast";
import LoaderButton from "./ui/LoaderButton";
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

export default function ProjectEditor({
  project,
  onBack,
  onSaved,
  onDelete,
  allTags,
}: {
  project: Project | null;
  onBack: () => void;
  onSaved: (p: Project) => void;
  onDelete: (p: Project) => Promise<void>;
  allTags: string[];
}) {
  const empty: Project = {
    slug: "",
    path: "",
    frontmatter: { title: "", description: "", date: "", tags: [], published: true },
    body: "",
  };
  const [form, setForm] = useState<Project>(project ?? empty);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setForm(project ?? empty);
    setBusy(false);
    setDeleting(false);
  }, [project]);

  const isNew = useMemo(() => !project, [project]);

  function setFm(patch: Partial<Project["frontmatter"]>) {
    setForm((f) => ({ ...f, frontmatter: { ...f.frontmatter, ...patch } }));
  }

  async function save() {
    const publish = form.frontmatter.published !== false;
    setBusy(true);
    try {
      const updated: Project = {
        ...form,
        frontmatter: { ...form.frontmatter, published: publish },
      };
      await api.saveProject(updated);
      const saved = await api.getProject(updated.slug);
      onSaved(saved);
      toast.success(publish ? "Projet publié" : "Projet sauvegardé comme brouillon");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete(project: Project) {
    setDeleting(true);
    try {
      await onDelete(project);
      onBack();
      toast.success("Projet supprimé");
    } catch (err) {
      toast.error((err as Error).message);
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
          <h2>{isNew ? "New project" : form.frontmatter.title || form.slug}</h2>
          {!isNew && <StatusPill published={form.frontmatter.published !== false} />}
        </div>
        <div className="actions">
          <LoaderButton className="primary" busy={busy} disabled={deleting} busyLabel="Saving…" onClick={save}>
            Save
          </LoaderButton>
          {!isNew && (
            <LoaderButton className="danger" busy={deleting} disabled={busy} busyLabel="Deleting…" onClick={() => setConfirming(true)}>
              Delete
            </LoaderButton>
          )}
        </div>
      </div>

      <div className="editor-grid">
        <div className="editor-side">
          <Card title="Details" subtitle="Appears in the project list and metadata">
            <Field
              label="Title"
              counter={{ value: form.frontmatter.title.length, max: TITLE_MAX }}
              hint="Used as the headline and SEO title"
            >
              <input
                value={form.frontmatter.title}
                maxLength={TITLE_MAX + 40}
                onChange={(e) => setFm({ title: e.target.value })}
                placeholder="Project title"
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
            placeholder="# Write your project…"
          />
        </div>
      </div>

      {showPreview && (
        <MarkdownPreviewModal
          markdown={form.body}
          title={form.frontmatter.title || "Preview"}
          onClose={() => setShowPreview(false)}
        />
      )}
      {!isNew && project && confirming && (
        <DeleteConfirmModal
          slug={project.slug}
          kind="project"
          onCancel={() => setConfirming(false)}
          onConfirm={() => confirmDelete(project)}
        />
      )}
    </div>
  );
}