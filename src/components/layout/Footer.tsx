import Link from "next/link";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { dictionaries } from "@/lib/i18n";
import type { Locale } from "@/types";

export function Footer({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <footer className="border-t-[1.5px] border-border bg-surface dark:bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-7 text-center text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="whitespace-nowrap">
          <a className="font-semibold text-foreground hover:text-accent" href="https://melihcalis.dev" target="_blank" rel="noreferrer">melihcalis.dev</a>{locale === "tr" ? "'in" : "'s"}
          <span className="ml-1 text-xs text-muted sm:text-sm">
            {locale === "tr" ? "Yapay Zeka Mühendisliği Notları" : "AI Engineering Notes"}
          </span>
        </div>
        <nav aria-label={locale === "tr" ? "Alt navigasyon" : "Footer navigation"} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-semibold md:justify-end">
          <Link href={`/${locale}/roadmap/`}>{locale === "tr" ? "Yol Haritası" : t.nav.roadmap}</Link>
          <Link href={`/${locale}/about/`}>{t.nav.about}</Link>
          <a className="inline-flex items-center gap-1.5" href="https://github.com/ahmetmelihcalis/ai-engineering-roadmap" target="_blank" rel="noreferrer">
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
