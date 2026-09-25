"use client";

import { useMemo, useState } from "react";
import type { DesignInterpretation } from "@/app/lib/design/types";
import OptionGrid from "@/app/components/OptionGrid";
import type { DesignIntent } from "@/app/lib/design/types";

const APPLICATIONS = [
  { value: "lobby", label: "Hotel Lobby" },
  { value: "restaurant", label: "Restaurant" },
  { value: "guestroom", label: "Guestroom" },
  { value: "resort", label: "Resort" },
  { value: "corridor", label: "Corridor" },
  { value: "public-space", label: "Public Space" },
  { value: "villa", label: "Villa / Residence" },
  { value: "clubhouse", label: "Clubhouse" },
];

const MOODS = [
  { value: "heritage", label: "Heritage" },
  { value: "contemporary", label: "Contemporary" },
  { value: "quiet-luxury", label: "Quiet Luxury" },
  { value: "earthy", label: "Earthy" },
  { value: "dramatic", label: "Dramatic" },
  { value: "craft-led", label: "Craft-led" },
  { value: "minimal", label: "Minimal" },
  { value: "natural", label: "Natural" },
];

const MATERIALS = [
  { value: "antique-brass", label: "Antique Brass" },
  { value: "brass", label: "Brass" },
  { value: "stone", label: "Stone" },
  { value: "marble", label: "Marble" },
  { value: "glass", label: "Glass" },
  { value: "cane", label: "Cane / Rattan" },
  { value: "fabric", label: "Fabric" },
  { value: "crystal", label: "Crystal" },
  { value: "bronze", label: "Bronze" },
  { value: "wood", label: "Wood" },
  { value: "mixed", label: "Mixed Materials" },
  { value: "dark-metal", label: "Dark Metal" },
];

const FIXTURES = [
  { value: "pendant", label: "Pendant" },
  { value: "chandelier", label: "Chandelier" },
  { value: "wall-light", label: "Wall Light" },
  { value: "floor-lamp", label: "Floor Lamp" },
  { value: "table-lamp", label: "Table Lamp" },
  { value: "ceiling-light", label: "Ceiling Light" },
  { value: "not-sure", label: "Not sure yet" },
];

const SCALE_OPTIONS = [
  { value: "intimate", label: "Intimate" },
  { value: "statement", label: "Statement" },
  { value: "architectural", label: "Architectural" },
];

function labelFor(
  values: string[],
  options: { value: string; label: string }[]
) {
  return values
    .map((value) => options.find((option) => option.value === value)?.label)
    .filter(Boolean)
    .join(", ");
}

export default function Home() {
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [space, setSpace] = useState("");

  const [application, setApplication] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [fixture, setFixture] = useState<string[]>([]);

  const [referenceFileName, setReferenceFileName] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [referenceNotes, setReferenceNotes] = useState("");

  const [scale, setScale] = useState("");
  const [showBrief, setShowBrief] = useState(false);

  const [interpretation, setInterpretation] =
  useState<DesignInterpretation | null>(null);

  const [isInterpreting, setIsInterpreting] = useState(false);

  const [interpretError, setInterpretError] = useState("");

  const toggle = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const toggleFixture = (value: string) => {
    setFixture((current) => {
      if (value === "not-sure") {
        return current.includes("not-sure") ? [] : ["not-sure"];
      }

      return current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current.filter((item) => item !== "not-sure"), value];
    });
  };

  const handleReferenceUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (referenceUrl) {
      URL.revokeObjectURL(referenceUrl);
    }

    const url = URL.createObjectURL(file);

    setReferenceFileName(file.name);
    setReferenceUrl(url);
  };

  const scrollToStudio = () => {
    document
      .getElementById("design-intent")
      ?.scrollIntoView({ behavior: "smooth" });
  };

