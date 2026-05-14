import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
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
  const allFiles = [...articleCandidates, ...chapterFiles].filter((p) =>
    existsSync(p),
  );
  if (allFiles.length === 0) return undefined;
  try {
    const output = execSync(
      `git log -1 --format=%cI -- ${allFiles.map((p) => `"${p}"`).join(" ")}`,
      {
        encoding: "utf-8",
        timeout: 10000,
        stdio: ["pipe", "pipe", "ignore"],
      },
    ).trim();
    return output || undefined;
  } catch {
    return undefined;
  }
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
