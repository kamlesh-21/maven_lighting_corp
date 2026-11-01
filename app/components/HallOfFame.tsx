"use client";

import { useRef } from "react";
import { designers } from "../data/hallOfFame";
import Interpretation from "./Interpretation";

const ORDER = [
  "alexander-calder",
  "venini",
  "serge-mouille",
  "saint-louis",
  "poul-henningsen",
  "carlo-scarpa",
  "gino-sarfatti",
  "barovier-toso",
  "seguso",
  "mathieu-lustrerie",
  "alexander-lamont",
  "diego-giacometti",
  "ochre",
  "apparatus",
  "charles-burnand",
  "pinto",
];

export default function HallOfFame() {
  const trackRef = useRef<HTMLDivElement>(null);

  const orderedDesigners = [...designers].sort((a, b) => {
    const ai = ORDER.indexOf(a.slug);
    const bi = ORDER.indexOf(b.slug);

    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const scrollCards = (direction: number) => {
    trackRef.current?.scrollBy({
      left: direction * 620,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="section hof"
      id="hall-of-fame"
      aria-labelledby="hof-title"
    >
      <div className="container">
        <p className="eyebrow">HALL OF FAME</p>

        <div className="hof-intro">
          <h2 id="hof-title">
            The inspiration behind
            <br />
            our bespoke work.
          </h2>

          <p>
            An exploration of designers, ateliers and craft traditions that
            have shaped decorative lighting. These references inform how we
            approach light, form, material, craftsmanship and detail.
          </p>
        </div>
      </div>

      <div
        className="hof-track"
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Designers and ateliers. Scroll horizontally."
      >
        {orderedDesigners.map((designer, index) => (
          <article className="hof-card" key={designer.slug}>
            <div className="hof-art">
              <Interpretation
                kind={designer.kind}
                label={`Original Maven design interpretation informed by ${designer.name}`}
              />

              <span className="hof-no">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="hof-card-content">
              <p className="hof-cap">{designer.discipline}</p>

              <h3>{designer.name}</h3>

              <p className="hof-meta">{designer.period}</p>

              <div className="hof-inspires">
                <span>MAVEN CONCEPT DIRECTION</span>
                <p>{designer.mavenInterpretation}</p>
              </div>

              <div className="hof-eng">
                <span>WHAT WE ENGINEER</span>
                <ul>
                  {designer.developmentConsiderations.map((item, itemIndex) => (
                    <li key={`${designer.slug}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="container hof-bottom-controls">
        <span>Explore {designers.length} design references</span>

        <div className="hof-controls">
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            aria-label="Previous references"
          >
            &#8592;
          </button>

          <button
            type="button"
            onClick={() => scrollCards(1)}
            aria-label="Next references"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="container">
        <p className="hof-legal">
          Illustrations are original Maven design interpretations of the
          principles discussed, not works by the designers named. Names and
          works belong to their respective creators. No affiliation or
          endorsement is implied.
        </p>
      </div>
    </section>
  );
}


