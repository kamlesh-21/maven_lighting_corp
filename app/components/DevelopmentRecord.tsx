import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";

// Add a real photograph at public/images/reference-pendant.jpg
// (about 1600 x 1067 px, under 300 KB). Until then the vector render shows.
const PHOTO = "/images/reference-pendant.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

/* ---------- inputs: every number below is derived from these ---------- */
const D = 1800; // overall diameter, mm
const DROP = 1200; // plate to lowest tip, mm
const RHO = { steel: 7930, glass: 2230, brass: 8500 }; // kg/m3
const cyl = (d: number, l: number, rho: number) => Math.PI * (d / 2000) ** 2 * (l / 1000) * rho;

// dia = ring diameter, drop = ring drop below the plate, rod = glass length (mm)
const rings = [
  { n: 1, rods: 12, dia: 500, drop: 1200, rod: 700 },
  { n: 2, rods: 24, dia: 1040, drop: 1100, rod: 650 },
  { n: 3, rods: 36, dia: 1600, drop: 950, rod: 600 },
].map((r) => ({ ...r, gap: (Math.PI * r.dia) / r.rods }));

const rods = rings.reduce((t, r) => t + r.rods, 0);
const density = rods / (Math.PI * (D / 2000) ** 2);

type Group = "steel" | "glass" | "brass" | "elec";
const bom: { part: string; material: string; basis: "Calculated" | "Datasheet" | "Allowance"; qty: number; kg: number; g: Group }[] = [
  { part: "Canopy plate and stiffeners", material: "SS 304, 1 mm plate, 4 flat bars", basis: "Calculated", qty: 1, kg: cyl(D, 1, RHO.steel) + 4 * 0.03 * 0.003 * 1.8 * RHO.steel, g: "steel" },
  { part: "Drivers and wiring", material: "7 × 150 W dimmable", basis: "Datasheet", qty: 1, kg: 7 * 0.75 + 1.5, g: "elec" },
  { part: "Cable and fittings", material: "SS 304 wire rope", basis: "Allowance", qty: rods, kg: rods * 0.07, g: "steel" },
  { part: "Brass cap", material: "Ø32 × 18 mm", basis: "Calculated", qty: rods, kg: rods * cyl(32, 18, RHO.brass), g: "brass" },
  { part: "LED module", material: "12 W, integrated", basis: "Datasheet", qty: rods, kg: rods * 0.15, g: "elec" },
  { part: "Glass rod", material: "Borosilicate, textured, Ø28 mm", basis: "Calculated", qty: rods, kg: rings.reduce((t, r) => t + r.rods * cyl(28, r.rod, RHO.glass), 0), g: "glass" },
  { part: "Ceiling fixings", material: "8 anchor sets", basis: "Allowance", qty: 8, kg: 8 * 0.35, g: "steel" },
];
const total = bom.reduce((t, r) => t + r.kg, 0);
const unit = bom.slice(2, 6).reduce((t, r) => t + r.kg, 0) / rods;
const groups = (
  [["steel", "SS 304 and fixings"], ["glass", "Borosilicate glass"], ["brass", "Brass"], ["elec", "Electrical"]] as [Group, string][]
).map(([g, label]) => {
  const kg = bom.filter((r) => r.g === g).reduce((t, r) => t + r.kg, 0);
  return { g, label, kg, pct: (kg / total) * 100 };
});

const spec: [string, string, boolean][] = [
  ["Geometry", `Ø${D} mm, drop ${DROP} mm, ${rods} rods in 3 rings`, true],
  ["Rods", "Borosilicate, textured, Ø28 mm, 600-700 mm by ring", true],
  ["Structure", "SS 304 canopy plate with stiffeners, PVD brushed-gold finish", false],
  ["Light source", `12 W module per rod, ${rods * 12} W connected, 2700 K, CRI 90+ target`, false],
  ["Drivers", "Dimmable (0-10 V or DALI), reachable from the ceiling void", false],
  ["Mounting", "8 fixings, 180 mm standoff, checked with the site team", false],
];

const risks: [string, string, "high" | "medium" | "low", string][] = [
  ["Weight and fixing", `${total.toFixed(0)} kg hangs from 8 fixings`, "high", "Engineer confirms slab and fixing rating against the weight"],
  ["Rod joints", `${rods} cable, cap and rod joints must hold alike`, "high", "Joint method fixed on the sample; tightness checked per unit"],
  ["Glass and finish", "Texture, tint and length vary by batch", "medium", "Approved sample is the reference; batch checked against it"],
  ["Drivers", "Discontinued model or long lead time", "medium", "Common, replaceable drivers; spares held"],
  ["Installation", "Access and sequence in a banquet hall", "medium", "Installation drawing agreed with the site team"],
];

