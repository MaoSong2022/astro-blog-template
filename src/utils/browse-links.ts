/** Query-string helpers for the /browse filters page. */

export function browseCategoryHref(category: string): string {
  return `/browse?category=${encodeURIComponent(category)}`;
}

/** One tag; repeat param for AND: `?tag=a&tag=b` via multiple calls merged in URLSearchParams. */
export function browseTagHref(tag: string): string {
  return `/browse?tag=${encodeURIComponent(tag)}`;
}
