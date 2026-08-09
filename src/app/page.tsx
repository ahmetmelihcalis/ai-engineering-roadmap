"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function getPreferredLocale() {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith("tr")) ? "tr" : "en";
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${getPreferredLocale()}/`);
  }, [router]);

  return null;
}
