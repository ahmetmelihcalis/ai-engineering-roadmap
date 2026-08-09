import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const locales = ["en", "tr"];
const excludedDirs = new Set([".git", ".next", "node_modules", "out"]);
const emojiPattern = /\p{Extended_Pictographic}/u;

function readSlugs(locale) {
  const dir = path.join(root, "src", "content", locale, "roadmap");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (excludedDirs.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const [enSlugs, trSlugs] = locales.map(readSlugs);

if (enSlugs.length !== trSlugs.length) {
  console.error("Roadmap module count differs between en and tr.");
  console.error("en:", enSlugs.length);
  console.error("tr:", trSlugs.length);
  process.exit(1);
}

const roadmapPairs = [
  ["ai-icin-python", "python-for-ai"],
  ["sql-ve-veritabani-mimarisi", "sql-and-database-architecture"],
  ["kesifsel-veri-analizi", "exploratory-data-analysis"],
  ["matematik-lineer-cebir-ve-istatistik", "mathematics-linear-algebra-and-statistics"],
  ["makine-ogrenmesi", "machine-learning"],
  ["derin-ogrenme", "deep-learning"],
  ["bilgisayarli-goruye-kisa-bir-giris", "a-short-introduction-to-computer-vision"],
  ["dogal-dil-isleme", "natural-language-processing"],
  ["uretken-yapay-zeka-ve-buyuk-dil-modelleri", "generative-ai-and-large-language-models"],
  ["rag-ve-ajan-tabanli-sistemler", "rag-and-agentic-systems"],
  ["fine-tuning-ve-optimizasyon", "fine-tuning-and-optimization"],
  ["mlops-llmops-ve-deployment", "mlops-llmops-and-deployment"],
];

function moduleShape(relativePath) {
  const content = fs.readFileSync(path.join(root, relativePath), "utf8");
  const headings = [...content.matchAll(/^(#{2,3})\s+.+$/gm)].map((match) => match[1].length);
  const codeBlocks = [...content.matchAll(/^```[A-Za-z0-9_-]+/gm)].length;
  const components = [...content.matchAll(/<([A-Z][A-Za-z0-9]*)\b[^>]*\/>/g)].map((match) => match[1]);
  const tags = content.match(/^tags:\s*\[(.*)\]$/m)?.[1].split(",").filter(Boolean).length ?? 0;
  const order = content.match(/^order:\s*(\d+)$/m)?.[1];
  return { headings, codeBlocks, components, tags, order };
}

function hasMalformedAtxHeading(content) {
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");
  return /^(#{1,6})(?!#)(?!\s|$)/m.test(contentWithoutCodeBlocks);
}

for (const [trSlug, enSlug] of roadmapPairs) {
  const trPath = path.join("src", "content", "tr", "roadmap", `${trSlug}.mdx`);
  const enPath = path.join("src", "content", "en", "roadmap", `${enSlug}.mdx`);
  const trShape = moduleShape(trPath);
  const enShape = moduleShape(enPath);
  for (const relativePath of [trPath, enPath]) {
    const content = fs.readFileSync(path.join(root, relativePath), "utf8");
    if (hasMalformedAtxHeading(content)) {
      console.error(`Malformed ATX heading in ${relativePath}: add a space after the # characters.`);
      process.exit(1);
    }
  }
  for (const field of ["headings", "codeBlocks", "components", "tags", "order"]) {
    if (JSON.stringify(trShape[field]) !== JSON.stringify(enShape[field])) {
      console.error(`Content structure differs for ${trSlug} / ${enSlug}: ${field}`);
      process.exit(1);
    }
  }
}

for (const file of walk(root)) {
  const relative = path.relative(root, file);
  const allowedExtensions = [".ts", ".tsx", ".js", ".mjs", ".md", ".mdx", ".json"];
  if (!allowedExtensions.includes(path.extname(file))) {
    continue;
  }
  const content = fs.readFileSync(file, "utf8");
  if (emojiPattern.test(content)) {
    console.error(`Emoji-like pictographic symbol found in ${relative}`);
    process.exit(1);
  }
}

const requiredTurkishCoverage = {
  "derin-ogrenme.mdx": {
    terms: [
      "RNN",
      "GRU",
      "LSTM",
      "Transformer Mimarisi",
      "### RNN, GRU ve LSTM ile Dizi Modeli",
      "Attention Mask",
    ],
    orderedHeadings: [
      "### RNN, GRU ve LSTM",
      "### Attention ve Transformer Mimarisi",
    ],
  },
  "dogal-dil-isleme.mdx": {
    terms: [
      "Veri temizleme",
      "Tokenization",
      "stemming",
      "lemmatization",
      "Stopword",
      "Bag of Words",
      "TF-IDF",
      "N-gram",
      "Word2Vec",
      "Word embedding",
      "Text classification",
      "Named Entity Recognition",
      "Morfolojik analiz",
      "Part-of-Speech Tagging",
      "Word Sense Disambiguation",
      "Sentiment Analysis",
      "Öneri sistemleri",
      "### Python ile Tokenization, Stemming, Morfoloji, POS ve NER",
      "### Python ile Word Sense Disambiguation (WSD) için Başlangıç Modeli",
      "### Python ile Duygu Analizi",
      "### Python ile Metin Tabanlı Öneri",
    ],
    orderedHeadings: [
      "### Doğal Dil İşleme Temelleri",
      "### Metin Ön İşleme",
      "### Metin Temsili",
      "### Derin Öğrenme Tabanlı Dil Modelleri",
      "### Temel NLP Görevleri",
    ],
  },
  "uretken-yapay-zeka-ve-buyuk-dil-modelleri.mdx": {
    terms: [
      "Transformer",
      "pretraining",
      "Tokenization",
      "Inference",
      "Halüsinasyon",
      "Fine-tuning",
      "Özellikleri",
      "Ölçekleme Yasaları",
      "olasılık dağılımı",
      "API Entegrasyonu",
      "Kendi LLM'ini sıfırdan eğitmek",
      "Büyük Dil Modellerinde Tool Kullanımı",
      "Prompt Engineering",
      "Context Window",
      "Hugging Face Transformers",
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "LlamaIndex",
      "Colab",
      "LLMOps",
      "Quantization",
    ],
    orderedHeadings: [
      "### Büyük Dil Modellerine Genel Bakış",
      "### Büyük Dil Modellerinin Çalışma Prensibi",
      "### Büyük Dil Modellerine Başlamak",
      "### Yapay Zeka Alanları",
      "### Model Seçimi ve Geliştirme Ekosistemi",
    ],
  },
  "rag-ve-ajan-tabanli-sistemler.mdx": {
    terms: [
      "RAG Entegrasyonu",
      "Ajan Akışları ve Tool Seçimi",
      "Tool Yetkileri ve Güvenlik Sınırları",
      "Ajanlarda Bellek Yönetimi",
      "Ajan Değerlendirmesi",
      "Model Context Protocol",
      "MCP",
      "Ajan Ekosistemi ve Multi-Agent Sistemler",
      "LangChain",
      "LlamaIndex",
    ],
    orderedHeadings: [
      "### RAG Entegrasyonu",
      "### Ajan Akışları ve Tool Seçimi",
      "### Tool Yetkileri ve Güvenlik Sınırları",
      "### Ajanlarda Bellek Yönetimi",
      "### MCP ile Tool ve Kaynak Bağlantısı",
      "### Ajan Ekosistemi ve Multi-Agent Sistemler",
    ],
  },
};

const turkishRoadmapDir = path.join(root, "src", "content", "tr", "roadmap");

for (const [fileName, coverage] of Object.entries(requiredTurkishCoverage)) {
  const filePath = path.join(turkishRoadmapDir, fileName);
  const content = fs.readFileSync(filePath, "utf8");
  const normalizedContent = content.toLocaleLowerCase("tr-TR");

  for (const term of coverage.terms) {
    if (!normalizedContent.includes(term.toLocaleLowerCase("tr-TR"))) {
      console.error(`Required roadmap topic missing from ${fileName}: ${term}`);
      process.exit(1);
    }
  }

  let previousIndex = -1;
  for (const heading of coverage.orderedHeadings) {
    const headingIndex = content.indexOf(heading);
    if (headingIndex <= previousIndex) {
      console.error(`Roadmap topic order failed in ${fileName}: ${heading}`);
      process.exit(1);
    }
    previousIndex = headingIndex;
  }
}

const roadmapData = fs.readFileSync(
  path.join(root, "src", "lib", "roadmap-data.ts"),
  "utf8",
);
const requiredModuleOrder = [
  '"derin-ogrenme"',
  '"dogal-dil-isleme"',
  '"uretken-yapay-zeka-ve-buyuk-dil-modelleri"',
  '"rag-ve-ajan-tabanli-sistemler"',
];
let previousModuleIndex = -1;
for (const slug of requiredModuleOrder) {
  const moduleIndex = roadmapData.indexOf(slug);
  if (moduleIndex <= previousModuleIndex) {
    console.error(`Roadmap module order failed at ${slug}`);
    process.exit(1);
  }
  previousModuleIndex = moduleIndex;
}

console.log("Content checks passed.");
