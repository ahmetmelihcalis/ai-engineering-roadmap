"use client";

import { slugify } from "@/lib/format";
import { useEffect, useState } from "react";

export function Sidebar({ label, sections }: { label: string; sections: string[] }) {
  const [activeSection, setActiveSection] = useState(sections[0] ?? "");

  useEffect(() => {
    const observedSections = sections
      .map((section) => document.getElementById(slugify(section)))
      .filter((section): section is HTMLElement => section !== null);

    if (observedSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.textContent ?? "");
        }
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: 0 },
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border-[1.5px] border-border bg-panel p-4">
        <div className="mb-4 border-b border-border pb-3">
          <p className="text-sm font-semibold text-accent-strong dark:text-accent">
            {label}
          </p>
        </div>
        <nav className="grid gap-1.5">
          {sections.map((section) => (
            <a
              aria-current={activeSection === section ? "location" : undefined}
              className={`sidebar-link ${activeSection === section ? "sidebar-link-active" : ""}`}
              href={`#${slugify(section)}`}
              key={section}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
