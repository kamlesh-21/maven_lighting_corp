import type { Metadata } from "next";
import Link from "next/link";
import styles from "./studio.module.css";
import { getAllStudioArticles } from "../lib/studio-content";

const siteUrl = "https://mavendecoratives.com";
const studioUrl = `${siteUrl}/studio`;

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Maven Studio | Materials, Manufacturing & Design",
  description:
    "Explore the science of materials, metal finishes, manufacturing processes and engineering behind decorative objects and lighting.",
  alternates: { canonical: studioUrl },
  openGraph: {
    type: "website",
    url: studioUrl,
    siteName: "Maven Decoratives",
    locale: "en_IN",
    title: "Maven Studio | Materials, Manufacturing & Design",
    description:
      "Technical explorations of materials, finishes, fabrication and the engineering of decorative objects.",
    images: ["/images/hero-chandelier.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maven Studio | Materials, Manufacturing & Design",
    description:
      "Technical explorations of materials, finishes, fabrication and the engineering of decorative objects.",
    images: ["/images/hero-chandelier.png"],
  },
  robots: { index: true, follow: true },
};

const categoryConfig = [
  {
    name: "Materials & Metals",
    description:
      "The composition, properties and behaviour of metals used in decorative objects.",
  },
  {
    name: "Manufacturing & Foundry",
    description:
      "How materials become finished components through casting, forming, machining and assembly.",
  },
  {
    name: "Surface Engineering",
    description:
      "The science of coatings, decorative finishes, corrosion, patina and long-term appearance.",
  },
  {
    name: "Engineering & Lighting",
    description:
      "Geometry, weight, structural considerations and the technical principles behind lighting objects.",
  },
  {
    name: "Research & Emerging Technology",
    description:
      "Evidence-based explorations of testing, material innovation and new manufacturing technologies.",
  },
  {
    name: "Design Translation",
    description:
      "The journey from a design concept to a manufacturable, installable and maintainable object.",
  },
];

function categoryId(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function StudioIndexPage() {
  const articles = await getAllStudioArticles();

  const knownNames = categoryConfig.map((category) => category.name);
  const publishedNames = new Set(
    articles.map((article) => article.category.trim()),
  );

  // Known categories follow the editorial order above.
  // New categories are discovered automatically and added alphabetically.
  const categories = [
    ...categoryConfig.filter((category) =>
      publishedNames.has(category.name),
    ),
    ...[...publishedNames]
      .filter((name) => !knownNames.includes(name))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        name,
        description:
          "Technical explorations connecting materials, manufacturing and design.",
      })),
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${studioUrl}#webpage`,
    url: studioUrl,
    name: "Maven Studio",
    description:
      "Technical explorations of materials, surface engineering, manufacturing and decorative design.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${studioUrl}/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main id="main-content">
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            MAVEN STUDIO · TECHNICAL JOURNAL
          </p>

          <h1>Understanding what goes into a well-made object.</h1>

          <p className={styles.heroIntro}>
            Technical explorations of materials, finishes, fabrication,
            engineering and design. Discover the science behind decorative
            objects and the decisions that turn an idea into a physical product.
          </p>
        </section>

        {articles.length === 0 ? (
          <section className={styles.emptyState}>
            <p>Articles are being prepared for Maven Studio.</p>
          </section>
        ) : (
          <>
            <nav
              className={styles.categoryNav}
              aria-label="Explore articles by subject"
            >
              <p className={styles.navLabel}>EXPLORE BY SUBJECT</p>
              <div className={styles.categoryLinks}>
                {categories.map((category) => (
                  <a
                    href={`#${categoryId(category.name)}`}
                    key={category.name}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </nav>

            {categories.map((category) => {
              const categoryArticles = articles.filter(
                (article) => article.category.trim() === category.name,
              );

              return (
                <section
                  className={styles.categorySection}
                  id={categoryId(category.name)}
                  key={category.name}
                  aria-labelledby={`${categoryId(category.name)}-heading`}
                >
                  <header className={styles.categoryHeading}>
                    <p className={styles.eyebrow}>EXPLORE BY SUBJECT</p>
                    <h2 id={`${categoryId(category.name)}-heading`}>
                      {category.name}
                    </h2>
                    <p>{category.description}</p>
                  </header>

                  <div className={styles.articleGrid}>
                    {categoryArticles.map((article) => (
                      <article
                        className={styles.articleCard}
                        key={article.slug}
                      >
                        <p className={styles.cardMeta}>
                          {article.publishedAt}
                          {article.updatedAt
                            ? ` · Updated ${article.updatedAt}`
                            : ""}
                        </p>

                        <h3>
                          <Link href={`/studio/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className={styles.cardDescription}>
                          {article.description}
                        </p>

                        <Link
                          className={styles.readLink}
                          href={`/studio/${article.slug}`}
                        >
                          Read article <span aria-hidden="true">→</span>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}
      </main>
    </>
  );
}
