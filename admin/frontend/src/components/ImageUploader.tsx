import { useRef, useState } from "react";
import { api } from "../services/api";

export default function ImageUploader({ onInserted }: { onInserted: (markdown: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setBusy(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const name = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
        const markdown = await api.uploadImage(name, base64);
        onInserted(markdown);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="uploader">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? "Uploading…" : "Upload image"}
      </button>
      {error && <span className="error">{error}</span>}
    </div>
  );
}