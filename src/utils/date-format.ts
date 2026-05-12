const DISPLAY_TIMEZONE = "Asia/Shanghai";

function parseDateInput(value: string | Date): Date | undefined {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

export function formatDisplayDate(
  value: string | Date | undefined,
): string | undefined {
  if (!value) return undefined;
  const date = parseDateInput(value);
  if (!date) return undefined;

  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: DISPLAY_TIMEZONE,
  });
  const day = date.toLocaleString("en-US", {
    day: "2-digit",
    timeZone: DISPLAY_TIMEZONE,
  });
  const year = date.toLocaleString("en-US", {
    year: "numeric",
    timeZone: DISPLAY_TIMEZONE,
  });
  return `${month}, ${day}, ${year}`;
}
