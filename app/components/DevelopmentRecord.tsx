// import Link from "next/link";

// export default function DevelopmentRecord() {
//   return (
//     <section
//       className="section development-record-section"
//       id="development-record"
//     >
//       <div className="container">
//         <div className="development-intro">
//           <p className="eyebrow">TECHNICAL DEVELOPMENT</p>

//           <div className="development-intro-grid">
//             <h2>
//               Before production,
//               <br />
//               the decisions are
//               <br />
//               made visible.
//             </h2>

//             <p>
//               A reference is only the starting point. For bespoke fixtures,
//               we work through component layout, dimensions, materials,
//               weight, mounting, light and manufacturing considerations.
//               The objective is to resolve questions before they become
//               production or installation problems.
//             </p>
//           </div>
//         </div>

//         <div className="development-sheet">
//           {/* DOCUMENT HEADER */}

//           <div className="development-sheet-header">
//             <div className="development-wordmark">
//               <span>MAVEN</span>
//               <small>DECORATIVES</small>
//             </div>

//             <div className="development-document-title">
//               <p>ILLUSTRATIVE DOCUMENT FRAMEWORK</p>
//               <h3>Fixture Development Record</h3>
//               <span>
//                 From visual reference to manufacturing coordination
//               </span>
//             </div>

//             <div className="development-document-status">
//               <span>DOCUMENT STAGE</span>
//               <strong>Development</strong>
//               <span>DATA STATUS</span>
//               <strong>Project-specific</strong>
//             </div>
//           </div>

//           {/* VISUAL DEVELOPMENT PANELS */}

//           <div className="development-visual-grid">
//             <article className="development-panel">
//               <div className="development-panel-heading">
//                 <span>01</span>
//                 <h4>Reference & intent</h4>
//               </div>

//               <div className="development-reference-image">
//                 <img
//                   src="/images/cat-chandeliers.png"
//                   alt="Decorative chandelier reference example"
//                 />
//               </div>

//               <div className="development-panel-copy">
//                 <strong>What must the fixture achieve?</strong>
//                 <p>
//                   Visual character, scale, light distribution, material
//                   language and relationship with the surrounding space.
//                 </p>
//               </div>

//               <div className="development-tags">
//                 <span>Design intent</span>
//                 <span>Context</span>
//                 <span>Proportion</span>
//               </div>
//             </article>

//             <article className="development-panel">
//               <div className="development-panel-heading">
//                 <span>02</span>
//                 <h4>Component layout</h4>
//               </div>

//               <div className="development-diagram">
//                 <svg
//                   viewBox="0 0 320 190"
//                   role="img"
//                   aria-label="Schematic top-view component layout"
//                 >
//                   <circle
//                     cx="150"
//                     cy="82"
//                     r="61"
//                     className="diagram-outline"
//                   />
//                   <circle
//                     cx="150"
//                     cy="82"
//                     r="39"
//                     className="diagram-guide"
//                   />
//                   <circle
//                     cx="150"
//                     cy="82"
//                     r="17"
//                     className="diagram-guide"
//                   />

//                   {Array.from({ length: 48 }, (_, i) => {
//                     const angle = (i / 48) * Math.PI * 2;
//                     const radius = i % 2 === 0 ? 53 : 43;

//                     return (
//                       <circle
//                         key={i}
//                         cx={150 + Math.cos(angle) * radius}
//                         cy={82 + Math.sin(angle) * radius}
//                         r="2.6"
//                         className="diagram-component"
//                       />
//                     );
//                   })}

//                   <line
//                     x1="78"
//                     y1="82"
//                     x2="222"
//                     y2="82"
//                     className="diagram-axis"
//                   />
//                   <line
//                     x1="150"
//                     y1="10"
//                     x2="150"
//                     y2="154"
//                     className="diagram-axis"
//                   />

