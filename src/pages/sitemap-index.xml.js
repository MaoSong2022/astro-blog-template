import { getAllArticleBundleLastModifiedIso } from "../utils/article-modified";
import { parseArticleGlob } from "../utils/site-articles";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(context) {
  const site = new URL(context.site);
  const articleGlob = import.meta.glob("../content/*/article.{md,mdx}", {
    eager: true,
  });
  const modifiedBySlug = await getAllArticleBundleLastModifiedIso();
  const articles = await parseArticleGlob(articleGlob, modifiedBySlug);

  const pages = [
    { path: "/", lastmod: undefined },
    { path: "/blog", lastmod: undefined },
    { path: "/browse", lastmod: undefined },
    { path: "/about", lastmod: undefined },
    { path: "/rss.xml", lastmod: undefined },
  ];

  for (const article of articles) {
    pages.push({
      path: article.url,
      lastmod: article.modified ?? article.published,
    });
  }

  const body = pages
    .map(({ path, lastmod }) => {
      const loc = new URL(path, site).toString();
      const lastmodTag = lastmod
        ? `\n    <lastmod>${escapeXml(new Date(lastmod).toISOString())}</lastmod>`
        : "";
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmodTag}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
