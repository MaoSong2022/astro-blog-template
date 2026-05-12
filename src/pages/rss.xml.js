import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { parseArticleGlob } from "../utils/site-articles";
import { getAllArticleBundleLastModifiedIso } from "../utils/article-modified";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(context) {
  const articleGlob = import.meta.glob("../content/*/article.{md,mdx}", {
    eager: true,
  });
  const modifiedBySlug = await getAllArticleBundleLastModifiedIso();
  const posts = await parseArticleGlob(articleGlob, modifiedBySlug);

  const site = new URL(context.site);
  const items = posts
    .map((post) => {
      const publishedMs = Date.parse(post.modified ?? post.published ?? "");
      const pubDate = Number.isNaN(publishedMs)
        ? undefined
        : new Date(publishedMs).toUTCString();
      const link = new URL(post.url, site).toString();
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${escapeXml(link)}</link>
  <guid>${escapeXml(link)}</guid>
  ${
    post.description
      ? `<description>${escapeXml(post.description)}</description>`
      : ""
  }
  ${pubDate ? `<pubDate>${escapeXml(pubDate)}</pubDate>` : ""}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(SITE_TITLE)}</title>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <link>${escapeXml(site.toString())}</link>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
