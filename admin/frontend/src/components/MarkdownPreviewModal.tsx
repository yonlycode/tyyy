import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

export default function MarkdownPreviewModal({
  markdown,
  title,
  onClose,
}: {
  markdown: string;
  title: string;
  onClose: () => void;
}) {
  const [htmlStr, setHtmlStr] = useState("");

  useEffect(() => {
    let active = true;
    remark()
      .use(html)
      .process(markdown)
      .then((file) => active && setHtmlStr(String(file)))
      .catch(() => active && setHtmlStr(""));
    return () => {
      active = false;
    };
  }, [markdown]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal-bar">
          <h2>{title || "Preview"}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="preview" dangerouslySetInnerHTML={{ __html: htmlStr }} />
      </div>
    </div>
  );
}
