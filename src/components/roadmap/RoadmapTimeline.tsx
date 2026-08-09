"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { progressChangedEvent, progressKey } from "@/lib/progress";
import { Locale, RoadmapModule } from "@/types";

export function RoadmapTimeline({
  modules,
  locale,
}: {
  modules: RoadmapModule[];
  locale: Locale;
}) {
  const openLabel = locale === "tr" ? "Notu Aç" : "View Module";
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    function updateCompletedModules() {
      setCompletedSlugs(
        new Set(
          modules
            .filter((module) => window.localStorage.getItem(progressKey(locale, module.slug)) === "complete")
            .map((module) => module.slug),
        ),
      );
    }

    updateCompletedModules();
    window.addEventListener(progressChangedEvent, updateCompletedModules);
    window.addEventListener("storage", updateCompletedModules);
    return () => {
      window.removeEventListener(progressChangedEvent, updateCompletedModules);
      window.removeEventListener("storage", updateCompletedModules);
    };
  }, [locale, modules]);

  return (
    <div className="roadmap-route mt-10 sm:mt-12">
      {modules.map((module, index) => {
        const isCompleted = completedSlugs.has(module.slug);
        return (
        <div
          className={`roadmap-route-stop ${index % 2 === 0 ? "roadmap-route-stop-left" : "roadmap-route-stop-right"}`}
          key={module.slug}
        >
          <Link className="roadmap-route-card" href={`/${locale}/roadmap/${module.slug}/`}>
            <span aria-hidden="true" className="roadmap-route-card-accent" />
            <span className="roadmap-route-card-top">
              <span className="roadmap-route-order">{String(module.order).padStart(2, "0")}</span>
              <span className="roadmap-route-open">{openLabel} →</span>
            </span>
            <span className="roadmap-route-title">{module.title}</span>
            <span className="roadmap-route-description">{module.description}</span>
            <span className="roadmap-route-tags">
              {module.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          </Link>
          <span aria-hidden="true" className={`roadmap-route-node ${isCompleted ? "roadmap-route-node-completed" : ""}`}>
            {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : String(module.order).padStart(2, "0")}
          </span>
          {index < modules.length - 1 ? <span aria-hidden="true" className="roadmap-route-segment" /> : null}
        </div>
        );
      })}
    </div>
  );
}
