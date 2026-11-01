
import type { ReactNode } from "react";

// Original Maven artwork interpreting design principles, materials and forms.
// These illustrations are not depictions of products made by the named designers.

export type Kind =
  | "lustrerie"
  | "lamont"
  | "pinto"
  | "burnand"
  | "ochre"
  | "venini"
  | "seguso"
  | "saintlouis"
  | "barovier"
  | "calder"
  | "mouille"
  | "apparatus"
  | "giacometti"
  | "poul"
  | "sarfatti"
  | "scarpa"
  | "anastassiades"
  | "wirkkala"
  | "adelman";

const BR = "#c8a96a";
const BD = "#8d7447";
const GL = "#cfe3e8";
const WM = "#ffd9a0";

const rad = (d: number) => (d * Math.PI) / 180;

const stable = (n: number) => Number(n.toFixed(3));

type Seg = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  d: number;
};

function tree(
  x: number,
  y: number,
  len: number,
  ang: number,
  d: number,
  out: Seg[],
) {
  const x2 = x + Math.cos(rad(ang)) * len;
  const y2 = y - Math.sin(rad(ang)) * len;

  out.push({ x1: x, y1: y, x2, y2, d });

  if (d > 0) {
    const s = Math.sin(d * 12.9898) * 0.5;

    tree(x2, y2, len * (0.72 + 0.06 * s), ang + 24 + 10 * s, d - 1, out);
    tree(x2, y2, len * (0.7 - 0.06 * s), ang - 28 + 10 * s, d - 1, out);
  }
}

const VASE =
  "M150 56 C116 108 116 192 150 244 L250 244 C284 192 284 108 250 56 Z";

