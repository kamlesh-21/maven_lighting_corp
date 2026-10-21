import styles from "./studio.module.css";

// The shared SiteHeader and SiteFooter are rendered once by app/layout.tsx.
// This nested layout only provides the Studio content background and styles.
export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.site}>{children}</div>;
}
