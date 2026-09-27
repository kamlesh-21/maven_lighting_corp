// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import type {
  DesignConcept,
  DesignInterpretation,
} from "@/app/lib/design/types";
import ConceptVisual from "@/app/components/ConceptVisual";
import OptionGrid from "@/app/components/OptionGrid";
import type { DesignIntent } from "@/app/lib/design/types";
import ConceptWorkspace from "@/app/components/ConceptWorkspace";
import { createMavenConceptId } from "@/app/lib/design/productId";

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

const MAVEN_PROCESS_STEPS = [
  "SPACE",
  "ATMOSPHERE",
  "MATERIAL",
  "REFERENCE",
  "PROPORTION",
  "FORM",
  "LIGHT",
  "ARCHITECTURAL CONTEXT",
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

  const [concepts, setConcepts] = useState<DesignConcept[]>([]);
  const [isGeneratingConcepts, setIsGeneratingConcepts] = useState(false);
  const [conceptError, setConceptError] = useState("");
  const [selectedConcept, setSelectedConcept] =
    useState<string | null>(null);

  const [showConceptWorkspace, setShowConceptWorkspace] =
    useState(false);

    const [showFeasibility, setShowFeasibility] =
    useState(false);

  const [feasibilitySubmitted, setFeasibilitySubmitted] =
    useState(false);

  const [feasibilitySubmitting, setFeasibilitySubmitting] =
    useState(false);

  const [feasibilityError, setFeasibilityError] =
    useState("");

  const [feasibilityQuantity, setFeasibilityQuantity] =
    useState("");

  const [feasibilityTimeline, setFeasibilityTimeline] =
    useState("");

  const [feasibilityContactName, setFeasibilityContactName] =
    useState("");

  const [feasibilityContactEmail, setFeasibilityContactEmail] =
    useState("");

  const [feasibilityContactPhone, setFeasibilityContactPhone] =
    useState("");

  const [feasibilityNotes, setFeasibilityNotes] =
    useState("");

  const [processStep, setProcessStep] = useState(0);

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
          interpretation,
          referenceImageData:
            referenceImageData || undefined,
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

  const exploreConcepts = async () => {
    if (!interpretation) {
      return;
    }

    setIsGeneratingConcepts(true);
    setConceptError("");
    setConcepts([]);
    setSelectedConcept(null);
    setProcessStep(0);

    const processInterval = window.setInterval(() => {
      setProcessStep((current) => {
        if (current >= MAVEN_PROCESS_STEPS.length - 1) {
          return current;
        }

        return current + 1;
      });
    }, 700);

    let referenceImageData = "";
    if (referenceUrl) {
      const response = await fetch(referenceUrl);
      const blob = await response.blob();

      referenceImageData =
        await new Promise<string>(
          (resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () =>
              resolve(reader.result as string);

            reader.onerror = reject;

            reader.readAsDataURL(blob);
          }
        );
    }

    try {
      const response = await fetch("/api/concepts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          designIntent,
          interpretation,
          referenceImageData:
            referenceImageData || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to create design concepts."
        );
      }

      setProcessStep(MAVEN_PROCESS_STEPS.length - 1);

      await new Promise((resolve) => setTimeout(resolve, 700));

      setConcepts(data.concepts);

      window.setTimeout(() => {
        document
          .getElementById("concept-directions")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      setConceptError(
        error instanceof Error
          ? error.message
          : "Unable to create design concepts."
      );
    } finally {
      window.clearInterval(processInterval);
      setIsGeneratingConcepts(false);
    }
  };

const submitFeasibilityRequest = async () => {
  if (feasibilitySubmitting) {
    return;
  }

  if (
    !feasibilityContactName.trim() ||
    !feasibilityContactEmail.trim() ||
    !feasibilityContactPhone.trim()
  ) {
    setFeasibilityError(
      "Please provide your name, email address and phone number."
    );
    return;
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      feasibilityContactEmail.trim()
    )
  ) {
    setFeasibilityError(
      "Please provide a valid email address."
    );
    return;
  }

  const concept = concepts.find(
    (item) => item.id === selectedConcept
  );

  if (!concept) {
    setFeasibilityError(
      "The selected Maven concept could not be found."
    );
    return;
  }

  setFeasibilitySubmitting(true);
  setFeasibilityError("");

  try {
    const response = await fetch(
      "/api/feasibility",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            name: feasibilityContactName.trim(),
            email: feasibilityContactEmail
              .trim()
              .toLowerCase(),
            phone: feasibilityContactPhone.trim(),
          },

          project: {
            name: designIntent.project.name,
            location: designIntent.project.location,
            space: designIntent.project.space,
          },

          requirement: {
            quantity: feasibilityQuantity.trim(),
            timeline: feasibilityTimeline.trim(),
            notes: feasibilityNotes.trim(),
          },

          concept: {
            id: concept.id,
            number: concept.number,
            title: concept.title,
            subtitle: concept.subtitle,
            description: concept.description,
            form: concept.form,
            material: concept.material,
            lighting: concept.lighting,
            architecturalRole:
              concept.architecturalRole,
          },

          designIntent,
        }),
      }
    );

    const data = await response
      .json()
      .catch(() => ({}));

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "Too many requests. Please wait before trying again."
        );
      }

      if (response.status === 413) {
        throw new Error(
          "The request is too large."
        );
      }

      throw new Error(
        data.error ||
          "Unable to submit the feasibility request."
      );
    }

    if (!data.success) {
      throw new Error(
        "Maven did not confirm the request."
      );
    }

    setFeasibilitySubmitted(true);
  } catch (error) {
    console.error(
      "Maven feasibility submission error:",
      error
    );

    setFeasibilityError(
      error instanceof Error
        ? error.message
        : "We could not submit the request right now. Please try again."
    );
  } finally {
    setFeasibilitySubmitting(false);
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
          <section className="section" id="design-brief">
            <div className="section-heading">
              <div className="section-number">08 / MAVEN INTERPRETATION</div>

              <div>
                <h2>Maven understands the direction.</h2>

                <p>
                  Your references, material cues, atmosphere and architectural context
                  are considered together to develop an original lighting direction.
                </p>
              </div>
            </div>

            {isInterpreting && (
              <div className="maven-process">
                <div className="maven-process-label">
                  MAVEN / DESIGN PROCESS
                </div>

                <div className="maven-process-stage">
                  <span>
                    {MAVEN_PROCESS_STEPS[processStep]}
                  </span>
                </div>

                <div className="maven-process-trail">
                  {MAVEN_PROCESS_STEPS.map((step, index) => (
                    <span
                      key={step}
                      className={
                        index <= processStep ? "active" : ""
                      }
                    >
                      {step}
                    </span>
                  ))}
                </div>

                <p className="maven-process-note">
                  Developing the design language from the information provided.
                </p>
              </div>
            )}

            {interpretError && (
              <div className="brief-interpretation">
                <span>Something went wrong</span>
                <p>{interpretError}</p>
              </div>
            )}

            {interpretation && !isInterpreting && (
              <>
                <div className="maven-understanding">
                  <div className="maven-understanding-label">
                    THE MAVEN READING
                  </div>

                  <p>{interpretation.designCharacter}</p>
                </div>

                <div className="maven-direction-summary">
                  <div>
                    <span>Form</span>
                    <p>{interpretation.formDirection}</p>
                  </div>

                  <div>
                    <span>Material</span>
                    <p>{interpretation.materialDirection}</p>
                  </div>

                  <div>
                    <span>Proportion</span>
                    <p>{interpretation.proportionAndScale}</p>
                  </div>

                  <div>
                    <span>Light</span>
                    <p>{interpretation.lightingCharacter}</p>
                  </div>
                </div>

                <div className="maven-process-reference">
                  <span>REFERENCE + ARCHITECTURAL READING</span>
                  <p>
                    {interpretation.referenceInterpretation}
                  </p>
                </div>

                <div className="brief-action">
                  <p>
                    Maven has developed the underlying design direction.
                    The next step is to explore how that direction could become
                    a fixture.
                  </p>

                  <button
                    className="primary-button"
                    onClick={exploreConcepts}
                    disabled={isGeneratingConcepts}
                  >
                    {isGeneratingConcepts
                      ? "Developing concepts..."
                      : "Explore Concepts"}
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        <section
          className="section concept-section"
          id="concept-directions"
        >
          <div className="section-heading">
            <div className="section-number">
              09 / DESIGN DIRECTIONS
            </div>

            <div>
              <h2>Three ways the idea could become a fixture.</h2>

              <p>
                Maven has interpreted the direction and developed three distinct
                possibilities. They are starting points for further design,
                not final products.
              </p>
            </div>
          </div>

          {isGeneratingConcepts && (
            <div className="maven-process concept-process">
              <div className="maven-process-label">
                MAVEN / CONCEPT DEVELOPMENT
              </div>

              <div className="maven-process-stage">
                <span>
                  {MAVEN_PROCESS_STEPS[processStep]}
                </span>
              </div>

              <div className="maven-process-trail">
                {MAVEN_PROCESS_STEPS.map((step, index) => (
                  <span
                    key={step}
                    className={
                      index <= processStep ? "active" : ""
                    }
                  >
                    {step}
                  </span>
                ))}
              </div>

              <p className="maven-process-note">
                Developing three distinct design interpretations.
              </p>
            </div>
          )}

          {conceptError && (
            <div className="brief-interpretation">
              <span>Something went wrong</span>
              <p>{conceptError}</p>
            </div>
          )}

          {concepts.length > 0 && (
            <>
              <div className="concept-grid">
                {concepts.map((concept) => {
                  const selected =
                    selectedConcept === concept.id;

                  return (
                    <article
                      key={concept.id}
                      className={`concept-card ${
                        selected ? "selected" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="concept-select"
                        onClick={() =>
                          setSelectedConcept(concept.id)
                        }
                        aria-pressed={selected}
                      >
                        <div className="concept-number">
                          {concept.number}
                        </div>

                        <ConceptVisual
                          type={concept.visualType}
                          imageUrl={concept.imageUrl}
                          title={concept.title}
                        />

                        <div className="concept-card-content">
                          <div className="concept-label">
                            Maven direction
                          </div>

                          <h3>{concept.title}</h3>

                          <p className="concept-subtitle">
                            {concept.subtitle}
                          </p>

                          <p className="concept-description">
                            {concept.description}
                          </p>
                        </div>
                      </button>

                      <div className="concept-details">
                        <div>
                          <span>Form</span>
                          <p>{concept.form}</p>
                        </div>

                        <div>
                          <span>Material</span>
                          <p>{concept.material}</p>
                        </div>

                        <div>
                          <span>Light</span>
                          <p>{concept.lighting}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="concept-selection">
                <span>Next</span>

                {selectedConcept ? (
                  <>
                    <p>
                      Continue with the{" "}
                      <strong>
                        {
                          concepts.find(
                            (concept) =>
                              concept.id === selectedConcept
                          )?.title
                        }
                      </strong>{" "}
                      direction.
                    </p>

                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => {
                        setShowConceptWorkspace(true);

                        window.setTimeout(() => {
                          document
                            .getElementById("maven-concept")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }, 100);
                      }}
                    >
                      Continue with this direction
                    </button>
                  </>
                ) : (
                  <p>
                    Select the direction that feels closest to the
                    project.
                  </p>
                )}
              </div>
            </>
          )}
        </section>

        {showConceptWorkspace && selectedConcept && (
          (() => {
            const concept = concepts.find(
              (item) => item.id === selectedConcept
            );

            if (!concept) {
              return null;
            }

            return (
              <ConceptWorkspace
                concept={concept}
                designIntent={designIntent}
                onRequestFeasibility={() => {
                  setShowFeasibility(true);
                  setFeasibilitySubmitted(false);
                  setFeasibilityError("");

                  window.setTimeout(() => {
                    document
                      .getElementById("feasibility")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }, 100);
                }}
              />
            );
          })()
        )}

        {showFeasibility && selectedConcept && (
          (() => {
            const concept = concepts.find(
              (item) => item.id === selectedConcept
            );

            if (!concept) {
              return null;
            }

            return (
              <section
                className="section feasibility-section"
                id="feasibility"
              >
                <div className="section-heading">
                  <div className="section-number">
                    06 / FEASIBILITY & PRICING
                  </div>

                  <div>
                    <h2>
                      Let’s take this concept further.
                    </h2>

                    <p>
                      Share the project requirements and Maven
                      will review the selected direction for
                      feasibility and pricing.
                    </p>
                  </div>
                </div>

                {!feasibilitySubmitted ? (
                  <>
                    <div className="feasibility-summary">
                      <div className="feasibility-summary-image">
                        <ConceptVisual
                          type={concept.visualType}
                          imageUrl={concept.imageUrl}
                          title={concept.title}
                        />
                      </div>

                      <div className="feasibility-summary-content">
                        <span>
                          SELECTED MAVEN CONCEPT
                        </span>

                        <h3>{concept.title}</h3>

                        <p>{concept.subtitle}</p>

                        <div className="feasibility-project">
                          <div>
                            <span>Project</span>
                            <strong>
                              {designIntent.project.name ||
                                "Not specified"}
                            </strong>
                          </div>

                          <div>
                            <span>Location</span>
                            <strong>
                              {designIntent.project.location ||
                                "Not specified"}
                            </strong>
                          </div>

                          <div>
                            <span>Space</span>
                            <strong>
                              {designIntent.project.space ||
                                "Not specified"}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="feasibility-form">
                      <div className="feasibility-form-heading">
                        <span>
                          PROJECT REQUIREMENT
                        </span>

                        <p>
                          You do not need to provide technical
                          specifications at this stage. Maven
                          will review those as part of the
                          feasibility process.
                        </p>
                      </div>

                      <div className="context-grid">
                        <label className="context-field">
                          <span>
                            Approximate quantity
                          </span>

                          <input
                            type="text"
                            value={feasibilityQuantity}
                            onChange={(event) =>
                              setFeasibilityQuantity(
                                event.target.value
                              )
                            }
                            placeholder="e.g. 18 fixtures"
                          />
                        </label>

                        <label className="context-field">
                          <span>
                            Required timeline
                          </span>

                          <input
                            type="text"
                            value={feasibilityTimeline}
                            onChange={(event) =>
                              setFeasibilityTimeline(
                                event.target.value
                              )
                            }
                            placeholder="e.g. Installation by March 2027"
                          />
                        </label>
                      </div>

                      <div className="feasibility-form-heading">
                        <span>
                          YOUR DETAILS
                        </span>

                        <p>
                          So Maven knows who to respond to.
                        </p>
                      </div>

                      <div className="context-grid">
                        <label className="context-field">
                          <span>Name</span>

                          <input
                            type="text"
                            value={feasibilityContactName}
                            onChange={(event) =>
                              setFeasibilityContactName(
                                event.target.value
                              )
                            }
                            placeholder="Your name"
                          />
                        </label>

                        <label className="context-field">
                          <span>Email</span>

                          <input
                            type="email"
                            value={feasibilityContactEmail}
                            onChange={(event) =>
                              setFeasibilityContactEmail(
                                event.target.value
                              )
                            }
                            placeholder="you@studio.com"
                          />
                        </label>

                        <label className="context-field">
                          <span>Phone</span>

                          <input
                            type="tel"
                            value={feasibilityContactPhone}
                            onChange={(event) =>
                              setFeasibilityContactPhone(
                                event.target.value
                              )
                            }
                            placeholder="+91"
                          />
                        </label>
                      </div>

                      <label className="context-field feasibility-notes">
                        <span>
                          Anything Maven should know?
                        </span>

                        <textarea
                          value={feasibilityNotes}
                          onChange={(event) =>
                            setFeasibilityNotes(
                              event.target.value
                            )
                          }
                          placeholder="For example: ceiling height, preferred finish, installation constraints, budget considerations, or anything else relevant to the requirement."
                          rows={6}
                        />
                      </label>

                      {feasibilityError && (
                        <div className="brief-interpretation">
                          <span>
                            Unable to submit
                          </span>

                          <p>
                            {feasibilityError}
                          </p>
                        </div>
                      )}

                      <div className="feasibility-submit">
                        <div>
                          <span>
                            MAVEN / FEASIBILITY REVIEW
                          </span>

                          <p>
                            Maven will review the selected
                            concept, project context and
                            requirement before responding
                            with feasibility and pricing.
                          </p>
                        </div>

                        <button
                          className="primary-button"
                          type="button"
                          onClick={
                            submitFeasibilityRequest
                          }
                          disabled={
                            feasibilitySubmitting
                          }
                        >
                          {feasibilitySubmitting
                            ? "Submitting request..."
                            : "Submit Feasibility Request"}
                        </button>
                      </div>

                      <p className="feasibility-disclaimer">
                        AI-generated concept. Final dimensions,
                        materials, construction and technical
                        details are subject to Maven feasibility
                        review.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="feasibility-success">
                    <span>
                      MAVEN / REQUEST RECEIVED
                    </span>

                    <h3>
                      Feasibility request submitted.
                    </h3>

                    <p>
                      Maven has received the selected concept
                      and project requirement. We will review
                      the design direction, materials,
                      construction approach and commercial
                      requirements before responding.
                    </p>

                    <div className="feasibility-success-project">
                      <span>PROJECT</span>

                      <strong>
                        {designIntent.project.name ||
                          "Maven Project"}
                      </strong>
                    </div>

                    <div className="feasibility-success-project">
                      <span>SELECTED DIRECTION</span>

                      <strong>
                        {concept.title}
                      </strong>
                    </div>
                  </div>
                )}
              </section>
            );
          })()
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