import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { Navbar } from "@/components/layout/Navbar";
import { isValidLocale } from "@/lib/i18n";
import { locales } from "@/types";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LocaleDocument locale={lang} />
      <Navbar locale={lang} />
      <div className="flex-1">{children}</div>
      <Footer locale={lang} />
    </div>
  );
}
