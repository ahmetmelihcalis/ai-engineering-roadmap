import type { MetadataRoute } from "next";
import { getRoadmapStaticParams } from "@/lib/mdx";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localePages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/en/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tr/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/en/roadmap/"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tr/roadmap/"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/en/about/"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/tr/about/"), changeFrequency: "monthly", priority: 0.5 },
  ];

  const roadmapPages = getRoadmapStaticParams().map(({ lang, slug }) => ({
    url: absoluteUrl(`/${lang}/roadmap/${slug}/`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...localePages, ...roadmapPages];
}
