import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import styles from "../studio.module.css";
import { getAllStudioArticles, getStudioArticle } from "../../lib/studio-content";

const siteUrl = "https://mavendecoratives.com";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllStudioArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getStudioArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false, follow: false } };

  const canonicalUrl = `${siteUrl}/studio/${article.slug}`;
  const image = article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: canonicalUrl },
    authors: [{ name: article.author, url: siteUrl }],
    openGraph: {
      type: "article",
      url: canonicalUrl,
      siteName: "Maven Decoratives",
      locale: "en_IN",
      title: article.title,
      description: article.description,
      publishedTime: `${article.publishedAt}T00:00:00+05:30`,
      ...(article.updatedAt
        ? { modifiedTime: `${article.updatedAt}T00:00:00+05:30` }
        : {}),
      authors: [siteUrl],
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [image],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function StudioArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getStudioArticle(slug);
  if (!article) notFound();

  const canonicalUrl = `${siteUrl}/studio/${article.slug}`;
  const image = article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`;
  const { content } = await compileMDX({
    source: article.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: article.title,
    description: article.description,
    image: [image],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "en-IN",
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Maven Decoratives",
      url: siteUrl,
    },
    articleSection: article.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Maven Studio", item: `${siteUrl}/studio` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main-content">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/studio">Maven Studio</Link></li>
            <li aria-current="page">{article.title}</li>
          </ol>
        </nav>

        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>{article.category}</p>
          <h1>{article.title}</h1>
          <p className={styles.dek}>{article.description}</p>
          <p className={styles.articleMeta}>
            By {article.author} · Published {article.publishedAt}
            {article.updatedAt ? ` · Updated ${article.updatedAt}` : ""}
          </p>
        </header>

        <article className={styles.articleBody}>{content}</article>

        <footer className={styles.articleFooter}>
          <p>Working on a decorative lighting specification or project?</p>
          <p>
            <Link href="/#contact">Discuss a project with Maven Decoratives</Link>
          </p>
          <p><Link href="/studio">← Back to Maven Studio</Link></p>
        </footer>
      </main>
    </>
  );
}