//                   <line
//                     x1="89"
//                     y1="165"
//                     x2="211"
//                     y2="165"
//                     className="diagram-dimension"
//                   />
//                   <line
//                     x1="89"
//                     y1="159"
//                     x2="89"
//                     y2="171"
//                     className="diagram-dimension"
//                   />
//                   <line
//                     x1="211"
//                     y1="159"
//                     x2="211"
//                     y2="171"
//                     className="diagram-dimension"
//                   />

//                   <text
//                     x="150"
//                     y="183"
//                     textAnchor="middle"
//                     className="diagram-text"
//                   >
//                     OVERALL ENVELOPE
//                   </text>
//                 </svg>

//                 <p className="diagram-caption">
//                   TOP VIEW · COMPONENT DISTRIBUTION
//                 </p>
//               </div>

//               <div className="development-diagram development-side-diagram">
//                 <svg
//                   viewBox="0 0 320 145"
//                   role="img"
//                   aria-label="Schematic side elevation showing varied component drops"
//                 >
//                   <line
//                     x1="28"
//                     y1="25"
//                     x2="292"
//                     y2="25"
//                     className="diagram-metal"
//                   />

//                   {Array.from({ length: 13 }, (_, i) => {
//                     const x = 38 + i * 20;
//                     const drop = 47 + ((i * 29) % 66);

//                     return (
//                       <g key={i}>
//                         <line
//                           x1={x}
//                           y1="26"
//                           x2={x}
//                           y2={26 + drop}
//                           className="diagram-rod"
//                         />
//                         <circle
//                           cx={x}
//                           cy={27 + drop}
//                           r="2.5"
//                           className="diagram-component"
//                         />
//                       </g>
//                     );
//                   })}

//                   <line
//                     x1="28"
//                     y1="126"
//                     x2="292"
//                     y2="126"
//                     className="diagram-guide"
//                   />

//                   <text
//                     x="160"
//                     y="141"
//                     textAnchor="middle"
//                     className="diagram-text"
//                   >
//                     SIDE ELEVATION · DROP VARIATION
//                   </text>
//                 </svg>
//               </div>

//               <p className="development-panel-footnote">
//                 Schematic only. Final count, spacing and dimensions depend
//                 on the approved fixture design.
//               </p>
//             </article>

//             <article className="development-panel">
//               <div className="development-panel-heading">
//                 <span>03</span>
//                 <h4>Construction visualisation</h4>
//               </div>

//               <div className="development-diagram construction-diagram">
//                 <svg
//                   viewBox="0 0 320 250"
//                   role="img"
//                   aria-label="Schematic exploded assembly of a suspended decorative fixture"
//                 >
//                   {/* Ceiling plate */}
//                   <ellipse
//                     cx="146"
//                     cy="29"
//                     rx="66"
//                     ry="13"
//                     className="diagram-metal-fill"
//                   />
//                   <ellipse
//                     cx="146"
//                     cy="29"
//                     rx="42"
//                     ry="7"
//                     className="diagram-cutout"
//                   />

//                   {/* Suspension */}
//                   {[94, 129, 164, 199].map((x) => (
//                     <line
//                       key={x}
//                       x1={x}
//                       y1="39"
//                       x2={x}
//                       y2="77"
//                       className="diagram-cable"
//                     />
//                   ))}

//                   {/* Main frame */}
//                   <ellipse
//                     cx="146"
//                     cy="80"
//                     rx="78"
//                     ry="15"
//                     className="diagram-outline"
//                   />

//                   {/* Vertical components */}
//                   {Array.from({ length: 11 }, (_, i) => {
//                     const x = 76 + i * 14;
//                     const drop = 44 + ((i * 17) % 67);

//                     return (
//                       <line
//                         key={i}
//                         x1={x}
//                         y1="84"
//                         x2={x}
//                         y2={84 + drop}
//                         className="diagram-rod"
//                       />
//                     );
//                   })}

//                   {/* Lower structural outline */}
//                   <ellipse
//                     cx="146"
//                     cy="157"
//                     rx="65"
//                     ry="12"
//                     className="diagram-outline"
//                   />

