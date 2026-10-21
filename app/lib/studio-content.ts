import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "studio");

export type StudioArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  image: string;
  draft?: boolean;
};

export type StudioArticleWithContent = StudioArticle & {
  content: string;
};

function readMetadata(fileName: string, raw: string): StudioArticle {
  const { data } = matter(raw);
  const slug = path.basename(fileName, ".mdx");

  const required = ["title", "description", "publishedAt"] as const;
  for (const field of required) {
    if (typeof data[field] !== "string" || !data[field].trim()) {
      throw new Error(
        `Missing or invalid '${field}' in content/studio/${fileName}`,
      );
    }
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    publishedAt: data.publishedAt,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    author: typeof data.author === "string" ? data.author : "Maven Decoratives",
    category: typeof data.category === "string" && data.category.trim() ? data.category.trim() : "Technical Notes",
    image: typeof data.image === "string" ? data.image : "/images/hero-chandelier.png",
    draft: data.draft === true,
  };
}

export async function getAllStudioArticles(): Promise<StudioArticle[]> {
  const files = (await fs.readdir(CONTENT_DIR)).filter((file) => file.endsWith(".mdx"));
  const articles = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
      return readMetadata(file, raw);
    }),
  );

  return articles
    .filter((article) => !article.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getStudioArticle(
  slug: string,
): Promise<StudioArticleWithContent | null> {
  // Only accept a safe slug made of lowercase letters, digits and hyphens.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  const fileName = `${slug}.mdx`;
  let raw: string;
  try {
    raw = await fs.readFile(path.join(CONTENT_DIR, fileName), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }

  const parsed = matter(raw);
  const article = readMetadata(fileName, raw);
  if (article.draft) return null;

  return { ...article, content: parsed.content };
}
