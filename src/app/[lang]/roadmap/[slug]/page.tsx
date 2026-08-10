import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProgressTracker } from "@/components/roadmap/ProgressTracker";
import { ReadingProgress } from "@/components/roadmap/ReadingProgress";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { dictionaries, isValidLocale } from "@/lib/i18n";
import { getEquivalentRoadmapSlug } from "@/lib/roadmap-data";
import { localeCode, siteName, siteUrl, socialImageWebp } from "@/lib/seo";
import {
  getAllRoadmaps,
  getRoadmapBySlug,
  getRoadmapHeadings,
  getRoadmapStaticParams,
} from "@/lib/mdx";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRoadmapStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  const roadmap = getAllRoadmaps(lang).find((item) => item.slug === slug);
  if (!roadmap) {
    return {};
  }

  const isTurkish = lang === "tr";
  const englishSlug = isTurkish ? getEquivalentRoadmapSlug(slug, "tr", "en") : slug;
  const turkishSlug = isTurkish ? slug : getEquivalentRoadmapSlug(slug, "en", "tr");
  const title = roadmap.title;
  const description = roadmap.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/roadmap/${slug}/`,
      languages: {
        en: `/en/roadmap/${englishSlug}/`,
        tr: `/tr/roadmap/${turkishSlug}/`,
        "x-default": `/en/roadmap/${englishSlug}/`,
      },
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: `/${lang}/roadmap/${slug}/`,
      siteName,
      locale: localeCode(lang),
      alternateLocale: localeCode(isTurkish ? "en" : "tr"),
      type: "article",
      images: [{ url: socialImageWebp, width: 1732, height: 908, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [socialImageWebp],
    },
  };
}

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const modules = getAllRoadmaps(lang);
  const index = modules.findIndex((module) => module.slug === slug);
  if (index === -1) {
    notFound();
  }

  const { content, frontmatter } = await getRoadmapBySlug(lang, slug);
  const headings = getRoadmapHeadings(lang, slug);
  const t = dictionaries[lang];
  const previous = modules[index - 1];
  const next = modules[index + 1];
  const moduleLabel = lang === "tr" ? "Modül" : "Module";
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "tr" ? "Ana Sayfa" : "Home",
        item: `${siteUrl}/${lang}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "tr" ? "Yol Haritası" : "Roadmap",
        item: `${siteUrl}/${lang}/roadmap/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: `${siteUrl}/${lang}/roadmap/${slug}/`,
      },
    ],
  };

  return (
    <main className="mx-auto grid min-w-0 max-w-[82rem] gap-8 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[180px_minmax(0,36rem)_180px] lg:justify-center lg:gap-4 xl:grid-cols-[200px_minmax(0,44rem)_200px] xl:gap-6 2xl:grid-cols-[220px_minmax(0,48rem)_220px] 2xl:gap-8">
      <JsonLd data={breadcrumbData} />
      <ReadingProgress />
      <Sidebar label={lang === "tr" ? "Bölümler" : "Sections"} sections={headings} />
      <article className="detail-shell mx-auto min-w-0 w-full max-w-3xl lg:col-start-2 lg:mx-0">
        <div className="detail-hero min-w-0 rounded-2xl border-[1.5px] border-border bg-panel p-4 sm:p-6 md:p-8">
          <span aria-hidden="true" className="detail-hero-watermark">
            {String(frontmatter.order).padStart(2, "0")}
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            {moduleLabel} {frontmatter.order}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:mt-5 sm:text-4xl md:text-6xl">
            {frontmatter.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted sm:mt-5 sm:text-lg sm:leading-8">
            {frontmatter.description}
          </p>
          <div className="mt-6 lg:hidden">
            <ProgressTracker
              completedLabel={t.common.completed}
              locale={lang}
              markCompleteLabel={t.common.markComplete}
              slug={slug}
            />
          </div>
        </div>
        <div className="prose-roadmap detail-content mt-6 min-w-0 rounded-2xl bg-panel p-4 sm:mt-8 sm:p-6 md:p-8">
          {content}
        </div>
        <div className="mt-6 grid gap-3 sm:mt-8 md:grid-cols-2">
          {previous ? (
            <Link className="btn-secondary detail-pagination-link justify-start" href={`/${lang}/roadmap/${previous.slug}/`}>
              <ArrowLeft className="h-4 w-4" />
              {t.common.previous}: {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="btn-secondary detail-pagination-link justify-end" href={`/${lang}/roadmap/${next.slug}/`}>
              {t.common.next}: {next.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </article>
      <aside className="hidden lg:block">
        <div className="progress-side sticky top-24 rounded-2xl bg-panel p-4">
          <p className="text-sm font-semibold text-accent-strong dark:text-accent">
            {lang === "tr" ? "İlerleme" : "Progress"}
          </p>
          <div className="mt-4">
            <ProgressTracker
              completedLabel={t.common.completed}
              locale={lang}
              markCompleteLabel={t.common.markComplete}
              slug={slug}
            />
          </div>
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {lang === "tr" ? "Sonraki Modül" : "Next Module"}
            </p>
            {next ? (
              <Link className="next-module-card mt-2" href={`/${lang}/roadmap/${next.slug}/`}>
                <span>{next.title}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link className="next-module-card mt-2" href={`/${lang}/roadmap/`}>
                <span>{lang === "tr" ? "Tüm Modülleri İncele" : "Browse All Modules"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="mt-5 border-t border-border pt-4">
            <a
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
              href={`https://github.com/ahmetmelihcalis/ai-engineering-roadmap/blob/main/src/content/${lang}/roadmap/${slug}.mdx`}
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon className="h-4 w-4" />
              {lang === "tr" ? "GitHub'da Aç" : "Open on GitHub"}
            </a>
          </div>
        </div>
      </aside>
    </main>
  );
}