//                   {/* Assembly indicators */}
//                   <line
//                     x1="231"
//                     y1="29"
//                     x2="272"
//                     y2="29"
//                     className="diagram-leader"
//                   />
//                   <text x="275" y="26" className="diagram-text">
//                     PLATE
//                   </text>

//                   <line
//                     x1="224"
//                     y1="80"
//                     x2="272"
//                     y2="80"
//                     className="diagram-leader"
//                   />
//                   <text x="275" y="77" className="diagram-text">
//                     FRAME
//                   </text>

//                   <line
//                     x1="210"
//                     y1="129"
//                     x2="272"
//                     y2="129"
//                     className="diagram-leader"
//                   />
//                   <text x="275" y="126" className="diagram-text">
//                     RODS
//                   </text>

//                   <text
//                     x="146"
//                     y="207"
//                     textAnchor="middle"
//                     className="diagram-text"
//                   >
//                     ASSEMBLY CONCEPT
//                   </text>
//                   <text
//                     x="146"
//                     y="224"
//                     textAnchor="middle"
//                     className="diagram-text-muted"
//                   >
//                     Interfaces resolved before production
//                   </text>
//                 </svg>
//               </div>

//               <div className="development-panel-copy">
//                 <strong>How will it be made and installed?</strong>
//                 <p>
//                   Construction, joints, suspension interfaces, assembly,
//                   access and replaceability are considered against the
//                   particular design.
//                 </p>
//               </div>
//             </article>
//           </div>

//           {/* TECHNICAL SPECIFICATION AND RISK REVIEW */}

//           <div className="development-detail-grid">
//             <article className="development-panel">
//               <div className="development-panel-heading">
//                 <span>04</span>
//                 <h4>Technical specification</h4>
//               </div>

//               <div className="development-table-wrap">
//                 <table className="development-table">
//                   <tbody>
//                     <tr>
//                       <th>Geometry</th>
//                       <td>
//                         Dimensions, drop, spacing and component layout
//                       </td>
//                     </tr>
//                     <tr>
//                       <th>Weight</th>
//                       <td>
//                         Component-based estimate, followed by
//                         manufacturer reconciliation
//                       </td>
//                     </tr>
//                     <tr>
//                       <th>Materials</th>
//                       <td>
//                         Material grade, glass type, finish and
//                         approved sample
//                       </td>
//                     </tr>
//                     <tr>
//                       <th>Lighting</th>
//                       <td>
//                         LED module, CCT, CRI and output, as specified
//                       </td>
//                     </tr>
//                     <tr>
//                       <th>Electrical</th>
//                       <td>
//                         Driver, voltage, current, wattage and dimming
//                         compatibility
//                       </td>
//                     </tr>
//                     <tr>
//                       <th>Mounting</th>
//                       <td>
//                         Fixing interface, suspension and access
//                         requirements
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <p className="development-panel-footnote">
//                 Values are confirmed against the selected components,
//                 manufacturer information and project requirements.
//               </p>
//             </article>

//             <article className="development-panel">
//               <div className="development-panel-heading">
//                 <span>05</span>
//                 <h4>Risk profiling & mitigation</h4>
//               </div>

//               <div className="development-risk-list">
//                 <div>
//                   <span className="risk-number">R1</span>
//                   <div>
//                     <strong>Weight & suspension</strong>
//                     <p>
//                       Establish the finished fixture weight and coordinate
//                       the fixing arrangement with the responsible project
//                       team.
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <span className="risk-number">R2</span>
//                   <div>
//                     <strong>Replacement access</strong>
//                     <p>
//                       Review how drivers, LED modules and serviceable
//                       components can be accessed or replaced.
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <span className="risk-number">R3</span>
//                   <div>
//                     <strong>Material & finish consistency</strong>
//                     <p>
//                       Confirm samples, finish references and agreed
//                       acceptance criteria before batch production.
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <span className="risk-number">R4</span>
//                   <div>
//                     <strong>Manufacturing feasibility</strong>
//                     <p>
//                       Identify specialist components, fabrication
//                       constraints and lead-time dependencies early.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <p className="development-panel-footnote">
//                 Risks and mitigation measures are specific to each design;
//                 engineering verification is obtained wherever required.
//               </p>
//             </article>

