interface FieldProps {
  label: string;
  hint?: string;
  counter?: { value: number; max: number };
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Field({ label, hint, counter, error, className = "", children }: FieldProps) {
  return (
    <label className={`field${className ? ` ${className}` : ""}`}>
      <span className="field-label-row">
        <span className="field-label">{label}</span>
        {counter && (
          <span className={`field-count${counter.value > counter.max ? " over" : ""}`}>
            {counter.value}/{counter.max}
          </span>
        )}
      </span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}
