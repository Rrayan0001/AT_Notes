"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "pavan-notes-theme";

/**
 * layout.tsx applies the stored class before paint, so reading it back through
 * an external store avoids both a hydration mismatch and a mount-time
 * setState-in-effect. Subscribing to the class attribute also keeps the icon
 * honest if something else toggles the theme.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = useCallback(() => {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Private mode can reject writes; the class toggle still applies.
    }
  }, []);

  return (
    <Button
      onClick={toggle}
      variant="ghost"
      size="icon"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title="Toggle theme"
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}