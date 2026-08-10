import Link from "next/link";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { dictionaries } from "@/lib/i18n";
import type { Locale } from "@/types";

export function Footer({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const copy = locale === "tr"
    ? {
        description: "Yapay zeka mühendisi olma yolunda tuttuğum notlar ve faydalı bulduğum kaynaklar.",
        notes: "'in Yapay Zeka Mühendisliği Notları",
        navigation: "GEZİNME",
        resources: "KAYNAK KOD",
        copyright: "OPEN SOURCE",
      }
    : {
        description: "Notes and useful resources from my journey to becoming an AI engineer.",
        notes: "'s AI Engineering Notes",
        navigation: "NAVIGATION",
        resources: "SOURCE CODE",
        copyright: "OPEN SOURCE",
      };

  return (
    <footer className="site-footer border-t bg-surface dark:bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 text-center text-sm sm:px-6 md:grid-cols-[minmax(0,1.5fr)_auto_auto] md:gap-x-14 md:text-left">
        <div className="max-w-sm">
          <p className="text-foreground">
            <a className="font-semibold hover:text-accent" href="https://melihcalis.dev" target="_blank" rel="noreferrer">melihcalis.dev</a>{copy.notes}
          </p>
          <p className="mt-2 leading-6 text-muted">{copy.description}</p>
        </div>
        <nav aria-label={locale === "tr" ? "Alt navigasyon" : "Footer navigation"} className="footer-links">
          <p className="footer-column-label">{copy.navigation}</p>
          <Link href={`/${locale}/roadmap/`}>{locale === "tr" ? "Yol Haritası" : t.nav.roadmap}</Link>
          <Link href={`/${locale}/about/`}>{t.nav.about}</Link>
        </nav>
        <div className="footer-links">
          <p className="footer-column-label">{copy.resources}</p>
          <a className="inline-flex items-center justify-center gap-1.5 md:justify-start" href="https://github.com/ahmetmelihcalis/ai-engineering-roadmap" target="_blank" rel="noreferrer">
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <p className="pt-2 text-xs leading-5 text-muted">&copy; 2026 · {copy.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