//             <article className="development-panel">
//               <div className="development-panel-heading">
//                 <span>06</span>
//                 <h4>Scope & inclusions</h4>
//               </div>

//               <p className="development-scope-intro">
//                 The agreed supply and documentation scope is recorded
//                 before the order proceeds.
//               </p>

//               <ul className="development-check-list">
//                 <li>Fixture and component schedule</li>
//                 <li>Materials and finish specifications</li>
//                 <li>Drawings and approval records, as agreed</li>
//                 <li>Electrical and mounting details</li>
//                 <li>Packaging, delivery and installation scope</li>
//                 <li>Defined exclusions and dependencies</li>
//               </ul>

//               <div className="development-scope-note">
//                 <strong>Commercial quotation</strong>
//                 <p>
//                   Pricing is issued against the agreed specification,
//                   quantities, supply scope and delivery requirements.
//                 </p>
//               </div>
//             </article>
//           </div>

//           {/* TECHNICAL HANDOVER */}

//           <div className="development-handover">
//             <div className="development-handover-heading">
//               <div>
//                 <p>07 / TECHNICAL HANDOVER</p>
//                 <h4>Information that stays with the fixture.</h4>
//               </div>

//               <span>SUBJECT TO AGREED PROJECT SCOPE</span>
//             </div>

//             <div className="development-handover-grid">
//               <article>
//                 <span className="handover-icon">01</span>
//                 <strong>As-built information</strong>
//                 <p>
//                   Final dimensions, mounting details and approved
//                   construction references.
//                 </p>
//               </article>

//               <article>
//                 <span className="handover-icon">02</span>
//                 <strong>Electrical record</strong>
//                 <p>
//                   Confirmed driver and light-source details, electrical
//                   ratings and dimming information.
//                 </p>
//               </article>

//               <article>
//                 <span className="handover-icon">03</span>
//                 <strong>Replacement parts</strong>
//                 <p>
//                   Identification of serviceable components and relevant
//                   replacement references.
//                 </p>
//               </article>

//               <article>
//                 <span className="handover-icon">04</span>
//                 <strong>Installation & care</strong>
//                 <p>
//                   Applicable installation guidance, cleaning instructions
//                   and maintenance information.
//                 </p>
//               </article>
//             </div>
//           </div>

//           <div className="development-sheet-footer">
//             <span>
//               DESIGN DEVELOPMENT · MANUFACTURING COORDINATION · HANDOVER
//             </span>
//             <span>MAVEN DECORATIVES</span>
//           </div>
//         </div>

//         <div className="development-record-bottom">
//           <p>
//             Every fixture is different. Calculations, technical values and
//             production details are finalised against the relevant design,
//             selected components and manufacturer confirmations.
//           </p>

//           <Link href="#contact" className="development-record-link">
//             Discuss a fixture requirement <span>→</span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";

const fixture = {
  title: "Illustrative Circular Pendant",
  diameterMm: 1800,
  dropMm: 1200,

  // Illustrative geometry, not a manufacturing drawing.
  rings: [
    { name: "Ring 1", count: 12, radiusMm: 250 },
    { name: "Ring 2", count: 24, radiusMm: 520 },
    { name: "Ring 3", count: 36, radiusMm: 800 },
  ],

  // Illustrative inputs, not manufacturer-confirmed values.
  weightRows: [
    { part: "Glass rods", qty: 72, unitKg: 0.85 },
    { part: "SS 304 frame and plate", qty: 1, unitKg: 18.5 },
    { part: "LED modules", qty: 72, unitKg: 0.15 },
    { part: "Drivers and wiring", qty: 1, unitKg: 4.5 },
  ],
};

