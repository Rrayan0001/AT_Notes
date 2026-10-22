"use client";

import { useState } from "react";
import { FIELD, LABEL } from "@/components/auth/auth-shell";

/**
 * Password field with a show/hide toggle. The toggle is set as a mono
 * lowercase verb on the hairline — the machine voice, never an icon.
 */
export function PasswordField({
  id,
  label,
  autoComplete,
  ...props
}: {
  id: string;
  label: string;
  autoComplete: string;
} & Omit<React.ComponentProps<"input">, "id" | "type" | "autoComplete">) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          className={`${FIELD} pr-16`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-pressed={show}
          aria-label={show ? "Hide password" : "Show password"}
          className="focus-rubric absolute right-0 bottom-[0.55rem] font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {show ? "hide" : "show"}
        </button>
      </div>
    </div>
  );
}
