"use client";

import { useEffect } from "react";
import type { Locale } from "@/types";

export function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
