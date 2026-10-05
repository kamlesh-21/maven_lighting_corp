//maven_lighting_corp/app/lib/sitemap.ts

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mavendecoratives.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}