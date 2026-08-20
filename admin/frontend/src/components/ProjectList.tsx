import type { Project } from "../types";

export default function ProjectList({
  projects,
  onEdit,
  onCreate,
  onDelete,
  busySlug,
}: {
  projects: Project[];
  onEdit: (p: Project) => void;
  onCreate: () => void;
  onDelete: (p: Project) => void;
  busySlug: string | null;
}) {
  return (
    <div className="article-list">
      <div className="list-head">
        <h2>Projects</h2>
        <button className="primary" onClick={onCreate}>
          + New project
        </button>
      </div>
      <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const published = p.frontmatter.published !== false;
            return (
              <tr
                key={p.slug}
                className="clickable"
                onClick={() => onEdit(p)}
              >
                <td className="title">{p.frontmatter.title || p.slug}</td>
                <td>{p.frontmatter.date}</td>
                <td>
                  <span className={`badge ${published ? "ok" : "draft"}`}>
                    {published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <span className="tags">
                    {(p.frontmatter.tags || []).map((t) => (
                      <em key={t}>{t}</em>
                    ))}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="danger"
                    disabled={busySlug === p.slug}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(p);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}