const steps: [string, string, string][] = [
  ["reference", "Reference intake", "Image, sketch, drawing or BOQ line, with room and ceiling details."],
  ["interpret", "Interpret and scale", "Proportion checked against the space; material intent confirmed."],
  ["geometry", "Geometry and BOM", "Rings, spacing, drops, components and materials set."],
  ["calculate", "Calculate", "Weight, spacing and density worked out from the BOM."],
  ["risk", "Risk review", "Joints, glass, drivers and access reviewed, each with an owner."],
  ["approve", "Sample and approve", "Sample or mock-up and drawings signed before production."],
  ["inspect", "Produce and inspect", "Stage checks against the signed sample; packing and labels."],
  ["deliver", "Deliver and hand over", "Room-wise delivery with the handover record."],
];

const handover: [string, string, string][] = [
  ["geometry", "As-built drawings", "Final dimensions and mounting details"],
  ["calculate", "Electrical details", "Voltage, current and driver information"],
  ["inspect", "Component list", "Replaceable parts with part numbers"],
  ["handover", "Care guide", "Cleaning, service and replacement steps"],
];

const scope = ["Fixture and component schedule", "Materials and finish definition", "Approved drawings and sample record", "Electrical and mounting coordination", "Packing, labelling and delivery"];

const ICON: Record<string, string> = {
  reference: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 17l5-5 4 4 3-3 6 6M9 9.5h.01",
  interpret: "M3 17L17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2",
  geometry: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  calculate: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 6h8v3H8zM8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01",
  risk: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM12 8v5M12 16h.01",
  approve: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12l3 3 5-6",
  inspect: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM20 20l-4.5-4.5",
  deliver: "M2 6h12v10H2zM14 10h4l3 3v3h-7zM8 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM19 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0z",
  handover: "M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7",
};

/* ---------- small parts ---------- */
const Icon = ({ name }: { name: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICON[name]} />
  </svg>
);
const Chip = ({ tone, children }: { tone: string; children: ReactNode }) => <span className={`fdr-chip fdr-chip--${tone}`}>{children}</span>;
const Panel = ({ n, title, className = "", children }: { n: string; title: string; className?: string; children: ReactNode }) => (
  <article className={`fdr-panel ${className}`}>
    <header><span>{n}</span><h4>{title}</h4></header>
    <div>{children}</div>
  </article>
);
const Tag = ({ x, y, n }: { x: number; y: number; n: number }) => (
  <g>
    <circle cx={x} cy={y} r="9" className="fdr-tag" />
    <text x={x} y={y + 3.5} textAnchor="middle" className="fdr-tagtext">{n}</text>
  </g>
);

/* ---------- drawings ---------- */
function Render() {
  const cx = 480, plateY = 84, sx = 0.37, sy = 0.34, w = 28 * sx;
  const pts = rings
    .flatMap((r) => Array.from({ length: r.rods }, (_, i) => {
      const t = (i / r.rods) * Math.PI * 2 + (r.n === 2 ? 0.1 : 0);
      return { r, d: Math.sin(t), x: cx + Math.cos(t) * (r.dia / 2) * sx, y: plateY + 14 + Math.sin(t) * (r.dia / 2) * 0.034, k: `${r.n}-${i}` };
    }))
    .sort((a, b) => a.d - b.d);
  return (
    <svg className="fdr-render" viewBox="0 0 960 600" role="img" aria-label="Rendered reference of a circular pendant with textured glass rods, brass caps and a steel canopy">
      <defs>
        <linearGradient id="rr-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f0d0b" /><stop offset="1" stopColor="#2b2116" /></linearGradient>
        <radialGradient id="rr-glow" cx="0.5" cy="0.45" r="0.5"><stop offset="0" stopColor="#ffd08a" stopOpacity="0.5" /><stop offset="1" stopColor="#f0a85a" stopOpacity="0" /></radialGradient>
        <linearGradient id="rr-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#cfe3e8" stopOpacity="0.55" /><stop offset="0.32" stopColor="#fff" stopOpacity="0.95" /><stop offset="0.62" stopColor="#e2c58f" stopOpacity="0.75" /><stop offset="1" stopColor="#8fa8ae" stopOpacity="0.6" /></linearGradient>
        <linearGradient id="rr-brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e6cd96" /><stop offset="1" stopColor="#7c6640" /></linearGradient>
        <linearGradient id="rr-steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9c9a6" /><stop offset="1" stopColor="#6f5c3a" /></linearGradient>
      </defs>
      <rect width="960" height="600" fill="url(#rr-bg)" />
      <ellipse cx={cx} cy={plateY + 210} rx="400" ry="260" fill="url(#rr-glow)" />
      <ellipse cx={cx} cy={plateY} rx={(D / 2) * sx} ry="30" fill="url(#rr-steel)" />
      {pts.map((o) => {
        const yCap = o.y + (o.r.drop - o.r.rod - 18) * sy;
        return (
          <g key={o.k} opacity={0.5 + 0.25 * (o.d + 1)}>
            <line x1={o.x} y1={o.y} x2={o.x} y2={yCap} stroke="#cdbb97" strokeWidth="0.9" />
            <rect x={o.x - w / 2} y={yCap + 7} width={w} height={o.r.rod * sy} rx={w / 2} fill="url(#rr-glass)" />
            <rect x={o.x - 6.5} y={yCap} width="13" height="7" rx="1.5" fill="url(#rr-brass)" />
            <circle cx={o.x} cy={yCap + 10} r="6" fill="#ffd9a0" opacity="0.6" />
          </g>
        );
      })}
      <text x="28" y="570" className="fdr-render-label">REFERENCE RENDER · ILLUSTRATIVE</text>
      <text x="932" y="570" textAnchor="end" className="fdr-render-label">SS 304 · BOROSILICATE GLASS · BRASS</text>
    </svg>
  );
}

