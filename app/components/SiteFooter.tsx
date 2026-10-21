import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link href="/" className="footer-brand-large">
              MAVEN<br />DECORATIVES
            </Link>
            <p className="footer-description">
              Bespoke decorative lighting for projects, from drawings to production and delivery.
            </p>
          </div>

          <div className="footer-column">
            <span className="footer-label">EXPLORE</span>
            <Link href="/studio">Studio</Link>
            <Link href="/#approach">Approach</Link>
            <Link href="/#technical">Technical</Link>
            <Link href="/#collaborators">Who We Work With</Link>
            <Link href="/#process">Process</Link>
            <Link href="/#contact">Contact</Link>
          </div>

          <div className="footer-column">
            <span className="footer-label">CONTACT</span>
            <a href="mailto:kamlesh@mavendecoratives.com">kamlesh@mavendecoratives.com</a>
            <a href="tel:+919646562880">+91 96465 62880</a>
            <a href="https://wa.me/919646562880" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>

          <div className="footer-column">
            <span className="footer-label">LOCATION</span>
            <p>Dhanbad | Bengaluru<br />India</p>
            <span className="footer-label footer-location-label">PROJECTS</span>
            <p>Hospitality<br />Commercial<br />Residential</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Maven Decoratives</span>
          <span>India</span>
          <span>Design-led manufacturing development</span>
        </div>
      </div>
    </footer>
  );
}
