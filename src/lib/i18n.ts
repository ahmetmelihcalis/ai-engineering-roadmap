import { Locale, locales } from "@/types";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const dictionaries = {
  en: {
    nav: {
      roadmap: "Roadmap",
      about: "About",
    },
    common: {
      markComplete: "Mark as Complete",
      completed: "Completed",
      previous: "Previous",
      next: "Next",
      search: "Search the Roadmap",
      switchLanguage: "Switch language",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      toggleTheme: "Toggle theme",
      copy: "Copy",
      copied: "Copied",
    },
  },
  tr: {
    nav: {
      roadmap: "Yol Haritası",
      about: "Hakkında",
    },
    common: {
      markComplete: "Tamamlandı Olarak İşaretle",
      completed: "Tamamlandı",
      previous: "Önceki",
      next: "Sonraki",
      search: "Yol Haritasında Ara",
      switchLanguage: "Dili değiştir",
      openNavigation: "Menüyü aç",
      closeNavigation: "Menüyü kapat",
      toggleTheme: "Temayı değiştir",
      copy: "Kopyala",
      copied: "Kopyalandı",
    },
  },
} as const;
