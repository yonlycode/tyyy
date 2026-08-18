import type { Article } from "../types";

export default function ArticleList({
  articles,
  onEdit,
  onCreate,
  onDelete,
  busySlug,
}: {
  articles: Article[];
  onEdit: (a: Article) => void;
  onCreate: () => void;
  onDelete: (a: Article) => void;
  busySlug: string | null;
}) {
  return (
    <div className="article-list">
      <div className="list-head">
        <h2>Articles</h2>
        <button className="primary" onClick={onCreate}>
          + New article
        </button>
      </div>
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
          {articles.map((a) => {
            const published = a.frontmatter.published !== false;
            return (
              <tr key={a.slug}>
                <td className="title">{a.frontmatter.title || a.slug}</td>
                <td>{a.frontmatter.date}</td>
                <td>
                  <span className={`badge ${published ? "ok" : "draft"}`}>
                    {published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <span className="tags">
                    {(a.frontmatter.tags || []).map((t) => (
                      <em key={t}>{t}</em>
                    ))}
                  </span>
                </td>
                <td className="actions">
                  <button onClick={() => onEdit(a)}>Edit</button>
                  <button
                    className="danger"
                    disabled={busySlug === a.slug}
                    onClick={() => onDelete(a)}
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
  );
}