function Plan() {
  const c = 150, k = 0.15;
  return (
    <svg className="fdr-plan" viewBox="0 0 300 320" role="img" aria-label={`Plan view: ${rods} rods in three concentric rings inside a ${D} mm diameter`}>
      <circle cx={c} cy={c} r={(D / 2) * k} className="fdr-outer" />
      {rings.map((r) => {
        const rad = (r.dia / 2) * k, a0 = -Math.PI / 2 + Math.PI / r.rods;
        return (
          <g key={r.n}>
            <circle cx={c} cy={c} r={rad} className="fdr-ring" />
            {Array.from({ length: r.rods }, (_, i) => (
              <circle key={i} cx={c + Math.cos((i / r.rods) * Math.PI * 2) * rad} cy={c + Math.sin((i / r.rods) * Math.PI * 2) * rad} r="2.6" className="fdr-rod" />
            ))}
            <g transform={`translate(${c + Math.cos(a0) * rad} ${c + Math.sin(a0) * rad})`}>
              <circle r="6.5" className="fdr-tag" /><text y="3" textAnchor="middle" className="fdr-tagtext fdr-s">{r.n}</text>
            </g>
          </g>
        );
      })}
      <path d={`M${c - 135} 302H${c + 135}M${c - 135} 297v10M${c + 135} 297v10`} className="fdr-dim" />
      <text x={c} y="316" textAnchor="middle" className="fdr-dimtext">Ø{D} mm</text>
    </svg>
  );
}

function Exploded() {
  const x = 110;
  const items: [number, number, string][] = [[2, 24, "Driver"], [1, 54, "Canopy plate"], [3, 82, "Cable"], [4, 116, "Brass cap"], [5, 159, "LED module"], [6, 258, "Glass rod"]];
  return (
    <svg className="fdr-exploded" viewBox="0 0 340 350" role="img" aria-label="Exploded view of one hanging unit">
      <defs>
        <linearGradient id="ex-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#dbe9ec" /><stop offset="0.45" stopColor="#fff" /><stop offset="1" stopColor="#b9ccd1" /></linearGradient>
        <linearGradient id="ex-brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e6cd96" /><stop offset="1" stopColor="#8d7447" /></linearGradient>
      </defs>
      <line x1={x} y1="6" x2={x} y2="330" className="fdr-axis" />
      <rect x="130" y="18" width="40" height="26" className="fdr-box" />
      <rect x="40" y="44" width="140" height="8" className="fdr-steel" />
      <line x1={x} y1="52" x2={x} y2="108" className="fdr-cable" />
      <rect x={x - 10} y="108" width="20" height="16" fill="url(#ex-brass)" stroke="#21384a" />
      <rect x={x - 12} y="142" width="24" height="34" rx="3" fill="#2b3a44" stroke="#21384a" />
      {[0, 1, 2].map((i) => <rect key={i} x={x - 7} y={148 + i * 9} width="14" height="5" rx="1" fill="#e8c77a" />)}
      <rect x={x - 16} y="196" width="32" height="124" rx="16" fill="url(#ex-glass)" stroke="#21384a" />
      {items.map(([n, y, name]) => (
        <g key={n}>
          <line x1={n === 2 ? 170 : n === 1 ? 180 : x + 16} y1={n === 2 ? 31 : y} x2="192" y2={y} className="fdr-leader" />
          <Tag x={200} y={y} n={n} />
          <text x="216" y={y + 4} className="fdr-label">{name}</text>
        </g>
      ))}
      <text x="8" y="344" className="fdr-small">Exploded, not to scale</text>
    </svg>
  );
}

