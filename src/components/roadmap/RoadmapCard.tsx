import Link from "next/link";
import { Locale, RoadmapModule } from "@/types";

export function RoadmapCard({
  module,
  locale,
  variant = "card",
}: {
  module: RoadmapModule;
  locale: Locale;
  variant?: "card" | "index";
}) {
  const openLabel = locale === "tr" ? "Notu Aç" : "View Module";

  if (variant === "index") {
    return (
      <Link className="curriculum-row" href={`/${locale}/roadmap/${module.slug}/`}>
        <span className="curriculum-number">{String(module.order).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span className="block text-lg font-semibold leading-tight text-foreground">{module.title}</span>
          <span className="mt-1.5 block max-w-3xl text-sm leading-6 text-muted">{module.description}</span>
          <span className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1 text-xs text-muted">
            {module.tags.map((tag, index) => (
              <span key={tag}>
                {tag}{index < module.tags.length - 1 ? " ·" : ""}
              </span>
            ))}
          </span>
        </span>
        <span className="curriculum-open" aria-hidden="true">{openLabel}</span>
      </Link>
    );
  }

  return (
    <Link
      className="group flex min-h-[210px] flex-col rounded-xl border-[1.5px] border-border bg-transparent p-5 transition-colors hover:border-accent hover:bg-surface"
      href={`/${locale}/roadmap/${module.slug}/`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="font-mono text-xs font-semibold tracking-[0.16em] text-muted">
          {String(module.order).padStart(2, "0")}
        </div>
        <span className="text-sm font-semibold text-muted transition-colors group-hover:text-accent">{openLabel} →</span>
      </div>
      <h3 className="mt-8 text-lg font-semibold leading-6">{module.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{module.description}</p>
    </Link>
  );
}
