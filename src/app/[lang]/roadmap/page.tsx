import { RoadmapTimeline } from "@/components/roadmap/RoadmapTimeline";
import { SearchBox } from "@/components/ui/SearchBox";
import type { Metadata } from "next";
import { dictionaries, isValidLocale } from "@/lib/i18n";
import { getAllRoadmaps } from "@/lib/mdx";
import { localeCode, siteName, socialImageWebp } from "@/lib/seo";
import { locales } from "@/types";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  const isTurkish = lang === "tr";
  const title = isTurkish ? "Yapay Zeka Mühendisliği Yol Haritası Modülleri" : "AI Engineering Roadmap Modules";
  const description = isTurkish
    ? "Temel becerilerden üretim sistemlerine ilerleyen 12 modüllük yapay zeka mühendisliği öğrenme yol haritasını inceleyin."
    : "Explore a 12-module AI engineering learning path from foundational skills to production systems.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/roadmap/`,
      languages: {
        en: "/en/roadmap/",
        tr: "/tr/roadmap/",
        "x-default": "/en/roadmap/",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}/roadmap/`,
      siteName,
      locale: localeCode(lang),
      alternateLocale: localeCode(isTurkish ? "en" : "tr"),
      type: "website",
      images: [
        { url: socialImageWebp, width: 1732, height: 908, alt: siteName },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageWebp],
    },
  };
}

export default async function RoadmapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return null;
  }

  const modules = getAllRoadmaps(lang);
  const t = dictionaries[lang];
  const copy =
    lang === "tr"
      ? {
          eyebrow: "Yol Haritası",
          description:
            "Temel becerilerden canlı sistemlere doğru, adım adım ilerleyen 12 modüllük öğrenme akışı.",
        }
      : {
          eyebrow: "Roadmap",
          description:
            "A 12-module learning path that progresses step by step from foundational skills to production systems.",
        };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-20">
      <section className="text-center">
        <h1 className="display-title roadmap-page-title text-4xl leading-[0.98] text-accent sm:text-5xl md:text-6xl">
          {copy.eyebrow}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-foreground sm:mt-6 sm:text-base sm:leading-7">{copy.description}</p>
        <div className="mx-auto mt-6 max-w-2xl sm:mt-8">
          <SearchBox items={modules} locale={lang} placeholder={t.common.search} />
        </div>
        <RoadmapTimeline locale={lang} modules={modules} />
      </section>
    </main>
  );
}
