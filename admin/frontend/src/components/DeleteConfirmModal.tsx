import type { Article } from "../types";

export default function DeleteConfirmModal({
  article,
  onConfirm,
  onCancel,
}: {
  article: Article;
  onConfirm: (a: Article) => void;
  onCancel: () => void;
}) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Delete article</h2>
        <p>
          Are you sure you want to delete <strong>{article.slug}</strong>? This
          will commit the deletion to GitHub and the article will no longer be
          visible on the site.
        </p>
        <div className="actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={() => onConfirm(article)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}