const createDesignBrief = async () => {
  setIsInterpreting(true);
  setInterpretError("");
  setInterpretation(null);
  setShowBrief(true);

  try {
    let referenceImageData: string | undefined;

    if (referenceUrl) {
      const response = await fetch(referenceUrl);
      const blob = await response.blob();

      referenceImageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Unable to read reference image."));
          }
        };

        reader.onerror = () =>
          reject(new Error("Unable to read reference image."));

        reader.readAsDataURL(blob);
      });
    }

    const response = await fetch("/api/interpret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        designIntent,
        referenceImageData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to create design interpretation.");
    }

    setInterpretation(data.interpretation);

    window.setTimeout(() => {
      document
        .getElementById("design-brief")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  } catch (error) {
    setInterpretError(
      error instanceof Error
        ? error.message
        : "Unable to create the design interpretation."
    );
  } finally {
    setIsInterpreting(false);
  }
};

  const designIntent: DesignIntent = useMemo(
    () => ({
      project: {
        name: projectName,
        location,
        space,
      },
      application,
      atmosphere: moods,
      materials,
      fixture,
      reference: {
        fileName: referenceFileName,
        imageUrl: referenceUrl,
        notes: referenceNotes,
      },
      scale,
    }),
    [
      projectName,
      location,
      space,
      application,
      moods,
      materials,
      fixture,
      referenceFileName,
      referenceUrl,
      referenceNotes,
      scale,
    ]
  );

  const interpretedDirection = useMemo(() => {
    const parts: string[] = [];

    if (designIntent.application.length > 0) {
      parts.push(
        `The lighting is being considered for ${labelFor(
          designIntent.application,
          APPLICATIONS
        ).toLowerCase()}.`
      );
    }

    if (designIntent.atmosphere.length > 0) {
      parts.push(
        `The desired atmosphere leans toward ${labelFor(
          designIntent.atmosphere,
          MOODS
        ).toLowerCase()}.`
      );
    }

    if (designIntent.materials.length > 0) {
      parts.push(
        `The material language includes ${labelFor(
          designIntent.materials,
          MATERIALS
        ).toLowerCase()}.`
      );
    }

    if (designIntent.fixture.length > 0) {
      parts.push(
        designIntent.fixture.includes("not-sure")
          ? "The fixture form is intentionally open for exploration."
          : `The preferred fixture direction is ${labelFor(
              designIntent.fixture,
              FIXTURES
            ).toLowerCase()}.`
      );
    }

    if (designIntent.scale) {
      parts.push(
        `The intended presence within the space is ${labelFor(
          [designIntent.scale],
          SCALE_OPTIONS
        ).toLowerCase()}.`
      );
    }

    if (designIntent.reference.imageUrl) {
      parts.push(
        "A visual reference has been provided and can be considered as part of the design direction."
      );
    }

    if (parts.length === 0) {
      return "Your selections will guide the Maven design interpretation.";
    }

    return parts.join(" ");
  }, [designIntent]);

  return (
    <main className="maven-shell">
      <div className="maven-container">
        <header className="maven-header">
          <div className="maven-logo">MAVEN</div>

          <nav className="maven-nav">
            <button onClick={scrollToStudio}>Explore</button>
            <button type="button">About</button>
            <button type="button">For Projects</button>
          </nav>
        </header>

        <section className="hero">
          <div className="eyebrow">Bespoke decorative lighting</div>

          <h1>
            From an idea
            <br />
            to a fixture.
          </h1>

          <p>
            Explore lighting possibilities through mood, material, reference
            and architectural intent. Maven develops bespoke decorative
            lighting for hospitality projects.
          </p>

          <div className="hero-action">
            <button className="primary-button" onClick={scrollToStudio}>
              Begin exploring
            </button>
          </div>
        </section>

        <section className="section" id="design-intent">
          <div className="section-heading">
            <div className="section-number">PROJECT / CONTEXT</div>

            <div>
              <h2>Tell us about the project.</h2>
              <p>
                A little context helps Maven understand where the lighting
                belongs.
              </p>
            </div>
          </div>

          <div className="context-grid">
            <label className="context-field">
              <span>Project / Hotel</span>
              <input
                type="text"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="e.g. The Oberoi Jaipur"
              />
            </label>

            <label className="context-field">
              <span>Location</span>
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City / Country"
              />
            </label>

            <label className="context-field">
              <span>Space</span>
              <input
                type="text"
                value={space}
                onChange={(event) => setSpace(event.target.value)}
                placeholder="e.g. Main Lobby"
              />
            </label>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div className="section-number">01 / APPLICATION</div>

            <div>
              <h2>Where will the light live?</h2>
              <p>
                Start with the space rather than the fixture. The architecture
                and its purpose shape the lighting.
              </p>
            </div>
          </div>

          <OptionGrid
            options={APPLICATIONS}
            selected={application}
            onToggle={(value) => toggle(value, setApplication)}
          />
        </section>

        <section className="section">
          <div className="section-heading">
            <div className="section-number">02 / ATMOSPHERE</div>

            <div>
              <h2>What should it feel like?</h2>
              <p>
                Select one or several directions. There is no requirement to
                know the exact design language yet.
              </p>
            </div>
          </div>

          <OptionGrid
            options={MOODS}
            selected={moods}
            onToggle={(value) => toggle(value, setMoods)}
          />
        </section>

        <section className="section">
          <div className="section-heading">
            <div className="section-number">03 / MATERIAL</div>

            <div>
              <h2>What are you drawn to?</h2>
              <p>
                Lighting rarely belongs to one material. Combine finishes,
                surfaces and textures to explore a richer direction.
              </p>
            </div>
          </div>

          <OptionGrid
            options={MATERIALS}
            selected={materials}
            onToggle={(value) => toggle(value, setMaterials)}
          />
        </section>

        <section className="section">
          <div className="section-heading">
            <div className="section-number">04 / FIXTURE</div>

            <div>
              <h2>Do you know what you are looking for?</h2>
              <p>
                Choose a fixture type if you already know it. Otherwise, let
                the design process explore the possibilities.
              </p>
            </div>
          </div>

          <OptionGrid
            options={FIXTURES}
            selected={fixture}
            onToggle={toggleFixture}
          />
        </section>

        <section className="section">
  <div className="section-heading">
    <div className="section-number">05 / REFERENCE</div>

    <div>
      <h2>Have something in mind?</h2>
      <p>
        A photograph, Pinterest reference, Google image, sketch or
        existing fixture can become the starting point.
      </p>
    </div>
  </div>

  <div className="reference-layout">
    <div className="reference-area">
      {referenceUrl ? (
        <div className="reference-uploaded">
          <img
            src={referenceUrl}
            alt="Uploaded lighting reference"
            className="reference-image"
          />

          <label className="reference-button">
            Change reference
            <input
              type="file"
              accept="image/*"
              onChange={handleReferenceUpload}
              hidden
            />
          </label>
        </div>
      ) : (
        <div className="reference-inner">
          <h3>Bring a reference.</h3>

          <p>
            Something you have seen, saved or sketched is enough. It
            does not need to be an exact fixture.
          </p>

          <label className="reference-button">
            Upload reference
            <input
              type="file"
              accept="image/*"
              onChange={handleReferenceUpload}
              hidden
            />
          </label>
        </div>
      )}
    </div>

    <div className="reference-notes">
      <label className="context-field">
        <span>Anything you want us to notice?</span>
        <textarea
          value={referenceNotes}
          onChange={(event) => setReferenceNotes(event.target.value)}
          placeholder="For example: the shape, proportion, finish, texture, or overall character."
          rows={6}
        />
        <small>
          Your note will be included in the Maven design brief.
        </small>
      </label>
    </div>
  </div>
</section>

        <section className="section">
          <div className="section-heading">
            <div className="section-number">06 / SCALE</div>

            <div>
              <h2>How should it sit in the space?</h2>
              <p>
                Think about the presence of the fixture within the architecture,
                rather than its exact dimensions.
              </p>
            </div>
          </div>

          <div className="scale-grid">
            {SCALE_OPTIONS.map((option) => {
              const active = scale === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`scale-option ${active ? "selected" : ""}`}
                  onClick={() => setScale(option.value)}
                  aria-pressed={active}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div className="section-number">07 / EXPLORE</div>

            <div>
              <h2>Ready to see where it goes?</h2>

              <p>
                Your selections will become the design intent behind the Maven
                concept engine.
              </p>

              <button
                className="primary-button"
                style={{ marginTop: 28 }}
                onClick={createDesignBrief}
                disabled={isInterpreting}
              >
                {isInterpreting
                  ? "Understanding the direction..."
                  : "Explore Design Direction"}
              </button>
            </div>
          </div>
        </section>

        {showBrief && (
          <section className="brief" id="design-brief">
            <div className="brief-header">
              <div className="brief-label">08 / DESIGN BRIEF</div>

              <h2>This is what Maven understands.</h2>

              <p>
                The structured brief below will eventually become the input for
                Maven&apos;s design interpretation and concept generation.
              </p>
            </div>

            <div className="brief-grid">
              <div className="brief-item">
                <span>Project </span>
                <strong>{projectName || "Not specified"}</strong>
              </div>

              <div className="brief-item">
                <span>Location </span>
                <strong>{location || "Not specified"}</strong>
              </div>

              <div className="brief-item">
                <span>Space </span>
                <strong>{space || "Not specified"}</strong>
              </div>

              <div className="brief-item">
                <span>Application </span>
                <strong>
                  {labelFor(application, APPLICATIONS) || "Not specified"}
                </strong>
              </div>

              <div className="brief-item">
                <span>Atmosphere </span>
                <strong>{labelFor(moods, MOODS) || "Not specified"}</strong>
              </div>

              <div className="brief-item">
                <span>Material language </span>
                <strong>
                  {labelFor(materials, MATERIALS) || "Not specified"}
                </strong>
              </div>

              <div className="brief-item">
                <span>Fixture direction </span>
                <strong>
                  {labelFor(fixture, FIXTURES) || "Open to exploration"}
                </strong>
              </div>

              <div className="brief-item">
                <span>Scale </span>
                <strong>
                  {labelFor(scale ? [scale] : [], SCALE_OPTIONS) ||
                    "Not specified"}
                </strong>
              </div>
            </div>

            {isInterpreting && (
              <div className="brief-interpretation">
                <span>Maven Design Interpreter</span>
                <p>Understanding the architectural and material direction...</p>
              </div>
            )}

            {interpretError && (
              <div className="brief-interpretation">
                <span>Something went wrong</span>
                <p>{interpretError}</p>
              </div>
            )}

            {interpretation && (
              <>
                <div className="brief-interpretation">
                  <span>Design character</span>
                  <p>{interpretation.designCharacter}</p>
                </div>

                <div className="brief-grid">
                  <div className="brief-item">
                    <span>Form direction </span>
                    <strong>{interpretation.formDirection}</strong>
                  </div>

                  <div className="brief-item">
                    <span>Material direction </span>
                    <strong>{interpretation.materialDirection}</strong>
                  </div>

                  <div className="brief-item">
                    <span>Proportion & scale </span>
                    <strong>{interpretation.proportionAndScale}</strong>
                  </div>

                  <div className="brief-item">
                    <span>Lighting character </span>
                    <strong>{interpretation.lightingCharacter}</strong>
                  </div>

                  <div className="brief-item">
                    <span>Visual language </span>
                    <strong>{interpretation.visualLanguage}</strong>
                  </div>

                  <div className="brief-item">
                    <span>Architectural intent </span>
                    <strong>{interpretation.architecturalIntent}</strong>
                  </div>
                </div>

                <div className="brief-interpretation">
                  <span>Reference interpretation</span>
                  <p>{interpretation.referenceInterpretation}</p>
                </div>

                <div className="brief-interpretation">
                  <span>Direction for concept generation</span>
                  <p>{interpretation.generationDirection}</p>
                </div>
              </>
            )}

            <div className="brief-action">
              <button className="primary-button" disabled>
                Explore Concepts · Coming Next
              </button>
            </div>
          </section>
        )}

        <footer className="footer">
          <div>MAVEN DECORATIVES</div>
          <div style={{ marginTop: 8 }}>
            Bespoke decorative lighting · Hospitality · India
          </div>
        </footer>
      </div>
    </main>
  );
}