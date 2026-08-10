<div align="center">

# AI Engineering Roadmap

A bilingual, self-guided roadmap from Python and data foundations to LLM systems and deployment.

[aiengineeringroadmap.com](https://aiengineeringroadmap.com)

[English](#english) · [Türkçe](#türkçe)

</div>

---

## English

As a software engineering student, I created this roadmap by bringing together my notes from the path to becoming an AI engineer, the concepts I want to revisit, the code I have tried, and the resources I found useful.

If you would like to contribute, you can star the project on GitHub or open a Pull Request.

### Study Notes

| # | Module | Read on GitHub |
| --- | --- | --- |
| 01 | Python for AI & Clean Code | [Open Note](./src/content/en/roadmap/python-for-ai.mdx) |
| 02 | SQL & Database Fundamentals | [Open Note](./src/content/en/roadmap/sql-and-database-architecture.mdx) |
| 03 | Data Analysis & EDA | [Open Note](./src/content/en/roadmap/exploratory-data-analysis.mdx) |
| 04 | Math, Linear Algebra & Statistics | [Open Note](./src/content/en/roadmap/mathematics-linear-algebra-and-statistics.mdx) |
| 05 | Machine Learning | [Open Note](./src/content/en/roadmap/machine-learning.mdx) |
| 06 | Deep Learning | [Open Note](./src/content/en/roadmap/deep-learning.mdx) |
| 07 | Computer Vision Side Quest | [Open Note](./src/content/en/roadmap/a-short-introduction-to-computer-vision.mdx) |
| 08 | NLP | [Open Note](./src/content/en/roadmap/natural-language-processing.mdx) |
| 09 | Generative AI & LLM | [Open Note](./src/content/en/roadmap/generative-ai-and-large-language-models.mdx) |
| 10 | RAG & Agentic Systems | [Open Note](./src/content/en/roadmap/rag-and-agentic-systems.mdx) |
| 11 | Fine-Tuning & Optimization | [Open Note](./src/content/en/roadmap/fine-tuning-and-optimization.mdx) |
| 12 | MLOps & Deployment | [Open Note](./src/content/en/roadmap/mlops-llmops-and-deployment.mdx) |

### Project Structure

- Application: A static roadmap site built with Next.js App Router, TypeScript, and Tailwind CSS.
- Content: Notes are stored in MDX files; code blocks, tables, and visuals are presented in a more readable format on the site.
- Languages: Turkish and English notes follow the same module order; URLs are based on the titles in each language.

```txt
src/content/en/roadmap  # English notes
src/content/tr/roadmap  # Turkish notes
```

### Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### License

This project is licensed under the [MIT License](./LICENSE).

---

## Türkçe

Bir yazılım mühendisliği öğrencisi olarak, yapay zeka mühendisi olma yolunda aldığım notlarımı, tekrar göz atmak istediğim kavramları, denediğim kodları ve faydalı bulduğum kaynakları bir araya getirerek bu yol haritasını oluşturdum.

Katkıda bulunmak isterseniz projeye GitHub üzerinden yıldız verebilir veya Pull Request açabilirsiniz.

### Çalışma Notları

| # | Modül | GitHub'da Oku |
| --- | --- | --- |
| 01 | AI için Python | [Notu Aç](./src/content/tr/roadmap/ai-icin-python.mdx) |
| 02 | SQL ve Veritabanı Temelleri | [Notu Aç](./src/content/tr/roadmap/sql-ve-veritabani-mimarisi.mdx) |
| 03 | Keşifsel Veri Analizi (EDA) | [Notu Aç](./src/content/tr/roadmap/kesifsel-veri-analizi.mdx) |
| 04 | Matematik, Lineer Cebir ve İstatistik | [Notu Aç](./src/content/tr/roadmap/matematik-lineer-cebir-ve-istatistik.mdx) |
| 05 | Makine Öğrenmesi | [Notu Aç](./src/content/tr/roadmap/makine-ogrenmesi.mdx) |
| 06 | Derin Öğrenme | [Notu Aç](./src/content/tr/roadmap/derin-ogrenme.mdx) |
| 07 | Bilgisayarlı Görüye Kısa Bir Giriş | [Notu Aç](./src/content/tr/roadmap/bilgisayarli-goruye-kisa-bir-giris.mdx) |
| 08 | Doğal Dil İşleme (NLP) | [Notu Aç](./src/content/tr/roadmap/dogal-dil-isleme.mdx) |
| 09 | Üretken Yapay Zeka ve Büyük Dil Modelleri | [Notu Aç](./src/content/tr/roadmap/uretken-yapay-zeka-ve-buyuk-dil-modelleri.mdx) |
| 10 | RAG ve Ajan Tabanlı Sistemler | [Notu Aç](./src/content/tr/roadmap/rag-ve-ajan-tabanli-sistemler.mdx) |
| 11 | Fine-Tuning ve Optimizasyon | [Notu Aç](./src/content/tr/roadmap/fine-tuning-ve-optimizasyon.mdx) |
| 12 | MLOps, LLMOps ve Deployment | [Notu Aç](./src/content/tr/roadmap/mlops-llmops-ve-deployment.mdx) |

### Proje Yapısı

- Uygulama: Next.js App Router, TypeScript ve Tailwind CSS ile geliştirilmiş statik bir yol haritası sitesidir.
- İçerik: Notlar MDX dosyalarında tutulur; kod blokları, tablolar ve görseller site içinde daha okunaklı sunulur.
- Dil: Türkçe ve İngilizce notlar aynı modül sırasını izler; URL'ler her dilin kendi başlıklarına göre oluşturulur.

```txt
src/content/en/roadmap  # İngilizce notlar
src/content/tr/roadmap  # Türkçe notlar
```

### Yerelde Çalıştırma

```bash
npm install
npm run dev
```

Ardından `http://localhost:3000` adresini açın.

### Lisans

Bu proje [MIT Lisansı](./LICENSE) ile lisanslanmıştır.
