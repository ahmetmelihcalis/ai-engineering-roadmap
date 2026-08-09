import { RoadmapCard } from "@/components/roadmap/RoadmapCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { SearchBox } from "@/components/ui/SearchBox";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { dictionaries, isValidLocale } from "@/lib/i18n";
import { getAllRoadmaps } from "@/lib/mdx";
import { localeCode, siteName, siteUrl, socialImageWebp } from "@/lib/seo";
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
  const title = isTurkish ? "Yapay Zeka Mühendisliği Yol Haritası" : "AI Engineering Roadmap";
  const description = isTurkish
    ? "Python ve veri temellerinden LLM sistemleri ile deployment’a uzanan ücretsiz, iki dilli yapay zeka mühendisliği öğrenme yol haritası."
    : "A free, bilingual AI engineering learning roadmap from Python and data foundations through LLM systems to deployment.";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        en: "/en/",
        tr: "/tr/",
        "x-default": "/en/",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}/`,
      siteName,
      locale: localeCode(lang),
      alternateLocale: localeCode(isTurkish ? "en" : "tr"),
      type: "website",
      images: [{ url: socialImageWebp, width: 1732, height: 908, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageWebp],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return null;
  }

  const t = dictionaries[lang];
  const modules = getAllRoadmaps(lang);
  const copy =
    lang === "tr"
      ? {
          titleLead: "Yapay Zeka Mühendisliği",
          titleFocus: "Yol Haritası",
          description:
            "Python ve veri temellerinden LLM sistemleri ile deployment’a uzanan rehber.",
          curriculum: "12 MODÜL",
          featured: "Temel 6 Modül",
          start: "Yol Haritasına Başla",
          allModules: "Tüm Modülleri İncele",
        }
      : {
          titleLead: "AI Engineering",
          titleFocus: "Roadmap",
          description:
            "A guide from Python and data foundations through LLM systems to deployment.",
          curriculum: "12 MODULES",
          featured: "6 Core Modules",
          start: "Start the Roadmap",
          allModules: "Browse All Modules",
        };
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      inLanguage: lang,
      description: copy.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      sameAs: ["https://github.com/ahmetmelihcalis/ai-engineering-roadmap", "https://melihcalis.dev"],
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-20">
      <JsonLd data={structuredData} />
      <header className="border-b-[1.5px] border-foreground pb-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <h1 className="display-title hero-title max-w-4xl text-3xl leading-[0.98] text-foreground sm:text-4xl md:text-5xl">
              <span className="hero-title-lead block text-balance">{copy.titleLead}</span>
              <span className="hero-title-focus mt-2 block sm:mt-3">{copy.titleFocus}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-muted sm:mt-6 sm:text-base sm:leading-7">{copy.description}</p>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-2xl sm:mt-8">
          <SearchBox items={modules} locale={lang} placeholder={t.common.search} />
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link className="btn-primary" href={`/${lang}/roadmap/${modules[0]?.slug}/`}>
            {copy.start}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link className="btn-secondary" href={`/${lang}/roadmap/`}>
            {copy.allModules}
          </Link>
        </div>
      </header>

      <section className="pt-8 md:pt-12">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-muted">
          <h2 className="font-inherit text-accent-strong dark:text-accent">{copy.featured}</h2>
          <div className="module-count-compact" aria-label={copy.curriculum}>
            <span>{copy.curriculum}</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border-[1.5px] border-border bg-panel">
          {modules.slice(0, 6).map((module) => (
            <RoadmapCard key={module.slug} locale={lang} module={module} variant="index" />
          ))}
        </div>
        <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-strong" href={`/${lang}/roadmap/`}>
          {copy.allModules}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
