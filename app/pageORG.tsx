// app/page.tsx
import Image from 'next/image'

const lighting = [
  {
    title: 'Chandeliers',
    image: '/images/cat-chandeliers.png',
    alt: 'Bespoke decorative chandelier',
  },
  {
    title: 'Pendants',
    image: '/images/cat-pendant.png',
    alt: 'Custom pendant lighting',
  },
  {
    title: 'Wall & Sconces',
    image: '/images/cat-wall-sconce.png',
    alt: 'Bespoke wall and sconce lighting',
  },
  {
    title: 'Feature Installations',
    image: '/images/cat-feature.png',
    alt: 'Feature decorative lighting installation',
  },
  {
    title: 'Hospitality Lighting',
    image: '/images/cat-hospitality.png',
    alt: 'Hospitality decorative lighting',
  },
  {
    title: 'Custom Fixtures',
    image: '/images/cat-custom.png',
    alt: 'Custom decorative lighting fixture',
  },
]

const materials = [
  {
    title: 'Brass & Metal',
    image: '/images/mat-brass.png',
  },
  {
    title: 'Glass',
    image: '/images/mat-glass.png',
  },
  {
    title: 'Crystal',
    image: '/images/mat-crystal.png',
  },
  {
    title: 'Fabric & Textiles',
    image: '/images/mat-fabric.png',
  },
  {
    title: 'Mixed Materials',
    image: '/images/mat-mixed.png',
  },
  {
    title: 'Finishes',
    image: '/images/mat-finishes.png',
  },
]

