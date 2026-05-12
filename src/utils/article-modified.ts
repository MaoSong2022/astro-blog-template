import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "src", "content");
const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);

function hasMarkdownExtension(filename: string): boolean {
  const dot = filename.lastIndexOf(".");
  if (dot < 0) return false;
  return MARKDOWN_EXTENSIONS.has(filename.slice(dot));
}

async function readMarkdownFilesRecursive(dirPath: string): Promise<string[]> {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await readMarkdownFilesRecursive(fullPath)));
        continue;
      }
      if (entry.isFile() && hasMarkdownExtension(entry.name)) {
        files.push(fullPath);
      }
    }
    return files;
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code?: unknown }).code)
        : "";
    if (code === "ENOENT") return [];
    throw error;
  }
}

async function latestMtimeMs(paths: string[]): Promise<number | undefined> {
  let latest: number | undefined = undefined;
  for (const filePath of paths) {
    try {
      const metadata = await stat(filePath);
      if (latest == null || metadata.mtimeMs > latest) latest = metadata.mtimeMs;
    } catch (error) {
      const code =
        error && typeof error === "object" && "code" in error
          ? String((error as { code?: unknown }).code)
          : "";
      if (code !== "ENOENT") throw error;
    }
  }
  return latest;
}

export async function getArticleBundleLastModifiedIso(
  slug: string,
): Promise<string | undefined> {
  if (!slug) return undefined;
  const bundleRoot = join(CONTENT_ROOT, slug);
  const articleCandidates = [
    join(bundleRoot, "article.md"),
    join(bundleRoot, "article.mdx"),
  ];
  const chapterFiles = await readMarkdownFilesRecursive(
    join(bundleRoot, "chapters"),
  );
  const latest = await latestMtimeMs([...articleCandidates, ...chapterFiles]);
  return latest == null ? undefined : new Date(latest).toISOString();
}

export async function getAllArticleBundleLastModifiedIso(): Promise<
  Record<string, string>
> {
  const out: Record<string, string> = {};
  const entries = await readdir(CONTENT_ROOT, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const iso = await getArticleBundleLastModifiedIso(entry.name);
        if (iso) out[entry.name] = iso;
      }),
  );

  return out;
}