const totalRods = fixture.rings.reduce(
  (total, ring) => total + ring.count,
  0,
);

const areaM2 =
  Math.PI * Math.pow(fixture.diameterMm / 2000, 2);

const density = totalRods / areaM2;

const weightSubtotal = fixture.weightRows.reduce(
  (total, row) => total + row.qty * row.unitKg,
  0,
);

const mm = (value: number) => `${value.toFixed(0)} mm`;

const kg = (value: number) => `${value.toFixed(2)} kg`;

const pitchMm = (radiusMm: number, count: number) =>
  (2 * Math.PI * radiusMm) / count;

const technicalRows = [
  {
    field: "Geometry",
    value: "Dimensions, drop and component positions",
    status: "Calculated",
  },
  {
    field: "Material",
    value: "Proposed SS 304 and textured glass",
    status: "To confirm",
  },
  {
    field: "Finish",
    value: "Brushed gold appearance",
    status: "Sample approval",
  },
  {
    field: "Light source",
    value: "2700 K / CRI 90+ target",
    status: "Model to confirm",
  },
  {
    field: "Driver and dimming",
    value: "Selected driver and compatible control system",
    status: "To confirm",
  },
  {
    field: "Mounting",
    value: "Suspension arrangement and fixing interfaces",
    status: "Engineering review",
  },
];

const risks = [
  {
    area: "Weight and suspension",
    issue: "Final mass and ceiling fixing requirements",
    response: "Reconcile component masses and coordinate fixing review",
  },
  {
    area: "Glass availability",
    issue: "Custom sizes, finish variation and lead time",
    response: "Confirm sample and supplier capability before approval",
  },
  {
    area: "Electrical components",
    issue: "Driver compatibility and future replacement",
    response: "Confirm the selected model, controls and access method",
  },
  {
    area: "Installation",
    issue: "Access, assembly sequence and site conditions",
    response: "Coordinate the installation drawing and site interfaces",
  },
];

