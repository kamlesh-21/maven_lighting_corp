import Link from "next/link";

const lightingCategories = [
  { title: "Chandeliers", image: "/images/cat-chandeliers.png" },
  { title: "Pendants", image: "/images/cat-pendant.png" },
  { title: "Wall Sconces", image: "/images/cat-wall-sconce.png" },
  { title: "Custom Fixtures", image: "/images/cat-custom.png" },
  { title: "Hospitality Lighting", image: "/images/cat-hospitality.png" },
  { title: "Feature Lighting", image: "/images/cat-feature.png" },
];

const materials = [
  { title: "Brass & Metal", image: "/images/mat-brass.png" },
  { title: "Crystal", image: "/images/mat-crystal.png" },
  { title: "Fabric", image: "/images/mat-fabric.png" },
  { title: "Glass", image: "/images/mat-glass.png" },
  { title: "Mixed Materials", image: "/images/mat-mixed.png" },
  { title: "Finishes", image: "/images/mat-finishes.png" },
];

const process = [
  ["01", "Reference", "A photograph, sketch, drawing, BOQ or simply an idea."],
  ["02", "Interpret", "Understand the design intent, space, scale, material and use."],
  ["03", "Develop", "Translate the idea into dimensions, construction, light and finish."],
  ["04", "Approve", "Samples, mock-ups, drawings and technical coordination."],
  ["05", "Deliver", "Production coordination, quality checks and project delivery."],
];

const collaborators = [
  {
    role: "Architects",
    chain: "Design intent → scale → proportion → custom development",
  },
  {
    role: "Interior Designers",
    chain: "Reference → material → finish → mock-up",
  },
  {
    role: "PMC / Project Teams",
    chain: "Drawings → fixing → weight → coordination → timelines",
  },
  {
    role: "Procurement",
    chain: "BOQ → specification → commercial → lead time",
  },
  {
    role: "Developers / Owners",
    chain: "Design + budget → alternatives → production → delivery",
  },
];

