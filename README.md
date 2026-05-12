# Astro Blog Template

An opinionated [Astro](https://astro.build/) blog template tuned for **research-style writing**: MDX, KaTeX math, BibTeX citations, Mermaid diagrams, footnotes, code-copy buttons, dark mode, full-text browse, RSS, sitemap, an auto-generated `llms.txt`, and a built-in PDF/LaTeX/Word export pipeline.

This template is derived from the excellent [research-article-template](https://huggingface.co/spaces/tfrere/research-article-template) by Thibaud Frere. It has been generalized into a personal-blog scaffolding while keeping the original showcase article as a living reference for every component the template ships with.

---

## Features

- **Astro 4 + MDX** — write posts in Markdown or MDX, mix in components freely.
- **Math** — KaTeX rendering via `remark-math` + `rehype-katex`.
- **Citations** — `[@cite-key]` syntax resolved against a single `bibliography.bib`, with APA-style References rendered into the article footer.
- **Footnotes** — inline footnote support, also hoisted to the footer.
- **Mermaid** — fenced ` ```mermaid ` blocks rendered with auto light/dark theming.
- **Code blocks** — Shiki dual themes (`github-light` / `github-dark`) + copy button.
- **Components** — `Note`, `Quote`, `Image`, `Sidenote`, `Accordion`, `Glossary`, `Reference`, `Stack`, `HtmlEmbed`, `Wide`, `FullWidth`, `Algorithm`, and more.
- **Content bundles** — each post lives in its own folder with chapters and assets co-located.
- **Browse page** — instant client-side search, tag filter, category filter, and year archive.
- **SEO** — sitemap, RSS, OpenGraph, Twitter cards, JSON-LD `WebSite` schema, and an `/llms.txt` index.
- **Dark mode** — system-aware with a persistent toggle.
- **Export pipeline** — generate a print-quality PDF, a book-style PDF, screenshot every figure, or export LaTeX from the rendered HTML.
- **GitHub Pages** — a ready-to-go `.github/workflows/deploy.yml` builds and deploys on push to `main`.

---

## Quickstart

```bash
git clone <your fork of this template>
cd <your-blog>
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. Open the bundled demo article at `/blog/demo/` to see every component in action.

Common scripts:

| Command                 | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| `npm run dev`           | Start the dev server with hot reload                   |
| `npm run build`         | Produce a static build in `dist/`                      |
| `npm run preview`       | Preview the production build at `:8080`                |
| `npm run export:pdf`    | Render a print-quality PDF of an article               |
| `npm run export:latex`  | Convert the rendered HTML to a LaTeX bundle           |
| `npm run export:images` | Screenshot every chart and figure in an article        |
| `npm run notion:import` | Import a Notion page into a content bundle            |
| `npm run latex:convert` | Convert a LaTeX paper into an article bundle          |

Node **20+** is required.

---

## Make it yours (15-minute checklist)

1. **`src/consts.ts`** — set `SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_AUTHOR`, `SITE_SLOGAN`.
2. **`astro.config.mjs`** — update the `site:` field to your canonical production URL.
3. **`public/robots.txt`** — replace the example sitemap host with your URL.
4. **`public/avatar.svg`** — replace with your own avatar (any image format works; if you switch to JPG/PNG, also update the `<img src=…>` in `src/pages/index.astro`).
5. **`src/pages/about.astro`** — rewrite the About page with your bio and links.
6. **`src/data/site-news.ts`** — edit or empty the home-page news list.
7. **`public/favicon.svg`** / **`public/favicon.ico`** — drop in your own favicon.
8. **`src/content/demo/`** — explore the demo article, then delete the folder when you don't need it as a reference anymore.
9. (Optional) **GitHub Pages custom domain** — create `public/CNAME` containing `your.domain.com`.
10. (Optional) **Google Search Console** — set `SITE_GOOGLE_SITE_VERIFICATION` in `src/consts.ts` and add the HTML verification file to `public/`.

---

## Writing posts

Every article is a **folder** under `src/content/`. The folder name becomes the URL slug (`src/content/hello-world/` → `/blog/hello-world/`).

```
src/content/
  hello-world/
    article.mdx           ← the post itself (required)
    chapters/             ← optional sub-files for long posts
      part-1.mdx
      part-2.mdx
    assets/               ← optional post-local images, data, etc.
      hero.png
```

Inside `article.mdx`, the frontmatter looks like this:

```mdx
---
title: "Hello, world"
description: "My first post on this fresh template."
published: "2026-01-15"
category: "Notes"
tags:
  - astro
  - writing
authors:
  - name: "Your Name"
    url: "https://example.com"
showPdf: false
---

import Note from "../../components/Note.astro";

Welcome! This paragraph is **Markdown**. You can mix in components:

<Note variant="info" emoji="💡">
  Components are imported relative to `src/content/<slug>/`.
</Note>
```

See `src/content.config.ts` for the full frontmatter schema, and `src/content/demo/` for a worked example of every feature.

### Math

```mdx
Inline: $a^2 + b^2 = c^2$.

Block:

$$
\int_a^b f(x)\,dx = F(b) - F(a)
$$
```

### Citations

Add entries to `src/content/bibliography.bib`, then cite them inline:

```mdx
Transformers were introduced by [@vaswani2017attention].
Adam is the standard optimizer [@kingma2015adam].
```

The bibliography is rendered into the article footer automatically.

### Code blocks

````mdx
```python
def hello(name: str) -> str:
    return f"hello, {name}"
```
````

Each block gets a copy-to-clipboard button. Use ` ```mermaid ` for diagrams.

---

## Project layout

```
.
├── astro.config.mjs           # Integrations + markdown/remark/rehype pipeline
├── src/
│   ├── consts.ts              # Site-wide configuration
│   ├── content.config.ts      # Frontmatter schema
│   ├── content/
│   │   ├── bibliography.bib   # Shared BibTeX database
│   │   └── demo/              # Showcase article (delete when done)
│   ├── components/            # Astro components used by MDX articles
│   ├── layouts/               # Page shells (BaseLayout, ArticlePage, …)
│   ├── pages/
│   │   ├── index.astro        # Home page
│   │   ├── about.astro        # About page
│   │   ├── blog.astro         # Post index
│   │   ├── browse.astro       # Search / tags / categories / archive
│   │   ├── blog/[slug]/       # Dynamic post route
│   │   ├── rss.xml.js         # RSS feed
│   │   └── sitemap-index.xml.js
│   ├── styles/                # Global CSS (reset, layout, print, components)
│   ├── data/site-news.ts      # Home-page news list
│   └── utils/                 # Date/article/browse helpers
├── plugins/                   # Custom remark/rehype/astro plugins
├── scripts/                   # PDF export, LaTeX export, importers, etc.
├── public/                    # Static assets served as-is
└── .github/workflows/         # CI/CD (GitHub Pages deploy)
```

---

## Deploying

### GitHub Pages (default)

`.github/workflows/deploy.yml` is preconfigured. After pushing to `main`:

1. Repo Settings → **Pages** → set source to **GitHub Actions**.
2. (Optional custom domain) Add `public/CNAME` and configure DNS.
3. Set `SITE_URL` in `src/consts.ts` and `site:` in `astro.config.mjs` to match.

### Anywhere else

`npm run build` produces a static `dist/` folder. Drop it on Netlify, Vercel, Cloudflare Pages, S3, or any static host.

---

## Credits

- The article showcase, custom components, math/citation pipeline, and PDF export tooling come from Thibaud Frere's [research-article-template](https://huggingface.co/spaces/tfrere/research-article-template) — please ⭐ his repo if you find this useful.
- Built on top of [Astro](https://astro.build/), [MDX](https://mdxjs.com/), [KaTeX](https://katex.org/), [rehype-citation](https://github.com/timlrx/rehype-citation), [Mermaid](https://mermaid.js.org/), and [Shiki](https://shiki.matsu.io/).

## License

This template is licensed under the **Creative Commons Attribution 4.0 International License** (CC BY 4.0) — the same license as the upstream [research-article-template](https://huggingface.co/spaces/tfrere/research-article-template).

See [`LICENSE`](./LICENSE) for the full legal text and [`NOTICE`](./NOTICE) for the attribution chain and a list of modifications.

### What CC BY 4.0 means for you

You may freely **use, modify, fork, and redistribute** this template — including for commercial sites — as long as you:

1. **Give appropriate credit** to Thibaud Frere (the original creator) and to this template. The default `SiteFooter.astro` already includes a footer link satisfying this.
2. **Provide a link** to the CC BY 4.0 license.
3. **Indicate if you modified** the template. If you redistribute the source, keeping the `NOTICE` file is the easiest way to satisfy this.

You do **not** need to credit anyone in the articles you write yourself — those are your own work and can be licensed however you like. The attribution requirement applies only to the template scaffolding and any portion of the bundled demo article you republish.

> **Note for downstream users:** CC BY 4.0 §3(a)(4) lets you apply a separate "Adapter's License" to your own additions, as long as it does not restrict downstream recipients from exercising their CC BY 4.0 rights to the original material. If you fork this and want the new code under MIT/Apache/etc., that is permitted — but the original portions remain under CC BY 4.0 and the attribution requirement must be preserved.
