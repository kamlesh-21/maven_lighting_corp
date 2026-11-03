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
    const card = trackRef.current?.querySelector<HTMLElement>(".hof-card");
    const step = card ? (card.offsetWidth + 20) * 4 : 1200;

    trackRef.current?.scrollBy({
      left: direction * step,
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
        <div className="hof-head">
          <div>
            <p className="eyebrow">HALL OF FAME</p>

            <div className="hof-intro">
              <h2 id="hof-title">
                The inspiration behind
                <br />
                our bespoke work.
              </h2>

              <p>
                Designers and ateliers whose thinking shapes our work, and what
                we consider when developing each fixture.
              </p>
            </div>
          </div>

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
              <p className="hof-cap">{designer.period}</p>

              <h3>{designer.name}</h3>

              <div className="hof-block">
                <span>BEHIND THE FORM</span>

                <ul>
                  {designer.developmentConsiderations.slice(0, 3).map((item, itemIndex) => (
                    <li key={`${designer.slug}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
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