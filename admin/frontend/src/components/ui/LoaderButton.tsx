import type { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface LoaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  busy?: boolean;
  busyLabel?: string;
  spinnerSize?: number;
}

export default function LoaderButton({
  busy,
  busyLabel,
  children,
  disabled,
  spinnerSize,
  ...rest
}: LoaderButtonProps) {
  return (
    <button {...rest} disabled={disabled || busy}>
      {busy ? (
        <>
          <Spinner size={spinnerSize} />
          {busyLabel != null && <span>{busyLabel}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}