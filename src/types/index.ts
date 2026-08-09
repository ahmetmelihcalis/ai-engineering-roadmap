export const locales = ["en", "tr"] as const;

export type Locale = (typeof locales)[number];

export type RoadmapFrontmatter = {
  title: string;
  slug: string;
  order: number;
  description: string;
  tags: string[];
};

export type RoadmapModule = RoadmapFrontmatter & {
  locale: Locale;
};
