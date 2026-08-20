export default function StatusPill({ published }: { published: boolean }) {
  return <span className={`badge ${published ? "ok" : "draft"}`}>{published ? "Published" : "Draft"}</span>;
}
