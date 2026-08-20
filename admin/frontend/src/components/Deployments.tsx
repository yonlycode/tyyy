import type { Deployment } from "../types";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

function statusClass(status: string, conclusion: string) {
  if (conclusion === "success") return "ok";
  if (conclusion === "failure" || conclusion === "cancelled" || conclusion === "timed_out") return "draft";
  if (status === "in_progress" || status === "queued") return "running";
  return "";
}

function statusLabel(status: string, conclusion: string) {
  if (conclusion) return conclusion;
  if (status === "in_progress") return "running…";
  if (status === "queued") return "queued";
  return status || "unknown";
}

export default function Deployments({
  deployments,
  busy,
  onRefresh,
}: {
  deployments: Deployment[];
  busy: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="deploy-list">
      <div className="list-head">
        <h2>Deployments</h2>
        <button className="primary" disabled={busy} onClick={onRefresh}>
          {busy ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {deployments.length === 0 && !busy && <p className="hint">No deployments yet.</p>}
      <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Run</th>
            <th>Title</th>
            <th>Status</th>
            <th>Branch</th>
            <th>Commit</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map((d) => (
            <tr
              key={d.id}
              className="clickable"
              onClick={() => {
                if (d.htmlUrl) BrowserOpenURL(d.htmlUrl);
              }}
            >
              <td>#{d.runNumber}</td>
              <td className="title">
                {d.htmlUrl ? (
                  <a
                    href={d.htmlUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      BrowserOpenURL(d.htmlUrl);
                    }}
                  >
                    {d.displayTitle || "Deploy"}
                  </a>
                ) : (
                  d.displayTitle || "Deploy"
                )}
              </td>
              <td>
                <span className={`badge ${statusClass(d.status, d.conclusion)}`}>
                  {statusLabel(d.status, d.conclusion)}
                </span>
              </td>
              <td>{d.headBranch}</td>
              <td className="mono">{d.headSha.slice(0, 7)}</td>
              <td>{d.updatedAt ? new Date(d.updatedAt).toLocaleString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}