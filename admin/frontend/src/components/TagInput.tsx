import { useEffect, useRef, useState } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions: string[];
}

export default function TagInput({ value, onChange, suggestions }: TagInputProps) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalized = input.trim();
  const filtered = normalized
    ? suggestions.filter(
        (s) => !value.includes(s) && s.toLowerCase().includes(normalized.toLowerCase()),
      )
    : [];

  function commit(raw: string) {
    const tag = raw.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
    setOpen(false);
    setHighlight(-1);
  }

  function remove(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (open && highlight >= 0 && filtered[highlight]) {
        commit(filtered[highlight]);
      } else {
        commit(input);
      }
    } else if (e.key === "Backspace" && input === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => (h + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="tag-input" ref={wrapperRef}>
      <div className="tag-chips">
        {value.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
            <button type="button" className="tag-chip-remove" onClick={() => remove(tag)} aria-label={`Remove ${tag}`}>
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="tag-input-field"
          value={input}
          placeholder={value.length === 0 ? "Ajouter des tags…" : ""}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
            setHighlight(-1);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
      </div>
      {open && filtered.length > 0 && (
        <ul className="tag-suggestions">
          {filtered.map((s, i) => (
            <li
              key={s}
              className={`tag-suggestion${i === highlight ? " highlight" : ""}`}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                commit(s);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}