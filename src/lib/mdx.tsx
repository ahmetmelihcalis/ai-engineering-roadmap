import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeBlock } from "@/components/roadmap/CodeBlock";
import { NeuralNetworkDiagram } from "@/components/roadmap/NeuralNetworkDiagram";
import { dictionaries } from "@/lib/i18n";
import { slugify } from "@/lib/format";
import { roadmapSlugs } from "@/lib/roadmap-data";
import { Locale, locales, RoadmapFrontmatter, RoadmapModule } from "@/types";

const contentRoot = path.join(process.cwd(), "src", "content");

function roadmapDir(locale: Locale) {
  return path.join(contentRoot, locale, "roadmap");
}

function roadmapFile(locale: Locale, slug: string) {
  return path.join(roadmapDir(locale), `${slug}.mdx`);
}

function readRoadmapSource(locale: Locale, slug: string) {
  return fs.readFileSync(roadmapFile(locale, slug), "utf8");
}

export function getRoadmapHeadings(locale: Locale, slug: string) {
  const source = readRoadmapSource(locale, slug);
  return [...source.matchAll(/^## (?!#)(.+?)\s*$/gm)].map((match) => match[1]);
}

function assertFrontmatter(data: Record<string, unknown>): RoadmapFrontmatter {
  return data as RoadmapFrontmatter;
}

function sortByRoadmapOrder(locale: Locale, a: string, b: string) {
  const order = roadmapSlugs[locale] as readonly string[];
  const left = order.indexOf(a);
  const right = order.indexOf(b);
  return left - right;
}

type HastNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function textFromNode(node: HastNode | undefined): string {
  if (!node) {
    return "";
  }

  if (node.type === "text") {
    return node.value ?? "";
  }

  return (node.children ?? []).map(textFromNode).join("");
}

function rehypeLeadLabels() {
  return function transform(tree: HastNode) {
    function visit(node: HastNode | undefined) {
      if (!node) {
        return;
      }

      if (node.tagName === "p") {
        const text = textFromNode(node).trim();
        const isLeadLabel =
          text.endsWith(":") &&
          text.length <= 90 &&
          !text.includes(". ") &&
          !text.includes("?") &&
          !text.includes("!");

        if (isLeadLabel) {
          const current = node.properties?.className;
          const classNames = Array.isArray(current)
            ? current.filter((value): value is string => typeof value === "string")
            : typeof current === "string"
              ? current.split(" ").filter(Boolean)
              : [];

          node.properties = {
            ...node.properties,
            className: [...new Set([...classNames, "lead-label"])],
          };
        }
      }

      for (const child of node.children ?? []) {
        visit(child);
      }
    }

    visit(tree);
  };
}

export function getRoadmapSlugs(locale: Locale) {
  return fs
    .readdirSync(roadmapDir(locale))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort((a, b) => sortByRoadmapOrder(locale, a, b));
}

export function getAllRoadmaps(locale: Locale): RoadmapModule[] {
  return getRoadmapSlugs(locale)
    .map((slug) => {
      const source = readRoadmapSource(locale, slug);
      const parsed = matter(source);
      return {
        ...assertFrontmatter(parsed.data),
        locale,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getRoadmapBySlug(locale: Locale, slug: string) {
  const source = readRoadmapSource(locale, slug);
  const { content, frontmatter } = await compileMDX<RoadmapFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeLeadLabels,
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
            },
          ],
        ],
      },
    },
    components: {
      pre: (props) => (
        <CodeBlock
          {...props}
          copiedLabel={dictionaries[locale].common.copied}
          copyLabel={dictionaries[locale].common.copy}
        />
      ),
      NeuralNetworkDiagram: () => <NeuralNetworkDiagram locale={locale} />,
      h2: ({ children }) => (
        <h2 id={slugify(String(children))} className="scroll-mt-28">
          {children}
        </h2>
      ),
      h3: ({ children }) => {
        const title = String(children);
        const isRagEvaluationHeading =
          title === "RAG Değerlendirmesi ve Hata Analizi" ||
          title === "RAG Hatasını Aşamalara Ayırma" ||
          title === "RAG Evaluation and Error Analysis" ||
          title === "Separating a RAG Error into Stages";

        return (
          <h3 className={isRagEvaluationHeading ? "heading-no-divider" : undefined}>
            {children}
          </h3>
        );
      },
      table: ({ children, ...props }) => (
        <div className="roadmap-table-wrap">
          <table {...props} className="roadmap-table">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }) => <thead className="roadmap-table-head">{children}</thead>,
      tbody: ({ children }) => <tbody className="roadmap-table-body">{children}</tbody>,
      tr: ({ children }) => <tr className="roadmap-table-row">{children}</tr>,
      th: ({ children }) => <th className="roadmap-table-heading">{children}</th>,
      td: ({ children, ...props }) => (
        <td {...props} className="roadmap-table-cell">
          {children}
        </td>
      ),
    },
  });

  return {
    content,
    frontmatter,
  };
}

export function getRoadmapStaticParams() {
  return locales.flatMap((lang) =>
    getRoadmapSlugs(lang).map((slug) => ({
      lang,
      slug,
    })),
  );
}