const process = [
  ['01', 'Reference', 'Image, drawing, BOQ, sketch or simply an idea.'],
  ['02', 'Understand', 'Project context, dimensions, material, finish, quantity and timeline.'],
  ['03', 'Develop', 'Design interpretation, technical development and manufacturing approach.'],
  ['04', 'Approve', 'CAD, samples, swatches or mock-ups are developed for approval.'],
  ['05', 'Deliver', 'Production, quality checks, coordination and delivery.'],
]

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
          <a href="#top" className="logo" aria-label="Maven Decoratives">
            <span>MAVEN</span>
            <small>DECORATIVES</small>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#approach">Approach</a>
            <a href="#lighting">Lighting</a>
            <a href="#materials">Materials</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="header-cta" href="#contact">
            Discuss a Project
          </a>
        </div>
      </header>

      <section id="top" className="hero">
        <Image
          src="/images/hero-chandelier.png"
          alt="Decorative chandelier in a hospitality interior"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />

        <div className="hero-overlay" />

        <div className="container hero-content">
          <p className="eyebrow light-text">Bespoke Decorative Lighting</p>

          <h1>
            Decorative lighting,
            <br />
            developed around
            <br />
            the project.
          </h1>

          <p className="hero-copy">
            From reference, concept or BOQ to design development,
            materials, fabrication and delivery.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="button button-light">
              Share a Requirement
            </a>

            <a href="#approach" className="text-link light-text">
              Explore Maven <span>↓</span>
            </a>
          </div>

          <div className="hero-meta">
            <span>Hospitality</span>
            <span>Custom Development</span>
            <span>Project-Based</span>
          </div>
        </div>
      </section>

      <section id="approach" className="section proposition">
        <div className="container">
          <div className="section-intro">
            <span className="section-label">MAVEN / APPROACH</span>

            <div>
              <h2>
                Not a catalogue.
                <br />
                A fixture developed
                <br />
                for the project.
              </h2>

              <p className="intro-copy">
                A reference image is only the beginning. Maven works with
                architects, interior designers, PMCs, developers and project
                teams to develop decorative lighting around the actual
                requirements of the space.
              </p>
            </div>
          </div>

          <div className="principles">
            <article>
              <span>01</span>
              <h3>Reference as a starting point</h3>
              <p>
                Bring an image, sketch, existing fixture, drawing or BOQ.
                The starting point does not need to be production-ready.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Designed around context</h3>
              <p>
                Scale, proportion, material, finish, quantity, budget and
                architectural context shape the development.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Developed to be made</h3>
              <p>
                Design intent is considered alongside construction,
                components, fixing, weight, electrical requirements and
                production realities.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Built for project delivery</h3>
              <p>
                Sampling, approvals, production coordination, quality checks
                and delivery remain part of the process.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="dark-statement">
        <div className="container">
          <p className="section-label">DESIGN INTENT</p>
          <h2>
            Start with the space.
            <br />
            Not the fixture.
          </h2>
          <p>
            The right decorative light is not simply a beautiful object. Its
            scale, proportion, material, finish and light have to belong to
            the architecture.
          </p>
        </div>
      </section>

      <section className="section reference-flow">
        <div className="container">
          <div className="section-intro">
            <span className="section-label">FROM REFERENCE TO FIXTURE</span>

            <div>
              <h2>
                The reference
                <br />
                is where we begin.
              </h2>

              <p className="intro-copy">
                We interpret what matters in the reference, then develop the
                fixture around the requirements of the project.
              </p>
            </div>
          </div>

          <div className="flow">
            <div className="flow-item">
              <span>01</span>
              <strong>Reference</strong>
              <small>Image / sketch / BOQ</small>
            </div>

            <i />

            <div className="flow-item">
              <span>02</span>
              <strong>Interpretation</strong>
              <small>Form / scale / intent</small>
            </div>

            <i />

            <div className="flow-item">
              <span>03</span>
              <strong>Material</strong>
              <small>Finish / texture / components</small>
            </div>

            <i />

            <div className="flow-item">
              <span>04</span>
              <strong>Development</strong>
              <small>CAD / sample / mock-up</small>
            </div>

            <i />

            <div className="flow-item">
              <span>05</span>
              <strong>Fixture</strong>
              <small>Production / delivery</small>
            </div>
          </div>
        </div>
      </section>

      <section id="lighting" className="section lighting-section">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="section-label">LIGHTING</span>
              <h2>Decorative lighting without a fixed range.</h2>
            </div>

            <p>
              Statement pieces, architectural fixtures and everything between.
              The requirement can determine the form rather than the other way
              around.
            </p>
          </div>

          <div className="lighting-grid">
            {lighting.map((item, index) => (
              <article
                className={`lighting-card lighting-card-${index + 1}`}
                key={item.title}
              >
                <div className="image-wrap">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                    className="cover-image"
                  />
                </div>

                <div className="card-caption">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <p className="category-line">
            Chandeliers · Pendants · Hanging Luminaries · Ceiling Fixtures ·
            Ceiling-to-Floor Installations · Wall Lights · Sconces · Table
            Lamps · Floor Lamps · Feature Lighting · Custom Fixtures
          </p>
        </div>
      </section>

      <section id="materials" className="section materials-section">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="section-label">MATERIAL / FINISH</span>
              <h2>Material is part of the design.</h2>
            </div>

            <p>
              Brass, metal, glass, crystal, fabric, cane, marble, alabaster,
              wood, ceramic and mixed materials can all become part of the
              fixture language.
            </p>
          </div>

          <div className="materials-grid">
            {materials.map((item) => (
              <article key={item.title}>
                <div className="material-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 700px) 50vw, 33vw"
                    className="cover-image"
                  />
                </div>

                <h3>{item.title}</h3>
              </article>
            ))}
          </div>

          <div className="material-note">
            <span>Material vocabulary</span>
            <p>
              Cane &amp; rattan · Natural textiles · Tasar · Marble ·
              Alabaster · Wood · Terracotta · Ceramic · Paper · Natural
              fibres · Mixed materials · Custom metal finishes
            </p>
          </div>
        </div>
      </section>

      <section className="section project-section">
        <div className="container">
          <div className="section-intro">
            <span className="section-label">PROJECT CONTEXT</span>

            <div>
              <h2>
                Developed for
                <br />
                the way projects
                <br />
                actually work.
              </h2>

              <p className="intro-copy">
                Decorative lighting sits between design and execution. We
                consider both sides of that equation.
              </p>
            </div>
          </div>

          <div className="project-grid">
            <article>
              <span>01</span>
              <h3>Scale &amp; proportion</h3>
              <p>
                Fixture dimensions and visual presence are considered against
                the architecture and the space.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Technical coordination</h3>
              <p>
                Dimensions, weight, fixing, mounting, electrical requirements,
                dimming and relevant environmental requirements.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Samples &amp; mock-ups</h3>
              <p>
                Material samples, finish references, CAD development and
                physical samples can be used before production.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Value engineering</h3>
              <p>
                Where required, construction and material choices can be
                reconsidered without losing the essential design intent.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="process" className="dark-section">
        <div className="container">
          <div className="dark-heading">
            <span className="section-label">PROCESS</span>
            <h2>
              You bring the requirement.
              <br />
              We take it forward.
            </h2>
            <p>
              Start with whatever you have. We work from there toward a clear,
              manufacturable and project-ready fixture.
            </p>
          </div>

          <div className="process-grid">
            {process.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section capability-section">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="section-label">PROJECTS</span>
              <h2>Where the lighting belongs.</h2>
            </div>

            <p>
              Maven is structured around project requirements, from hospitality
              and high-end residential spaces to larger commercial environments.
            </p>
          </div>

          <div className="project-types">
            {projectTypes.map((type, index) => (
              <div key={type}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{type}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section credibility">
        <div className="container credibility-grid">
          <div>
            <span className="section-label">WHY MAVEN</span>
            <h2>
              Design understanding.
              <br />
              Manufacturing access.
              <br />
              Project accountability.
            </h2>
          </div>

          <div className="credibility-copy">
            <p>
              Maven Decoratives is a design-led decorative lighting venture
              focused on bespoke project requirements.
            </p>

            <p>
              The team brings hands-on experience across hospitality
              pre-openings, expansions, procurement, decorative lighting,
              design and vendor development.
            </p>

            <p>
              The aim is straightforward: understand the requirement properly,
              develop the fixture carefully and make execution easier for the
              project team.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div>
            <span className="section-label">START A PROJECT</span>
            <h2>
              Have a fixture
              <br />
              in mind?
            </h2>
          </div>

          <div className="contact-content">
            <p>
              Bring us the reference, drawing, BOQ or simply describe what you
              need. We can take the requirement forward from there.
            </p>

            <div className="contact-actions">
              <a
                className="button button-dark"
                href="https://wa.me/919646562880?text=Hello%20Maven%20Decoratives%2C%20I%20have%20a%20project%20requirement%20for%20bespoke%20decorative%20lighting.%20I%20would%20like%20to%20share%20the%20reference%2Fdesign%20and%20project%20details."
                target="_blank"
                rel="noopener noreferrer"
              >
                Share a Requirement
              </a>

              <a className="contact-link" href="tel:+919646562880">
                Call +91 96465 62880
              </a>

              <a
                className="contact-link"
                href="mailto:maven.decoratives@gmail.com"
              >
                maven.decoratives@gmail.com
              </a>
            </div>

            <div className="contact-note">
              <span>REFERENCE · DRAWING · BOQ · IDEA</span>
              <span>WE WILL TAKE IT FROM THERE.</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <div className="footer-logo">MAVEN DECORATIVES</div>
              <p>
                Bespoke decorative lighting · Custom development · Project
                execution
              </p>
            </div>

            <div className="footer-links">
              <a href="#approach">Approach</a>
              <a href="#lighting">Lighting</a>
              <a href="#materials">Materials</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>Basava 2nd, Arekere, Bengaluru, Karnataka 560076</span>
            <span>© {new Date().getFullYear()} Maven Decoratives</span>
          </div>
        </div>
      </footer>
    </main>
  )
}