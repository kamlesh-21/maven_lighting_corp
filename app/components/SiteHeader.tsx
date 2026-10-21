import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/#top" className="brand" aria-label="Maven Decoratives home">
          <img src="/maven-logo-600x200-transparent.png" alt="Maven Decoratives" />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/studio">Studio</Link>
          <Link href="/#approach">Approach</Link>
          <Link href="/#lighting">Lighting</Link>
          <Link href="/#materials">Materials</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <a
          className="header-cta"
          href="https://wa.me/919646562880?text=Hello%20Maven%20Decoratives%2C%20I%20have%20a%20project%20requirement%20for%20bespoke%20decorative%20lighting.%20I%20would%20like%20to%20share%20the%20reference%2Fdesign%20and%20project%20details."
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss a project
        </a>
      </div>
    </header>
  );
}
