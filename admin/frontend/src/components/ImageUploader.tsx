import { useRef, useState } from "react";
import { api } from "../services/api";
import { useToast } from "./ui/Toast";
import LoaderButton from "./ui/LoaderButton";

export default function ImageUploader({ onInserted }: { onInserted: (markdown: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1];
          const name = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
          const markdown = await api.uploadImage(name, base64);
          onInserted(markdown);
          toast.success("Image téléversée");
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setBusy(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error((err as Error).message);
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
      <LoaderButton
        type="button"
        busy={busy}
        busyLabel="Uploading…"
        onClick={() => inputRef.current?.click()}
      >
        Upload image
      </LoaderButton>
    </div>
  );
}