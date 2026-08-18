export default function DeleteConfirmModal({
  slug,
  kind,
  onConfirm,
  onCancel,
}: {
  slug: string;
  kind: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Delete {kind}</h2>
        <p>
          Are you sure you want to delete <strong>{slug}</strong>? This will
          commit the deletion to GitHub and the {kind} will no longer be visible
          on the site.
        </p>
        <div className="actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}