const scenes: Record<Kind, () => ReactNode> = {
  // Mathieu Lustrerie: ornament, scale and tiers
  lustrerie: () => (
    <g fill="none" stroke={BR} strokeWidth="1.4">
      <line x1="200" y1="18" x2="200" y2="262" />
      {[0, 1, 2].map((i) => {
        const cy = 105 + i * 58;
        const rx = 58 + i * 40;
        const ry = rx * 0.17;
        const n = 10 + i * 4;

        return (
          <g key={i}>
            <ellipse cx="200" cy={cy} rx={rx} ry={ry} />
            {Array.from({ length: n }, (_, j) => {
              const x = 200 - rx + (2 * rx * (j + 0.5)) / n;
              const y =
                cy + ry * Math.sqrt(1 - ((x - 200) / rx) ** 2);

              return (
                <g key={j}>
                  <line x1={x} y1={y} x2={x} y2={y + 16 + i * 4} />
                  <circle
                    cx={x}
                    cy={y + 20 + i * 4}
                    r="3.2"
                    fill={GL}
                    stroke="none"
                  />
                </g>
              );
            })}
          </g>
        );
      })}
      <circle cx="200" cy="262" r="6" fill={BR} />
    </g>
  ),

  // Alexander Lamont: tactile materials and surface
  lamont: () => (
    <>
      <defs>
        <pattern
          id="lm-st"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill="#d9c49a" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="#a88a52"
            strokeWidth="2.4"
          />
        </pattern>
        <pattern id="lm-dt" width="7" height="7" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="#e7dcc3" />
          <circle cx="2" cy="2" r="0.9" fill="#b9a67a" />
          <circle cx="5.5" cy="5" r="0.7" fill="#b9a67a" />
        </pattern>
      </defs>
      <rect
        x="70"
        y="66"
        width="150"
        height="150"
        rx="10"
        fill="url(#lm-st)"
        transform="rotate(-8 145 141)"
      />
      <rect
        x="170"
        y="88"
        width="140"
        height="140"
        rx="10"
        fill="url(#lm-dt)"
        transform="rotate(7 240 158)"
      />
      <circle cx="232" cy="176" r="60" fill={BD} />
      {[50, 38, 26, 14].map((r) => (
        <circle
          key={r}
          cx="232"
          cy="176"
          r={r}
          fill="none"
          stroke={BR}
          strokeOpacity="0.7"
          strokeWidth="1.2"
        />
      ))}
      <path
        d="M192 150 A46 46 0 0 1 232 130"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
    </>
  ),

  // Pinto: lighting integrated into an interior
  pinto: () => (
    <>
      <rect
        x="40"
        y="40"
        width="320"
        height="190"
        fill="#18303f"
        stroke={BD}
      />
      <path
        d="M95 230 V122 a35 35 0 0 1 70 0 V230"
        fill="#223f52"
        stroke={BR}
        strokeWidth="1.2"
      />
      <rect x="250" y="70" width="40" height="56" fill="none" stroke={BR} />
      <rect x="300" y="70" width="40" height="56" fill="none" stroke={BR} />
      <line x1="200" y1="40" x2="200" y2="98" stroke={BR} />
      <circle cx="200" cy="112" r="17" fill={WM} />
      <circle cx="200" cy="112" r="34" fill={WM} fillOpacity="0.14" />
      <rect x="190" y="172" width="150" height="22" rx="6" fill="#3a647f" />
      <rect x="190" y="192" width="150" height="34" rx="6" fill="#2d5069" />
      <path d="M118 230 q-8 -22 7 -34 q15 12 7 34z" fill={BR} />
      <line x1="40" y1="230" x2="360" y2="230" stroke={BD} />
    </>
  ),

  // Charles Burnand: illuminated sculptural form
  burnand: () => (
    <>
      <defs>
        <radialGradient id="bn-g" cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#fff3d1" />
          <stop offset="0.6" stopColor="#e8b96a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7a5a2e" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <path
        d="M138 205 C108 140 160 66 214 88 C272 106 290 176 252 214 C226 242 166 244 138 205Z"
        fill="url(#bn-g)"
        stroke={BR}
        strokeWidth="1.4"
      />
      <path
        d="M170 122 C188 98 224 100 238 124"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <path d="M112 252 L150 232 L196 246 L248 230 L292 254 Z" fill={BD} />
    </>
  ),

  // OCHRE: botanical forms
  ochre: () => (
    <>
      <path
        d="M200 20 Q90 140 150 250"
        fill="none"
        stroke={BR}
        strokeWidth="2"
      />
      {Array.from({ length: 7 }, (_, i) => {
        const t = (i + 1) / 7;
        const u = 1 - t;
        const x =
          u * u * 200 + 2 * u * t * 90 + t * t * 150;
        const y =
          u * u * 20 + 2 * u * t * 140 + t * t * 250;

        return (
          <path
            key={i}
            d="M0 0 C10 -12 30 -12 44 0 C30 12 10 12 0 0Z"
            transform={`translate(${x} ${y}) rotate(${
              i % 2 ? -35 - i * 4 : 155 + i * 4
            })`}
            fill={i % 2 ? GL : BR}
            fillOpacity="0.85"
          />
        );
      })}
      <circle cx="150" cy="254" r="9" fill={WM} />
      <path
        d="M200 20 Q310 140 250 250"
        fill="none"
        stroke={BR}
        strokeWidth="2"
        strokeOpacity="0.55"
      />
    </>
  ),

  // Venini: colour layering in glass
  venini: () => (
    <g style={{ mixBlendMode: "screen" }}>
      {(
        [
          [165, 145, 72, 96, -18, "#c97b63"],
          [235, 145, 72, 96, 18, "#5f9aa0"],
          [200, 120, 62, 92, 0, "#e0a94a"],
          [200, 178, 84, 58, 0, "#7d6aa8"],
        ] as [number, number, number, number, number, string][]
      ).map(([cx, cy, rx, ry, r, c], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          transform={`rotate(${r} ${cx} ${cy})`}
          fill={c}
          opacity="0.55"
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={150 + i * 12.5}
          y1="60"
          x2={150 + i * 12.5}
          y2="240"
          stroke="#fff"
          strokeOpacity="0.16"
        />
      ))}
    </g>
  ),

  // Seguso: sommerso, layers inside layers
  seguso: () => (
    <g>
      {["#1f3a5f", "#2f6a8a", "#58a0a8", "#e0a94a", "#ffe2a8"].map(
        (c, i) => {
          const w = 250 - i * 46;
          const h = 210 - i * 38;

          return (
            <rect
              key={i}
              x={200 - w / 2}
              y={150 - h / 2 + i * 6}
              width={w}
              height={h}
              rx={96 - i * 14}
              fill={c}
            />
          );
        },
      )}
    </g>
  ),

  // Saint-Louis: faceted geometry
  saintlouis: () => {
    const n = 12;
    const P = (
      i: number,
      r: number,
      o = 0,
    ): [number, number] => [
      stable(200 + r * Math.cos(rad((i * 360) / n + o))),
      stable(150 + r * Math.sin(rad((i * 360) / n + o))),
    ];
    const poly = (pts: [number, number][]) =>
      pts.map((p) => p.join(",")).join(" ");

    return (
      <g stroke={BR} strokeWidth="1" strokeLinejoin="round">
        {Array.from({ length: n }, (_, i) => (
          <g key={i}>
            <polygon
              points={poly([P(i, 112), P(i + 1, 112), P(i, 62, 15)])}
              fill={GL}
              fillOpacity={i % 2 ? 0.55 : 0.2}
            />
            <polygon
              points={poly([P(i, 62, 15), P(i + 1, 62, 15), P(i + 1, 112)])}
              fill={WM}
              fillOpacity={i % 2 ? 0.14 : 0.4}
            />
          </g>
        ))}
        <polygon
          points={poly(Array.from({ length: n }, (_, i) => P(i, 62, 15)))}
          fill="#fff"
          fillOpacity="0.32"
        />
      </g>
    );
  },

  // Barovier & Toso: hand-formed glass elements
  barovier: () => (
    <g transform="translate(200 150)">
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          transform={`rotate(${(i * 360) / 14}) translate(0 -26)`}
          d="M0 0 C12 -18 12 -52 0 -88 C-12 -52 -12 -18 0 0Z"
          fill={GL}
          fillOpacity="0.5"
          stroke={BR}
        />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <path
          key={`s${i}`}
          transform={`rotate(${(i * 360) / 7 + 13}) translate(0 -14)`}
          d="M0 0 C8 -12 8 -30 0 -46 C-8 -30 -8 -12 0 0Z"
          fill={WM}
          fillOpacity="0.8"
        />
      ))}
      <circle r="10" fill={BR} />
    </g>
  ),

  // Alexander Calder: balance and movement
  calder: () => (
    <g stroke={BR} strokeWidth="1.6" fill="none">
      <line x1="200" y1="14" x2="200" y2="70" />
      <line x1="105" y1="70" x2="295" y2="70" />
      <line x1="105" y1="70" x2="105" y2="112" />
      <circle cx="105" cy="136" r="24" fill="#e0a94a" stroke="none" />
      <line x1="295" y1="70" x2="295" y2="104" />
      <line x1="245" y1="104" x2="340" y2="104" />
      <line x1="245" y1="104" x2="245" y2="150" />
      <circle
        cx="245"
        cy="170"
        r="20"
        fill={GL}
        fillOpacity="0.8"
        stroke="none"
      />
      <line x1="340" y1="104" x2="340" y2="140" />
      <circle cx="340" cy="162" r="22" fill="#c97b63" stroke="none" />
      <line x1="200" y1="70" x2="200" y2="120" />
      <circle cx="200" cy="132" r="12" fill={BR} stroke="none" />
    </g>
  ),

  // Serge Mouille: articulated, slender metal
  mouille: () => (
    <g fill="none" stroke={BR} strokeLinecap="round">
      <path
        d="M300 102 L334 114 L376 236 L286 236 Z"
        fill={WM}
        fillOpacity="0.13"
        stroke="none"
      />
      <ellipse cx="150" cy="262" rx="46" ry="9" fill={BD} stroke="none" />
      <path d="M150 256 L132 170" strokeWidth="3.2" />
      <circle cx="132" cy="170" r="5" fill={BR} />
      <path d="M132 170 L214 108" strokeWidth="3" />
      <circle cx="214" cy="108" r="5" fill={BR} />
      <path d="M214 108 L282 96" strokeWidth="2.6" />
      <path d="M282 96 L312 72 L334 114 Z" fill={BD} />
    </g>
  ),

  // APPARATUS: contrast of material and mass
  apparatus: () => (
    <g>
      <line
        x1="200"
        y1="14"
        x2="200"
        y2="52"
        stroke={BR}
        strokeWidth="2.4"
      />
      <rect x="180" y="52" width="40" height="46" rx="4" fill="#efe9dc" />
      <rect x="168" y="98" width="64" height="9" fill={BR} />
      <ellipse cx="200" cy="142" rx="70" ry="20" fill="#d9d6cf" />
      <path
        d="M146 142 Q172 128 200 144 T254 136"
        stroke="#8d8a85"
        fill="none"
      />
      <path
        d="M170 150 Q198 160 226 148"
        stroke="#8d8a85"
        fill="none"
        strokeOpacity="0.6"
      />
      <circle
        cx="200"
        cy="210"
        r="40"
        fill={GL}
        fillOpacity="0.5"
        stroke={GL}
      />
      <circle cx="188" cy="198" r="9" fill="#fff" fillOpacity="0.5" />
      <rect x="168" y="252" width="64" height="18" rx="3" fill="#6b4f3a" />
    </g>
  ),

  // Diego Giacometti: delicate branching structure
  giacometti: () => {
    const seg: Seg[] = [];
    tree(200, 284, 62, 92, 5, seg);

    return (
      <g stroke={BR} strokeLinecap="round">
        {seg.map((s, i) => (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            strokeWidth={0.8 + s.d * 0.9}
          />
        ))}
        {seg
          .filter((s) => s.d === 0)
          .map((s, i) => (
            <circle
              key={i}
              cx={s.x2}
              cy={s.y2}
              r="3.6"
              fill={BD}
              stroke="none"
            />
          ))}
      </g>
    );
  },

  // Poul Henningsen: layered reflectors shape the light
  poul: () => (
    <g>
      {(
        [
          [130, 200, "#1f3a5f"],
          [95, 160, "#2a4d6b"],
          [60, 120, "#36607f"],
        ] as [number, number, string][]
      ).map(([w, y, c]) => (
        <path
          key={w}
          d={`M${200 - w} ${y} Q200 ${y + 70} ${200 + w} ${y} Z`}
          fill={c}
          stroke={BR}
          strokeWidth="1.4"
        />
      ))}
      <circle cx="200" cy="124" r="30" fill={WM} fillOpacity="0.2" />
      <circle cx="200" cy="124" r="11" fill={WM} />
      {[-52, -26, 26, 52].map((dx) => (
        <line
          key={dx}
          x1={200 + dx * 0.4}
          y1="132"
          x2={200 + dx * 2.6}
          y2="262"
          stroke={WM}
          strokeOpacity="0.28"
          strokeDasharray="4 4"
        />
      ))}
    </g>
  ),

  // Gino Sarfatti: structural economy and repeated light sources
  sarfatti: () => (
    <g stroke={BR} strokeWidth="1.5">
      <rect x="170" y="14" width="60" height="10" fill={BD} stroke="none" />
      <line x1="190" y1="24" x2="140" y2="104" />
      <line x1="210" y1="24" x2="260" y2="104" />
      <rect x="70" y="102" width="260" height="6" fill={BR} stroke="none" />
      {[100, 150, 200, 250, 300].map((x, i) => {
        const len = 50 + ((i * 3) % 4) * 28;

        return (
          <g key={x}>
            <line x1={x} y1="108" x2={x} y2={108 + len} />
            <rect
              x={x - 5}
              y={108 + len}
              width="10"
              height="8"
              fill={BD}
              stroke="none"
            />
            <circle
              cx={x}
              cy={108 + len + 24}
              r="24"
              fill={WM}
              fillOpacity="0.12"
              stroke="none"
            />
            <circle
              cx={x}
              cy={108 + len + 24}
              r="12"
              fill={WM}
              stroke="none"
            />
          </g>
        );
      })}
    </g>
  ),

  // Carlo Scarpa: glass, texture and layered surface
  scarpa: () => (
    <g>
      <defs>
        <clipPath id="scarpa-vase-clip">
          <path d={VASE} />
        </clipPath>
      </defs>
      <path
        d={VASE}
        fill={GL}
        fillOpacity="0.22"
        stroke={BR}
        strokeWidth="1.5"
      />
      <g
        clipPath="url(#scarpa-vase-clip)"
        fill="none"
        stroke={GL}
        strokeOpacity="0.75"
      >
        {Array.from({ length: 10 }, (_, k) => {
          const y = 74 + k * 17;

          return (
            <path
              key={k}
              d={`M110 ${y} Q135 ${y - 8} 160 ${y} T210 ${y} T260 ${y} T310 ${y}`}
            />
          );
        })}
      </g>
      <path
        d="M164 72 Q200 105 236 72"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.65"
        strokeWidth="2"
      />
    </g>
  ),

  // Michael Anastassiades: geometric reduction and proportion
  anastassiades: () => (
    <g fill="none" stroke={BR} strokeWidth="1.6">
      <line x1="200" y1="14" x2="200" y2="82" />
      <circle cx="200" cy="150" r="68" />
      <line x1="86" y1="150" x2="314" y2="150" />
      <circle
        cx="290"
        cy="150"
        r="13"
        fill={GL}
        fillOpacity="0.7"
        stroke="none"
      />
      <circle cx="116" cy="150" r="7" fill={BR} stroke="none" />
      <circle cx="200" cy="150" r="3" fill={BR} stroke="none" />
    </g>
  ),

  // Tapio Wirkkala: organic glass forms and flowing surface
  wirkkala: () => (
    <g>
      <defs>
        <pattern
          id="wirkkala-glass-lines"
          width="7"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="3"
            y1="0"
            x2="3"
            y2="10"
            stroke="#fff"
            strokeOpacity="0.35"
            strokeWidth="1.4"
          />
        </pattern>
      </defs>
      {(
        [
          [150, 170, 56, 72, "#c97b63"],
          [245, 150, 50, 64, "#5f9aa0"],
          [198, 204, 42, 52, "#e0a94a"],
        ] as [number, number, number, number, string][]
      ).map(([cx, cy, rx, ry, c]) => (
        <g key={cx}>
          <path
            d={`M${cx - rx * 0.6} ${cy - ry * 0.65}
                Q${cx - rx * 1.35} ${cy - ry * 1.8} ${cx} ${cy - ry}
                Q${cx + rx * 1.25} ${cy - ry * 1.2} ${cx + rx * 0.6} ${cy - ry * 0.4}`}
            fill="none"
            stroke={BR}
            strokeOpacity="0.8"
          />
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill={c}
            fillOpacity="0.62"
          />
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="url(#wirkkala-glass-lines)"
          />
          <ellipse
            cx={cx - rx * 0.25}
            cy={cy - ry * 0.35}
            rx={rx * 0.22}
            ry={ry * 0.12}
            fill="#fff"
            fillOpacity="0.3"
          />
        </g>
      ))}
    </g>
  ),

  // Lindsey Adelman: branching, modular forms and light at the tips
  adelman: () => {
    const seg: Seg[] = [];
    tree(200, 278, 58, 90, 4, seg);

    return (
      <g stroke={BR} strokeLinecap="round">
        {seg.map((s, i) => (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            strokeWidth={0.9 + s.d * 0.8}
          />
        ))}
        {seg
          .filter((s) => s.d === 0)
          .map((s, i) => (
            <g key={i} stroke="none">
              <circle
                cx={s.x2}
                cy={s.y2}
                r="17"
                fill={WM}
                fillOpacity="0.14"
              />
              <circle cx={s.x2} cy={s.y2} r="6.5" fill={WM} />
            </g>
          ))}
      </g>
    );
  },
};

export default function Interpretation({
  kind,
  label,
}: {
  kind: Kind;
  label: string;
}) {
  return (
    <svg
      className="hof-svg"
      viewBox="0 0 400 300"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient
          id={`${kind}-bg`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor="#0d1820" />
          <stop offset="1" stopColor="#1d3547" />
        </linearGradient>
        <radialGradient id={`${kind}-gl`}>
          <stop offset="0" stopColor={WM} stopOpacity="0.28" />
          <stop offset="1" stopColor={WM} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${kind}-bg)`} />
      <circle
        cx="200"
        cy="150"
        r="140"
        fill={`url(#${kind}-gl)`}
      />
      {scenes[kind]()}
    </svg>
  );
}