/* ---------- section ---------- */
export default function DevelopmentRecord() {
  return (
    <section className="section fdr" id="development-record">
      <div className="container">
        <p className="eyebrow">TECHNICAL DEVELOPMENT</p>
        <div className="fdr-intro">
          <h2>Before production,<br />the decisions are<br />made visible.</h2>
          <p>One worked example of how a reference becomes a fixture-specific technical record: layout, construction, weight, risks, and the handover that ships with the goods.</p>
        </div>

        <div className="fdr-sheet">
          <header className="fdr-bar fdr-bar--top">
            <div className="fdr-mark"><span>MAVEN</span><small>DECORATIVES</small></div>
            <div className="fdr-title"><p>ILLUSTRATIVE EXAMPLE</p><h3>Fixture Development Record</h3><span>Layered circular pendant · Main banquet</span></div>
            <div className="fdr-status"><span>RECORD</span><strong>R0 · for illustration</strong><span>MANUFACTURING</span><strong>Not approved</strong></div>
          </header>

          <div className="fdr-grid fdr-g1">
            <Panel n="01" title="Reference and concept">
              <figure className="fdr-photo">
                {hasPhoto ? <img src={PHOTO} alt="Reference photograph of a layered glass-rod pendant" loading="lazy" /> : <Render />}
                <figcaption>{hasPhoto ? "Reference" : "Reference render"} · circular pendant, Ø{D} mm, drop {DROP} mm, {rods} glass rods</figcaption>
              </figure>
            </Panel>
            <Panel n="02" title="Key parameters">
              <dl className="fdr-kv">
                {([["Overall diameter", `${D} mm`], ["Drop", `${DROP} mm`], ["Components", `${rods} rods, 3 rings`], ["Density", `${density.toFixed(1)} rods / m²`], ["Estimated weight", `${total.toFixed(1)} kg`]] as const).map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <ul className="fdr-mats">
                {([["steel", "SS 304", "Canopy, cables"], ["glass", "Borosilicate glass", "Textured rods"], ["brass", "Brass", "Caps, connectors"], ["elec", "LED and drivers", "Serviceable"]] as const).map(([g, a, b]) => (
                  <li key={g}><i className={`fdr-sw fdr-sw--${g}`} /><div><strong>{a}</strong><span>{b}</span></div></li>
                ))}
              </ul>
            </Panel>
          </div>

          <div className="fdr-grid fdr-g2">
            <Panel n="03" title="Layout and spacing">
              <Plan />
              <table className="fdr-table">
                <thead><tr><th>Ring</th><th>Diameter</th><th>Rods</th><th>Rod to rod</th></tr></thead>
                <tbody>{rings.map((r) => <tr key={r.n}><td>{r.n}</td><td>{r.dia} mm</td><td>{r.rods}</td><td>{r.gap.toFixed(0)} mm</td></tr>)}</tbody>
              </table>
              <p className="fdr-note">Rod to rod = π × ring diameter ÷ rods | Density = {rods} rods ÷ {(Math.PI * (D / 2000) ** 2).toFixed(2)} m².</p>
            </Panel>
            <Panel n="04" title="How it is built">
              <Exploded />
              <p className="fdr-note">Numbers match the bill of materials. One hanging unit (cable, cap, LED, rod) weighs about {unit.toFixed(2)} kg; {rods} hang from the plate.</p>

              <p className="fdr-note"><strong>Why 72 and not 108:</strong> The 72 rods gives us a density of 28 rods per sq meter, with about 130 to 140 mm distance between rods. A fuller/denser version at 108 rods would be about 42 rods per sq metre, and be 44 kg heavier and draw 432 W more</p>
            </Panel>
          </div>

          <div className="fdr-grid fdr-g3">
            <Panel n="05" title="Bill of materials and weight">
              <table className="fdr-table">
                <thead><tr><th>#</th><th>Part</th><th>Basis</th><th>Qty</th><th>kg</th></tr></thead>
                <tbody>
                  {bom.map((r, i) => (
                    <tr key={r.part}>
                      <td className="fdr-n">{i + 1}</td>
                      <td>{r.part}<span className="fdr-sub">{r.material}</span></td>
                      <td><Chip tone={r.basis === "Calculated" ? "calc" : r.basis === "Datasheet" ? "data" : "allow"}>{r.basis}</Chip></td>
                      <td>{r.qty}</td>
                      <td>{r.kg.toFixed(1)}</td>
                    </tr>
                  ))}
                  <tr className="fdr-total"><td colSpan={4}>Estimated total</td><td>{total.toFixed(1)}</td></tr>
                </tbody>
              </table>
              <div className="fdr-massbar" role="img" aria-label="Weight share by material">
                {groups.map((g) => <i key={g.g} className={`fdr-sw--${g.g}`} style={{ width: `${g.pct}%` }} />)}
              </div>
              <ul className="fdr-legend">
                {groups.map((g) => <li key={g.g}><i className={`fdr-sw fdr-sw--${g.g}`} />{g.label}<strong>{g.kg.toFixed(1)} kg</strong><em>{g.pct.toFixed(0)}%</em></li>)}
              </ul>
              <p className="fdr-note">Calculated = geometry × density. Datasheet and allowance rows are confirmed with the manufacturer on the sample.</p>
            </Panel>

            <div className="fdr-stack">
              <Panel n="06" title="Technical specification">
                <table className="fdr-table">
                  <tbody>{spec.map(([f, v, ok]) => <tr key={f}><th>{f}</th><td>{v}</td><td><Chip tone={ok ? "calc" : "confirm"}>{ok ? "Calculated" : "To confirm"}</Chip></td></tr>)}</tbody>
                </table>
              </Panel>
              <Panel n="07" title="Scope and space-owning features">
                <ul className="fdr-checks">{scope.map((s) => <li key={s}>{s}</li>)}</ul>
                <div className="fdr-feat">
                  <strong>Space-owning features</strong>
                  <ul>
                    <li>Scale: Ø{D} mm, {density.toFixed(0)} rods per m², a full even canopy</li>
                    <li>Light: 2700 K, dimmable, layered with room controls</li>
                    <li>Year 3: modular parts, cleanable finish, spares listed</li>
                  </ul>
                </div>
              </Panel>
            </div>
          </div>

          <div className="fdr-grid fdr-g4">
            <Panel n="08" title="Risk profiling and mitigation">
              <table className="fdr-table">
                <thead><tr><th>Area</th><th>Potential issue</th><th>Rating</th><th>Response</th></tr></thead>
                <tbody>{risks.map(([a, i, r, s]) => <tr key={a}><th>{a}</th><td>{i}</td><td><Chip tone={r}>{r[0].toUpperCase() + r.slice(1)}</Chip></td><td>{s}</td></tr>)}</tbody>
              </table>
            </Panel>
          </div>

          <section className="fdr-process" aria-label="Technical process">
            <header><span>09</span><h4>The technical process, in eight steps</h4></header>
            <ol>
              {steps.map(([icon, t, b], i) => (
                <li key={t} className={i === 5 ? "is-gate" : ""}>
                  <div><span className="fdr-ico"><Icon name={icon} /></span><b>{String(i + 1).padStart(2, "0")}</b></div>
                  <strong>{t}</strong><p>{b}</p>
                  {i === 5 && <em>Client approves</em>}
                </li>
              ))}
            </ol>
          </section>

          <div className="fdr-grid fdr-g4">
            <Panel n="10" title="Technical handover, included in delivery">
              <ul className="fdr-handover">
                {handover.map(([icon, t, d]) => <li key={t}><span className="fdr-ico"><Icon name={icon} /></span><div><strong>{t}</strong><p>{d}</p></div></li>)}
              </ul>
            </Panel>
          </div>

          <footer className="fdr-bar fdr-bar--foot"><span>DESIGN DEVELOPMENT · MANUFACTURING COORDINATION · HANDOVER</span><span>MAVEN DECORATIVES</span></footer>
        </div>

        <div className="fdr-bottom">
          <p>An illustrative worked example, not a shop drawing. Figures for your fixture are confirmed with the manufacturer on the approved sample.</p>
          <Link href="#contact" className="fdr-link">Discuss a fixture requirement <span>→</span></Link>
        </div>
      </div>
    </section>
  );
}