export default function DevelopmentRecord() {
  return (
    <section
      className="section development-record-section"
      id="development-record"
    >
      <div className="container">
        <div className="development-intro">
          <p className="eyebrow">
            TECHNICAL DEVELOPMENT
          </p>

          <div className="development-intro-grid">
            <h2>
              Before production,
              <br />
              the decisions are
              <br />
              made visible.
            </h2>

            <p>
              An illustrative view of how a visual reference is
              developed into a fixture-specific technical record.
              Dimensions, construction, component selection,
              manufacturing risks and handover requirements are
              addressed before the project proceeds.
            </p>
          </div>
        </div>

        <div className="development-sheet">
          <header className="development-sheet-header">
            <div className="development-wordmark">
              <span>MAVEN</span>
              <small>DECORATIVES</small>
            </div>

            <div className="development-document-title">
              <p>ILLUSTRATIVE EXAMPLE</p>
              <h3>Fixture Development Record</h3>
              <span>
                Design development, manufacturing coordination
                and technical handover
              </span>
            </div>

            <div className="development-document-status">
              <span>RECORD STATUS</span>
              <strong>For illustration</strong>
              <span>MANUFACTURING STATUS</span>
              <strong>Not approved</strong>
            </div>
          </header>

          <div className="development-visual-grid">
            <article className="development-panel">
              <div className="development-panel-heading">
                <span>01</span>
                <h4>Reference and concept</h4>
              </div>

              <div className="development-reference-placeholder">
                <span>DEDICATED REFERENCE IMAGE</span>
                 <img
                   src="/chn2.jpg"
                   alt="Decorative chandelier reference example"
                 />
              </div>

              <div className="development-panel-copy">
                <strong>{fixture.title}</strong>
                <p>
                  Overall diameter: {mm(fixture.diameterMm)}
                  <br />
                  Overall drop: {mm(fixture.dropMm)}
                  <br />
                  Component count: {totalRods} rods
                </p>
              </div>
            </article>

            <article className="development-panel">
              <div className="development-panel-heading">
                <span>02</span>
                <h4>Component layout and spacing</h4>
              </div>

              <div className="development-diagram">
                <svg
                  viewBox="0 0 320 230"
                  role="img"
                  aria-label="Schematic 72-component layout distributed over three rings"
                >
                  <line
                    x1="35"
                    y1="112"
                    x2="285"
                    y2="112"
                    className="diagram-axis"
                  />
                  <line
                    x1="160"
                    y1="8"
                    x2="160"
                    y2="216"
                    className="diagram-axis"
                  />

                  {fixture.rings.map((ring) => {
                    const displayRadius =
                      (ring.radiusMm / 900) * 94;

                    return (
                      <g key={ring.name}>
                        <circle
                          cx="160"
                          cy="112"
                          r={displayRadius}
                          className="diagram-guide"
                        />

                        {Array.from(
                          { length: ring.count },
                          (_, i) => {
                            const angle =
                              (i / ring.count) * Math.PI * 2;

                            return (
                              <circle
                                key={`${ring.name}-${i}`}
                                cx={
                                  160 +
                                  Math.cos(angle) * displayRadius
                                }
                                cy={
                                  112 +
                                  Math.sin(angle) * displayRadius
                                }
                                r="2.5"
                                className="diagram-component"
                              />
                            );
                          },
                        )}
                      </g>
                    );
                  })}

                  <line
                    x1="66"
                    y1="220"
                    x2="254"
                    y2="220"
                    className="diagram-dimension"
                  />

                  <text
                    x="160"
                    y="209"
                    textAnchor="middle"
                    className="diagram-text"
                  >
                    OVERALL DIAMETER 1800 mm
                  </text>
                </svg>
              </div>

              <div className="development-table-wrap">
                <table className="development-table">
                  <thead>
                    <tr>
                      <th>Ring</th>
                      <th>Count</th>
                      <th>Radius</th>
                      <th>Pitch*</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fixture.rings.map((ring) => (
                      <tr key={ring.name}>
                        <td>{ring.name}</td>
                        <td>{ring.count}</td>
                        <td>{mm(ring.radiusMm)}</td>
                        <td>
                          {pitchMm(
                            ring.radiusMm,
                            ring.count,
                          ).toFixed(1)}{" "}
                          mm
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="development-panel-footnote">
                *Calculated circumferential pitch. Layout is schematic,
                and positions require design and manufacturing review.
                Density: {density.toFixed(1)} rods/m².
              </p>
            </article>

            <article className="development-panel">
              <div className="development-panel-heading">
                <span>03</span>
                <h4>Construction and assembly</h4>
              </div>

              <div className="development-construction-list">
                <div>
                  <span>01</span>
                  <div>
                    <strong>Ceiling interface</strong>
                    <p>Plate, fixing and suspension arrangement</p>
                  </div>
                </div>

                <div>
                  <span>02</span>
                  <div>
                    <strong>Primary structure</strong>
                    <p>Frame, joints and load distribution</p>
                  </div>
                </div>

                <div>
                  <span>03</span>
                  <div>
                    <strong>Lighting assembly</strong>
                    <p>LED modules, drivers and wiring access</p>
                  </div>
                </div>

                <div>
                  <span>04</span>
                  <div>
                    <strong>Decorative components</strong>
                    <p>Glass rods, connectors and replaceability</p>
                  </div>
                </div>
              </div>

              <p className="development-panel-footnote">
                Assembly sequence and connection details must be
                established against the final design and supplier inputs.
              </p>
            </article>
          </div>

          <div className="development-detail-grid">
            <article className="development-panel">
              <div className="development-panel-heading">
                <span>04</span>
                <h4>Technical specification</h4>
              </div>

              <div className="development-table-wrap">
                <table className="development-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Requirement</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicalRows.map((row) => (
                      <tr key={row.field}>
                        <th>{row.field}</th>
                        <td>{row.value}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="development-panel">
              <div className="development-panel-heading">
                <span>05</span>
                <h4>Risk profiling and mitigation</h4>
              </div>

              <div className="development-table-wrap">
                <table className="development-table">
                  <thead>
                    <tr>
                      <th>Area</th>
                      <th>Potential issue</th>
                      <th>Proposed response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((risk) => (
                      <tr key={risk.area}>
                        <th>{risk.area}</th>
                        <td>{risk.issue}</td>
                        <td>{risk.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="development-panel">
              <div className="development-panel-heading">
                <span>06</span>
                <h4>Scope and inclusions</h4>
              </div>

              <ul className="development-check-list">
                <li>Fixture and component schedule</li>
                <li>Materials and finish definition</li>
                <li>Agreed drawings and approval records</li>
                <li>Electrical and mounting coordination</li>
                <li>Packaging and delivery scope</li>
                <li>Explicit exclusions and dependencies</li>
              </ul>

              <div className="development-scope-note">
                <strong>Commercial scope</strong>
                <p>
                  Price, lead time, payment terms and warranty are
                  confirmed in the project-specific quotation.
                </p>
              </div>
            </article>
          </div>

          <div className="development-detail-grid">
            <article className="development-panel">
              <div className="development-panel-heading">
                <span>07</span>
                <h4>Weight calculation</h4>
              </div>

              <div className="development-table-wrap">
                <table className="development-table">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Qty</th>
                      <th>Unit kg</th>
                      <th>Total kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fixture.weightRows.map((row) => (
                      <tr key={row.part}>
                        <td>{row.part}</td>
                        <td>{row.qty}</td>
                        <td>{row.unitKg.toFixed(2)}</td>
                        <td>
                          {(row.qty * row.unitKg).toFixed(2)}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <th colSpan={3}>
                        Subtotal before suspension hardware
                      </th>
                      <th>{kg(weightSubtotal)}</th>
                    </tr>

                    <tr>
                      <td colSpan={4}>
                        Suspension hardware quantity and unit mass
                        are pending. A final fixture weight cannot
                        yet be issued.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="development-panel-footnote">
                All masses shown are illustrative assumptions and
                require manufacturer reconciliation.
              </p>
            </article>

            <article className="development-panel">
              <div className="development-panel-heading">
                <span>08</span>
                <h4>Pricing and commercials</h4>
              </div>

              <div className="development-commercial-list">
                <div>
                  <strong>Price basis</strong>
                  <p>Approved technical scope and quantities</p>
                </div>
                <div>
                  <strong>Delivery</strong>
                  <p>Confirmed after supplier and schedule review</p>
                </div>
                <div>
                  <strong>Payment</strong>
                  <p>As stated in the quotation</p>
                </div>
                <div>
                  <strong>Warranty</strong>
                  <p>As agreed and documented for the order</p>
                </div>
              </div>
            </article>

            <article className="development-panel">
              <div className="development-panel-heading">
                <span>09</span>
                <h4>Technical handover</h4>
              </div>

              <div className="development-handover-mini">
                <div>
                  <strong>As-built record</strong>
                  <p>Final dimensions and mounting details</p>
                </div>
                <div>
                  <strong>Electrical record</strong>
                  <p>Confirmed driver and lighting specifications</p>
                </div>
                <div>
                  <strong>Component schedule</strong>
                  <p>Replaceable parts and identification</p>
                </div>
                <div>
                  <strong>Care and maintenance</strong>
                  <p>Applicable cleaning and replacement guidance</p>
                </div>
              </div>
            </article>
          </div>

          <footer className="development-sheet-footer">
            <span>
              DESIGN DEVELOPMENT · MANUFACTURING COORDINATION · HANDOVER
            </span>
            <span>MAVEN DECORATIVES</span>
          </footer>
        </div>

        <div className="development-record-bottom">
          <p>
            This is an illustrative workflow, not an approved shop drawing.
            Final calculations, selected components, construction and
            delivery documentation depend on the specific project.
          </p>

          <Link href="#contact" className="development-record-link">
            Discuss a fixture requirement <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}