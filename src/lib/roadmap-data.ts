import { Locale } from "@/types";

export const roadmapSlugs = {
  tr: [
  "ai-icin-python",
  "sql-ve-veritabani-mimarisi",
  "kesifsel-veri-analizi",
  "matematik-lineer-cebir-ve-istatistik",
  "makine-ogrenmesi",
  "derin-ogrenme",
  "bilgisayarli-goruye-kisa-bir-giris",
  "dogal-dil-isleme",
  "uretken-yapay-zeka-ve-buyuk-dil-modelleri",
  "rag-ve-ajan-tabanli-sistemler",
  "fine-tuning-ve-optimizasyon",
  "mlops-llmops-ve-deployment",
  ],
  en: [
    "python-for-ai",
    "sql-and-database-architecture",
    "exploratory-data-analysis",
    "mathematics-linear-algebra-and-statistics",
    "machine-learning",
    "deep-learning",
    "a-short-introduction-to-computer-vision",
    "natural-language-processing",
    "generative-ai-and-large-language-models",
    "rag-and-agentic-systems",
    "fine-tuning-and-optimization",
    "mlops-llmops-and-deployment",
  ],
} as const;

export function getEquivalentRoadmapSlug(slug: string, from: Locale, to: Locale) {
  const index = roadmapSlugs[from].indexOf(slug as never);
  return index === -1 ? slug : roadmapSlugs[to][index] ?? slug;
}
