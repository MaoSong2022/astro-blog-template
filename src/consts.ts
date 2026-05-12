// Site-wide configuration. Edit these values to brand your blog.
// Every page reads from here, so a single change propagates everywhere
// (titles, OpenGraph, RSS feed, structured data, etc.).

/** Canonical production URL — used in canonical tags, RSS, sitemap, and OG metadata. */
export const SITE_URL = "https://example.com";

/** Short site title — shown in the header, browser tab, and structured data. */
export const SITE_TITLE = "My Blog";

/** Long-form description — used as the default meta description and on the home page. */
export const SITE_DESCRIPTION =
  "A personal blog template powered by Astro — notes, tutorials, and long-form writing on whatever you care about.";

/** Public-facing author name. Used in OG metadata, RSS, and the JSON-LD WebSite block. */
export const SITE_AUTHOR = "Your Name";

/** Author URL (homepage, GitHub, ORCID, etc.). Defaults to the site itself. */
export const SITE_AUTHOR_URL = SITE_URL;

/**
 * Google Search Console verification token.
 * Leave the empty string to skip the meta tag; replace with the token Google gives you.
 */
export const SITE_GOOGLE_SITE_VERIFICATION = "";

/** Default social/OG share image. Should live in /public. */
export const SITE_SOCIAL_IMAGE = "/avatar.svg";

/** Footer license string. Adjust to match your chosen license. */
export const SITE_LICENSE = "Licensed under CC BY-NC-SA 4.0";

/** Short tagline shown on the home page under your avatar. */
export const SITE_SLOGAN = "Thinking out loud, one post at a time.";
