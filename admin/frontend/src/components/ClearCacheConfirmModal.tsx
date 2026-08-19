export default function ClearCacheConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Clear cache</h2>
        <p>
          This removes the saved GitHub credentials from disk
          (<code>~/.tyyy-admin/config.json</code>) and resets the app to an
          unconfigured state. Your content on GitHub is not affected.
        </p>
        <div className="actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>
            Clear cache
          </button>
        </div>
      </div>
    </div>
  );
}
