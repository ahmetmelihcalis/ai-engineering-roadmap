import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n";
import { localeCode, siteName, socialImageWebp } from "@/lib/seo";
import { locales } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy = {
  en: {
    title: "AI Engineering Roadmap",
    body:
      "As a software engineering student, I created this roadmap by bringing together the notes I took while working toward becoming an AI engineer, the concepts I want to revisit, the code I have tried, and the resources I found useful.",
    contribution: "If you would like to contribute, you can star the project on GitHub or open a Pull Request.",
    personalSite: "Explore More of My Work on melihcalis.dev",
    github: "My GitHub Account",
    eyebrow: "ABOUT",
  },
  tr: {
    title: "AI Engineering Roadmap",
    body:
      "Bir yazılım mühendisliği öğrencisi olarak, yapay zeka mühendisi olma yolunda aldığım notlarımı, tekrar göz atmak istediğim kavramları, denediğim kodları ve faydalı bulduğum kaynakları bir araya getirerek bu yol haritasını oluşturdum.",
    contribution:
      "Katkıda bulunmak isterseniz projeye GitHub üzerinden yıldız verebilir veya Pull Request açabilirsiniz.",
    personalSite: "melihcalis.dev'de Diğer Çalışmalarıma Göz At",
    github: "GitHub Hesabım",
    eyebrow: "Hakkında",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return {};
  }

  const isTurkish = lang === "tr";
  const title = isTurkish ? "Hakkında" : "About";
  const description = isTurkish
    ? "AI Engineering Roadmap’ın amacı, kapsamı ve projeye katkıda bulunma yolları."
    : "The purpose, scope, and contribution options for AI Engineering Roadmap.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/about/`,
      languages: {
        en: "/en/about/",
        tr: "/tr/about/",
        "x-default": "/en/about/",
      },
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: `/${lang}/about/`,
      siteName,
      locale: localeCode(lang),
      alternateLocale: localeCode(isTurkish ? "en" : "tr"),
      type: "website",
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

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    return null;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-16">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{copy[lang].eyebrow}</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">{copy[lang].title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">{copy[lang].body}</p>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{copy[lang].contribution}</p>
      <div className="mt-8 flex flex-col items-center gap-4 text-center text-sm font-semibold">
        <a
          className="inline-flex items-center gap-1.5 text-accent hover:text-accent-strong"
          href="https://melihcalis.dev"
          rel="noreferrer"
          target="_blank"
        >
          {copy[lang].personalSite}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          className="inline-flex items-center gap-1.5 text-accent hover:text-accent-strong"
          href="https://github.com/ahmetmelihcalis"
          rel="noreferrer"
          target="_blank"
        >
          <GitHubIcon className="h-4 w-4" />
          {copy[lang].github}
        </a>
      </div>
    </main>
  );
}
