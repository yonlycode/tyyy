import { useState } from "react";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface SlugInputProps {
  value: string;
  source: string;
  disabled?: boolean;
  onChange: (slug: string) => void;
}

export default function SlugInput({ value, source, disabled, onChange }: SlugInputProps) {
  const [manual, setManual] = useState(false);

  const auto = !disabled && !manual && source.trim();
  const displayed = auto ? slugify(source) : value;

  return (
    <div className="slug-field">
      <div className="slug-input-wrap">
        <span className="slug-prefix">/</span>
        <input
          type="text"
          value={displayed}
          disabled={disabled}
          placeholder="mon-article"
          onChange={(e) => {
            setManual(true);
            onChange(e.target.value.replace(/[^a-z0-9-_]/g, "-").toLowerCase());
          }}
        />
        {auto && <span className="auto-badge">auto</span>}
      </div>
    </div>
  );
}
