"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Locale, RoadmapModule } from "@/types";

function highlightMatch(value: string, query: string) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return value;
  }

  const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = value.split(new RegExp(`(${escapedQuery})`, "ig"));

  return parts.map((part, index) =>
    part.toLocaleLowerCase() === trimmedQuery.toLocaleLowerCase() ? (
      <mark className="search-highlight" key={`${part}-${index}`}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function SearchBox({
  items,
  locale,
  placeholder,
}: {
  items: RoadmapModule[];
  locale: Locale;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description", "tags"],
        threshold: 0.35,
      }),
    [items],
  );
  const hasQuery = query.trim().length > 0;
  const results = hasQuery ? fuse.search(query).slice(0, 6).map((item) => item.item) : [];
  const resultLabel =
    locale === "tr"
      ? `${results.length} sonuç`
      : `${results.length} result${results.length === 1 ? "" : "s"}`;

  return (
    <div className="relative w-full">
      <div className="flex items-center rounded-xl border-[1.5px] border-border bg-surface px-3">
        <Search className="h-4 w-4 text-muted" />
        <input
          className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          value={query}
        />
      </div>
      {hasQuery ? (
        <div className="absolute left-0 right-0 top-12 z-40 rounded-xl border-[1.5px] border-border bg-panel p-2 shadow-lg">
          <p className="px-3 pb-2 pt-1 text-xs font-semibold text-accent">{resultLabel}</p>
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                className="block border-b border-border px-3 py-3 last:border-b-0 hover:bg-surface"
                href={`/${locale}/roadmap/${item.slug}/`}
                key={item.slug}
                onClick={() => setQuery("")}
              >
                <p className="text-sm font-semibold">{highlightMatch(item.title, query)}</p>
                <p className="mt-1 line-clamp-1 text-xs text-muted">{highlightMatch(item.description, query)}</p>
              </Link>
            ))
          ) : (
            <p className="px-3 py-3 text-sm text-muted">
              {locale === "tr" ? "Eşleşen modül bulunamadı." : "No matching modules found."}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
