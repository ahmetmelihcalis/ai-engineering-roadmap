"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

export function ThemeToggle({ label }: { label: string }) {
  useEffect(() => {
    const stored = window.localStorage.getItem("ai-roadmap:theme");
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      return;
    }
    applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  function cycleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    window.localStorage.setItem("ai-roadmap:theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      aria-label={label}
      className="icon-button"
      onClick={cycleTheme}
      type="button"
      title={label}
    >
      <Sun className="theme-toggle-sun h-4 w-4" />
      <Moon className="theme-toggle-moon h-4 w-4" />
    </button>
  );
}
