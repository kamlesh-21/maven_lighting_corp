import type { MetadataRoute } from "next";
import { getAllStudioArticles } from "./lib/studio-content";

const baseUrl = "https://mavendecoratives.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllStudioArticles();

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/studio`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Temporary entry for the existing static article route. Remove this once
    // that article has been migrated into content/studio as a published MDX file.
    {
      url: `${baseUrl}/studio/brass-vs-kansa-interior-design`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/studio/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
