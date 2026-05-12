// Content collection schema for the blog template.
//
// This template uses a "content bundle" layout:
//   src/content/<slug>/article.{md,mdx}   ← the post
//   src/content/<slug>/chapters/*.mdx     ← optional sub-chapters
//   src/content/<slug>/assets/...         ← post-local assets
//
// Posts are discovered automatically by `src/pages/blog/[slug]/index.astro`
// (and listed on the home/blog/browse pages) via `import.meta.glob`, which
// does not require a typed content collection. We keep this file mostly as
// documentation; you can opt-in to typed frontmatter via `astro:content`.

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ base: "./src/content", pattern: "*/article.{md,mdx}" }),
  schema: () =>
    z
      .object({
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        published: z.string().optional(),
        modified: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        authors: z.array(z.any()).optional(),
        affiliations: z.array(z.any()).optional(),
        doi: z.string().optional(),
        licence: z.string().optional(),
        tableOfContentsAutoCollapse: z.boolean().optional(),
        pdfProOnly: z.boolean().optional(),
        showPdf: z.boolean().optional(),
        seoThumbImage: z.string().optional(),
      })
      .passthrough(),
});

export const collections = { articles };
