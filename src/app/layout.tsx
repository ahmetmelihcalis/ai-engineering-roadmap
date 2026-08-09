import type { Metadata } from "next";
import { DM_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "AI Engineering Roadmap",
  title: {
    default: "AI Engineering Roadmap",
    template: "%s | AI Engineering Roadmap",
  },
  description:
    "A static, bilingual learning roadmap for AI engineering, machine learning systems, and applied deployment skills.",
  icons: {
    icon: "/icon.svg?v=6",
    shortcut: "/icon.svg?v=6",
  },
  openGraph: {
    title: "AI Engineering Roadmap",
    description:
      "A static, bilingual learning roadmap for AI engineering, machine learning systems, and applied deployment skills.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${sourceSans.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  );
}
