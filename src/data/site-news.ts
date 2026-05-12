export type SiteNewsItem = {
  /** Shown as a short date line (e.g. ISO date like `2026-01-15` or a label like `Jan 2026`). */
  date: string;
  /** Headline shown in the list. */
  title: string;
  /** Optional one-line blurb under the title. */
  summary?: string;
  /** Optional link target when the headline should be clickable (site path or full URL). */
  href?: string;
};

/**
 * News items shown on the home page.
 *
 * - Newest items go first; the list is also re-sorted by date at render time.
 * - Use ISO dates when possible — they render nicely and are sortable.
 * - Set the array to `[]` to hide the entire news section.
 *
 * Edit (or delete) the example entries below to make this your own.
 */
export const SITE_NEWS: SiteNewsItem[] = [
  {
    date: "2026-01-01",
    title: "Hello, world!",
    summary:
      "Your blog is up and running. Edit `src/data/site-news.ts` to update this section, or set the array to `[]` to hide it entirely.",
    href: "/blog",
  },
];
