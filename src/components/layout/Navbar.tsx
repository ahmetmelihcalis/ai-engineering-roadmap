"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { dictionaries } from "@/lib/i18n";
import { Locale } from "@/types";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = dictionaries[locale];
  const starLabel = locale === "tr" ? "Yıldız" : "Star";
  const items = [
    { label: t.nav.roadmap, href: `/${locale}/roadmap/` },
    { label: t.nav.about, href: `/${locale}/about/` },
  ];

  function isActive(href: string) {
    const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return normalizedPath === href || normalizedPath.startsWith(href);
  }

  return (
    <header className="site-header sticky top-0 z-50 border-b bg-background/92 backdrop-blur">
      <div className="site-header-inner relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link className="brand-link min-w-0 text-sm font-semibold sm:text-base" href={`/${locale}/`} onClick={() => setOpen(false)}>
          <span className="block truncate">AI Engineering Roadmap</span>
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`nav-link ${isActive(item.href) ? "nav-link-active" : ""}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header-actions ml-3 flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            aria-label={starLabel}
            className="github-star-link"
            href="https://github.com/ahmetmelihcalis/ai-engineering-roadmap"
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            <span aria-hidden="true" className="github-star-emoji">★</span>
            <span className="github-star-label">{starLabel}</span>
          </a>
          <LanguageSwitcher locale={locale} label={t.common.switchLanguage} />
          <ThemeToggle label={t.common.toggleTheme} />
          <button
            aria-expanded={open}
            aria-label={open ? t.common.closeNavigation : t.common.openNavigation}
            className="icon-button mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="mobile-nav-panel border-t bg-background lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 px-4 py-4">
            {items.map((item) => (
              <Link
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`mobile-nav-link ${isActive(item.href) ? "mobile-nav-link-active" : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              aria-label="Star on GitHub"
              className="mobile-github-star-link"
              href="https://github.com/ahmetmelihcalis/ai-engineering-roadmap"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon className="h-4 w-4" />
              <span aria-hidden="true" className="github-star-emoji">★</span>
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
