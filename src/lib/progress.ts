import { Locale } from "@/types";

export const progressChangedEvent = "ai-roadmap:progress-change";

export function progressKey(locale: Locale, slug: string) {
  return `ai-roadmap:progress:${locale}:${slug}`;
}
