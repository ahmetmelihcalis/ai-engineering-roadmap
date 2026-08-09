"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getEquivalentRoadmapSlug } from "@/lib/roadmap-data";
import { Locale } from "@/types";

function switchLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  const currentLocale = parts[1];
  if (currentLocale === "en" || currentLocale === "tr") {
    const roadmapIndex = parts.indexOf("roadmap");
    const slugIndex = roadmapIndex === -1 ? -1 : roadmapIndex + 1;
    if (slugIndex > roadmapIndex && parts[slugIndex]) {
      parts[slugIndex] = getEquivalentRoadmapSlug(parts[slugIndex], currentLocale, locale);
    }
    parts[1] = locale;
    return parts.join("/") || `/${locale}/`;
  }
  return `/${locale}/`;
}

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "en" ? "tr" : "en";

  return (
    <Link
      aria-label={label}
      className="icon-button"
      href={switchLocale(pathname, nextLocale)}
      title={label}
    >
      <span className="text-xs font-semibold uppercase">{nextLocale}</span>
    </Link>
  );
}
