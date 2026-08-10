"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { Locale } from "@/types";
import { progressChangedEvent, progressKey } from "@/lib/progress";

export function ProgressTracker({
  locale,
  slug,
  completedLabel,
  markCompleteLabel,
}: {
  locale: Locale;
  slug: string;
  completedLabel: string;
  markCompleteLabel: string;
}) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener(progressChangedEvent, onStoreChange);
    window.addEventListener("storage", onStoreChange);
    return () => {
      window.removeEventListener(progressChangedEvent, onStoreChange);
      window.removeEventListener("storage", onStoreChange);
    };
  }, []);

  const getSnapshot = useCallback(() => {
    return window.localStorage.getItem(progressKey(locale, slug)) === "complete";
  }, [locale, slug]);

  const completed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function toggle() {
    const nextValue = !completed;
    if (nextValue) {
      window.localStorage.setItem(progressKey(locale, slug), "complete");
    } else {
      window.localStorage.removeItem(progressKey(locale, slug));
    }
    window.dispatchEvent(new CustomEvent(progressChangedEvent));
  }

  return (
    <button className={`btn-secondary ${completed ? "progress-tracker-completed" : ""}`} onClick={toggle} type="button">
      {completed ? completedLabel : markCompleteLabel}
      {completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
    </button>
  );
}