const projectTypes = [
  'Hotels',
  'Resorts',
  'Restaurants',
  'Residences',
  'Clubhouses',
  'Commercial & Public Spaces',
]

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="#top" className="brand">
            MAVEN
            <span>DECORATIVES</span>
          </Link>

          <nav className="desktop-nav">
            <Link href="#approach">Approach</Link>
            <Link href="#lighting">Lighting</Link>
            <Link href="#materials">Materials</Link>
            <Link href="#process">Process</Link>
            <Link href="#contact">Contact</Link>
          </nav>

          <a
            className="header-cta"
            href="https://wa.me/919646562880?text=Hello%20Maven%20Decoratives%2C%20I%20have%20a%20project%20requirement%20for%20bespoke%20decorative%20lighting.%20I%20would%20like%20to%20share%20the%20reference%2Fdesign%20and%20project%20details."
            target="_blank"
            rel="noreferrer"
          >
            Discuss a project
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-image">
          <img src="/images/hero-chandelier.png" alt="Decorative chandelier" />
        </div>

        <div className="container hero-content">
          <p className="eyebrow">BESPOKE DECORATIVE LIGHTING</p>

          <h1>
            Lighting developed
            <br />
            around the project.
          </h1>

          <p className="hero-copy">
            Maven Decoratives develops bespoke decorative lighting for hospitality, commercial and residential projects across India.
          </p>

          <div className="hero-actions">
            <a
              className="button button-dark"
              href="https://wa.me/919646562880?text=Hello%20Maven%20Decoratives%2C%20I%20have%20a%20project%20requirement%20for%20bespoke%20decorative%20lighting.%20I%20would%20like%20to%20share%20the%20reference%2Fdesign%20and%20project%20details."
              target="_blank"
              rel="noreferrer"
            >
              Share a requirement
            </a>

            <a className="text-link" href="#approach">
              Explore Maven <span>↓</span>
            </a>
          </div>
        </div>

        <div className="container hero-meta">
          <span>Hospitality</span>
          <span>Residential</span>
          <span>Commercial</span>
          <span>India</span>
        </div>
      </section>

      <section className="section" id="approach">
        <div className="container">
          <div className="section-intro split">
            <div>
              <p className="eyebrow">THE MAVEN APPROACH</p>
              <h2>
                Not a catalogue.
                <br />
                A fixture developed
                <br />
                for the project.
              </h2>
            </div>

            <div className="intro-copy">
              <p>
                A decorative fixture can begin with a reference image, a
                designer's sketch, a BOQ description or a particular material.
              </p>
              <p>
                Our role is to understand what needs to happen between that
                starting point and the finished fixture.
              </p>
            </div>
          </div>

          <div className="principles">
            <article>
              <span>01</span>
              <h3>Reference as a starting point</h3>
              <p>
                Existing references are interpreted rather than simply
                reproduced.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Designed around context</h3>
              <p>
                Scale, proportion, ceiling height, material and architectural
                setting inform the fixture.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Developed to be made</h3>
              <p>
                Design intent is considered alongside construction, components,
                finishes, light and fixing.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Built for project delivery</h3>
              <p>
                Drawings, samples, approvals, quantities, timelines and site
                requirements are part of the process.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="statement-section">
        <div className="container">
          <p className="eyebrow">A DIFFERENT STARTING POINT</p>
          <h2>
            Start with the space.
            <br />
            Not the fixture.
          </h2>
        </div>
      </section>

      <section className="section reference-section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">FROM IDEA TO FIXTURE</p>
            <h2>One reference. Many decisions behind it.</h2>
            <p className="wide-copy">
              The visible object is only the final result. Before it reaches
              the ceiling, its scale, material, construction, light, finish
              and installation have to work together.
            </p>
          </div>

          <div className="reference-flow">
            <div>
              <span>01</span>
              <strong>Reference</strong>
              <small>Image · sketch · BOQ</small>
            </div>
            <div>
              <span>02</span>
              <strong>Interpretation</strong>
              <small>Intent · proportion</small>
            </div>
            <div>
              <span>03</span>
              <strong>Material</strong>
              <small>Glass · metal · stone</small>
            </div>
            <div>
              <span>04</span>
              <strong>Development</strong>
              <small>Construction · light</small>
            </div>
            <div>
              <span>05</span>
              <strong>Fixture</strong>
              <small>Approved · produced</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section lighting-section" id="lighting">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">LIGHTING</p>
              <h2>Made around the requirement.</h2>
            </div>
            <p>
              Decorative lighting across hospitality, residential and
              commercial environments.
            </p>
          </div>

          <div className="lighting-grid">
            {lightingCategories.map((item, index) => (
              <article
                className={`image-card image-card-${index + 1}`}
                key={item.title}
              >
                <img src={item.image} alt={item.title} />
                <div className="image-card-caption">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section materials-section" id="materials">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">MATERIALS & FINISHES</p>
            <h2>
              Material is not
              <br />
              an afterthought.
            </h2>
            <p className="wide-copy">
              The same design can change completely through material, surface,
              transparency, texture and finish. We work across combinations
              suited to the intended visual language and project requirement.
            </p>
          </div>

          <div className="materials-grid">
            {materials.map((item, index) => (
              <article className="material-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className="material-vocabulary">
            <span>ALABASTER</span>
            <span>MARBLE</span>
            <span>CANE</span>
            <span>GLASS</span>
            <span>CRYSTAL</span>
            <span>METAL</span>
            <span>FABRIC</span>
            <span>MIXED MATERIALS</span>
          </div>
        </div>
      </section>

      <section className="technical-section">
        <div className="container">
          <div className="technical-header">
            <div>
              <p className="eyebrow">BEYOND THE FIXTURE</p>
              <h2>
                Beauty is visible.
                <br />
                The details make it work.
              </h2>
            </div>

            <p>
              Decorative lighting has to perform as part of a larger
              environment. We consider the technical and practical details
              that sit behind the design.
            </p>
          </div>

          <div className="technical-grid">
            <article>
              <span>01</span>
              <h3>Light</h3>
              <p>CRI · CCT · lumen output · beam angle · glare</p>
            </article>

            <article>
              <span>02</span>
              <h3>Control</h3>
              <p>Triac · 0–10V · DALI · project-specific requirements</p>
            </article>

            <article>
              <span>03</span>
              <h3>Scale</h3>
              <p>Diameter · height · drop · proportion · viewing distance</p>
            </article>

            <article>
              <span>04</span>
              <h3>Construction</h3>
              <p>Weight · structure · fixing · safety · ceiling condition</p>
            </article>

            <article>
              <span>05</span>
              <h3>Material</h3>
              <p>Metal · glass · crystal · stone · fabric · mixed finishes</p>
            </article>

            <article>
              <span>06</span>
              <h3>Coordination</h3>
              <p>RCP · drivers · access · wiring · maintenance</p>
            </article>
          </div>

          <div className="technical-note">
            <strong>Good decorative lighting is not only what you see.</strong>
            <span>
              It is also the weight above the ceiling, the light source inside
              the shade, the fixing nobody sees and the detail that still has
              to work when the project opens.
            </span>
          </div>
        </div>
      </section>

      <section className="section project-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">DESIGNED AROUND THE PROJECT</p>
              <h2>The details change with the space.</h2>
            </div>
            <p>
              A fixture is developed according to the environment in which it
              has to live.
            </p>
          </div>

          <div className="project-grid">
            <article>
              <span>01</span>
              <h3>Scale & proportion</h3>
              <p>
                Dimensions and drop developed around architecture, furniture
                and viewing distance.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Technical coordination</h3>
              <p>
                Lighting requirements considered alongside RCPs, fixing,
                drivers, dimming and site conditions.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Samples & mock-ups</h3>
              <p>
                Material, finish, proportion and construction can be reviewed
                before larger production.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Value engineering</h3>
              <p>
                Where required, material and construction alternatives can be
                explored without losing the core design intent.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section collaborators-section" id="collaborators">
        <div className="container">
          <div className="section-heading-row collaborators-heading">
            <div>
              <p className="eyebrow">WHO WE WORK WITH</p>

              <h2>
                Different roles.
                <br />
                One project.
              </h2>
            </div>

            <p>
              Maven works alongside the people responsible for design, technical
              coordination, procurement and project delivery.
            </p>
          </div>

          <div className="collaborators-list">
            {collaborators.map((item, index) => (
              <article key={item.role}>
                <span>0{index + 1}</span>

                <div>
                  <h3>{item.role}</h3>
                  <p>{item.chain}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="container">
          <div className="process-header">
            <p className="eyebrow">THE PROCESS</p>
            <h2>
              From reference
              <br />
              to project delivery.
            </h2>
          </div>

          <div className="process-list">
            {process.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container why-grid">
          <div>
            <p className="eyebrow">WHY MAVEN</p>
            <h2>
              Close to the
              <br />
              design. Close to
              <br />
              the project.
            </h2>
          </div>

          <div className="why-copy">
            <p className="large">
              Maven brings together design understanding, hospitality
              experience, material knowledge and project-oriented development.
            </p>

            <div className="credentials">
              <div>
                <span>BACKGROUND</span>
                <strong>Hospitality & procurement</strong>
              </div>
              <div>
                <span>EXPERIENCE</span>
                <strong>15+ years across hotel projects</strong>
              </div>
              <div>
                <span>APPROACH</span>
                <strong>Design + contract manufacturing</strong>
              </div>
              <div>
                <span>STARTING POINT</span>
                <strong>Reference · concept · BOQ</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <p className="eyebrow">HAVE A REQUIREMENT?</p>

          <h2>
            Send the reference.
            <br />
            Let&apos;s discuss the project.
          </h2>

          <p className="contact-copy">
            Share a reference image, drawing, BOQ, dimensions or simply tell us
            what you are looking to develop.
          </p>

          <div className="contact-actions">
            <a
              className="button button-dark"
              href="https://wa.me/919646562880?text=Hello%20Maven%20Decoratives%2C%20I%20have%20a%20project%20requirement%20for%20bespoke%20decorative%20lighting.%20I%20would%20like%20to%20share%20the%20reference%2Fdesign%20and%20project%20details."
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Maven
            </a>

            <a className="contact-link" href="tel:+919646562880">
              +91 96465 62880
            </a>

            <a
              className="contact-link"
              href="mailto:kamlesh@mavendecoratives.com"
            >
              kamlesh@mavendecoratives.com
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">MAVEN DECORATIVES</div>
            <p>
              Bespoke decorative lighting
              <br />
              for projects.
            </p>
          </div>

          <div>
            <span className="footer-label">CONTACT</span>
            <a href="tel:+919646562880">+91 96465 62880</a>
            <a href="mailto:kamlesh@mavendecoratives.com">
              kamlesh@mavendecoratives.com
            </a>
          </div>

          <div>
            <span className="footer-label">LOCATION</span>
            <p>
              Bengaluru
              <br />
              India
            </p>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Maven Decoratives</span>
          <span>Design-led contract manufacturing</span>
        </div>
      </footer>

      <a
        className="mobile-whatsapp"
        href="https://wa.me/919646562880?text=Hello%20Maven%20Decoratives%2C%20I%20have%20a%20project%20requirement%20for%20bespoke%20decorative%20lighting.%20I%20would%20like%20to%20share%20the%20reference%2Fdesign%20and%20project%20details."
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Maven Decoratives"
      >
        WhatsApp
      </a>
    </main>
  );
}