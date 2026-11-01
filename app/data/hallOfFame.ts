import type { Kind } from "../components/Interpretation";

export type DesignTheme = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  homePoints: string[];
};

export type Designer = {
  slug: string;
  name: string;
  discipline: string;
  period: string;
  theme: string;
  kind: Kind;
  image: string;
  imageSource: string;
  imageAlt: string;
  introduction: string;
  designPerspective: string;
  keyPrinciples: string[];
  materialLanguage: string[];
  mavenInterpretation: string;
  lightingApplications: string[];
  developmentConsiderations: string[];
};

export const designThemes: DesignTheme[] = [
  {
    id: "light-optics",
    number: "01",
    title: "Light & Optical Engineering",
    subtitle: "The behaviour and control of light",
    description:
      "References exploring illumination, reflection, optical performance, crystal and the relationship between a light source and its surroundings.",
    homePoints: [
      "Glare, reflection and controlled illumination.",
      "Technical principles translated into decorative form.",
    ],
  },
  {
    id: "geometry-space",
    number: "02",
    title: "Geometry, Form & Space",
    subtitle: "Proportion, structure and composition",
    description:
      "Design approaches exploring balance, geometry, spatial relationships, architectural composition and the expressive potential of structure.",
    homePoints: [
      "Proportion, balance and negative space.",
      "The relationship between an object and its architecture.",
    ],
  },
  {
    id: "glass-craft",
    number: "03",
    title: "Glass, Material & Craft",
    subtitle: "The possibilities of material",
    description:
      "Glassmaking traditions, specialist materials, surface treatments and the craftsmanship that gives decorative objects their individual character.",
    homePoints: [
      "Transparency, texture, colour and material depth.",
      "Traditional techniques and contemporary applications.",
    ],
  },
  {
    id: "sculpture-culture",
    number: "04",
    title: "Sculpture, Art & Heritage",
    subtitle: "Beyond the conventional lighting object",
    description:
      "References drawn from sculpture, restoration, decorative arts, collectible design and craft traditions.",
    homePoints: [
      "Sculptural thinking applied to decorative objects.",
      "Heritage, craftsmanship and contemporary interpretation.",
    ],
  },
];

export const designers: Designer[] = [
  // 01. LIGHT & OPTICAL ENGINEERING

  {
    slug: "mathieu-lustrerie",
    name: "Mathieu Lustrerie",
    discipline: "Chandelier restoration, reproduction and decorative lighting",
    period: "France · Contemporary",
    theme: "sculpture-culture",
    kind: "lustrerie",
    image: "",
    imageSource: "https://www.gargas.fr/lustrerie-mathieu/",
    imageAlt: "Maven illustration exploring chandelier heritage and ornament",
    introduction:
      "Mathieu Lustrerie, led by Régis Mathieu, is known for its specialist work in the history, restoration and reproduction of historic chandeliers. Its projects include work for significant heritage buildings and collections.",
    designPerspective:
      "Its practice demonstrates the importance of historical research, proportion, ornament and specialist restoration knowledge. A chandelier is understood as both a lighting instrument and an architectural object.",
    keyPrinciples: [
      "Historical lighting research",
      "Decorative composition and proportion",
      "Restoration and faithful reproduction",
      "Large-scale chandelier construction",
    ],
    materialLanguage: [
      "Brass and bronze",
      "Crystal and glass",
      "Traditional metal components",
      "Decorative and historical finishes",
    ],
    mavenInterpretation:
      "A study of architectural chandeliers in which ornament, scale and material detail are considered together. The aim is to create a focal lighting piece that belongs naturally to the character of its interior.",
    lightingApplications: [
      "Grand entrance chandeliers",
      "Hotel and resort feature lighting",
      "Heritage-inspired decorative fixtures",
      "Large-scale custom installations",
    ],
    developmentConsiderations: [
      "Overall dimensions and visual proportions",
      "Suspension structure and total weight",
      "Component assembly and installation access",
      "Crystal, metal and finish coordination",
    ],
  },

  {
    slug: "alexander-lamont",
    name: "Alexander Lamont",
    discipline: "Designer and specialist decorative material atelier",
    period: "Contemporary",
    theme: "glass-craft",
    kind: "lamont",
    image: "",
    imageSource: "https://www.alexanderlamont.com/en/trade/materials/",
    imageAlt: "Maven illustration exploring tactile material surfaces",
    introduction:
      "Alexander Lamont's practice is distinguished by its use of specialist materials and traditional surface techniques. Its workshops work with straw marquetry, shagreen, parchment, natural lacquer, gesso, gilt leaf and bronze.",
    designPerspective:
      "The material is central to the identity of the object. Natural variation, texture, surface reflectivity and the skill involved in preparing and applying each material contribute to the finished work.",
    keyPrinciples: [
      "Material-led design",
      "Traditional surface craftsmanship",
      "Natural variation and texture",
      "Contrast between tactile materials",
    ],
    materialLanguage: [
      "Straw marquetry",
      "Shagreen and parchment",
      "Natural lacquer",
      "Bronze and gilt finishes",
    ],
    mavenInterpretation:
      "A material-led lighting direction in which the surface is treated as an integral part of the design. Textured metal, natural finishes and carefully selected translucent elements can give a fixture depth without excessive ornament.",
    lightingApplications: [
      "Decorative table lamps",
      "Material-led wall lights",
      "Feature pendants",
      "Bespoke hospitality lighting",
    ],
    developmentConsiderations: [
      "Suitability of the chosen surface for lighting applications",
      "Heat and material compatibility",
      "Finish consistency and natural variation",
      "Cleaning and long-term maintenance",
    ],
  },

  {
    slug: "pinto",
    name: "Pinto",
    discipline: "Interior architecture and decoration studio",
    period: "France · Contemporary",
    theme: "geometry-space",
    kind: "pinto",
    image: "",
    imageSource: "https://www.pinto.fr/",
    imageAlt: "Maven illustration exploring decorative interior composition",
    introduction:
      "Pinto brings together designers, architects and decorators across interior architecture, furniture, objects and decorative projects. Its work often combines historical references with expressive contemporary interiors.",
    designPerspective:
      "The lighting object is understood within the larger composition of a room. Furniture, finishes, art, architectural detailing and lighting need to contribute to a coherent visual identity.",
    keyPrinciples: [
      "Interior composition",
      "Classical and contemporary dialogue",
      "Decorative detailing",
      "Spatial hierarchy and proportion",
    ],
    materialLanguage: [
      "Decorative metals",
      "Natural stone",
      "Lacquered surfaces",
      "Textiles, glass and specialist finishes",
    ],
    mavenInterpretation:
      "A room-led approach to decorative lighting. The fixture is developed in response to the interior's architectural language, ceiling proportions, furniture and material palette rather than as an isolated object.",
    lightingApplications: [
      "Statement chandeliers",
      "Decorative wall lighting",
      "Dining and reception lighting",
      "Bespoke residential and hospitality fixtures",
    ],
    developmentConsiderations: [
      "Ceiling height and fixture scale",
      "Relationship with furniture and finishes",
      "Light distribution and visual hierarchy",
      "Coordination with the reflected ceiling plan",
    ],
  },

  {
    slug: "charles-burnand",
    name: "Charles Burnand",
    discipline: "Collectible design gallery and bespoke production studio",
    period: "United Kingdom · Founded 2009",
    theme: "sculpture-culture",
    kind: "burnand",
    image: "",
    imageSource: "https://charlesburnand.com/about/",
    imageAlt: "Maven illustration exploring illuminated sculpture",
    introduction:
      "Charles Burnand Gallery champions collectible design, art furniture and illuminated sculpture. Alongside its gallery programme, it operates an in-house design and production studio working with specialist artisans.",
    designPerspective:
      "Its work demonstrates how lighting can move beyond conventional product categories. Material experimentation, sculptural form and specialist fabrication can combine to produce objects that function as both lighting and collectible design.",
    keyPrinciples: [
      "Illuminated sculpture",
      "Material experimentation",
      "Artisan-led production",
      "One-of-a-kind and bespoke commissions",
    ],
    materialLanguage: [
      "Bronze",
      "Cast glass",
      "Silver",
      "Mica",
    ],
    mavenInterpretation:
      "A sculptural lighting direction in which the material and form carry equal importance. The technical components are integrated into the composition rather than treated as separate functional additions.",
    lightingApplications: [
      "Sculptural chandeliers",
      "Art-led feature lighting",
      "Bespoke statement pendants",
      "Site-specific lighting installations",
    ],
    developmentConsiderations: [
      "Material and fabrication feasibility",
      "Structural and electrical integration",
      "Component weight and fixing strategy",
      "Assembly and installation coordination",
    ],
  },

  {
    slug: "ochre",
    name: "OCHRE",
    discipline: "Decorative design studio",
    period: "United Kingdom · Contemporary",
    theme: "sculpture-culture",
    kind: "ochre",
    image: "",
    imageSource: "",
    imageAlt: "Maven illustration exploring organic decorative forms",
    introduction:
      "OCHRE is associated with a refined decorative language that draws on organic forms, natural materials and considered craftsmanship. Its work spans lighting, furniture and objects.",
    designPerspective:
      "Organic references can be translated into sophisticated decorative forms through proportion, repetition and restraint. The result need not imitate nature literally to retain a natural character.",
    keyPrinciples: [
      "Organic form and natural references",
      "Material sensitivity",
      "Restrained decorative detail",
      "Craft-led composition",
    ],
    materialLanguage: [
      "Metal",
      "Glass",
      "Natural and textured finishes",
      "Decorative materials",
    ],
    mavenInterpretation:
      "A study of natural contours and delicate repeated elements. The objective is to create lighting with an organic character while retaining control over dimensions, construction and visual balance.",
    lightingApplications: [
      "Organic chandeliers",
      "Decorative pendants",
      "Wall sconces",
      "Residential and hospitality feature lighting",
    ],
    developmentConsiderations: [
      "Repeatability of irregular forms",
      "Component weight and structural support",
      "Finish and material consistency",
      "Proportion at the intended installation scale",
    ],
  },

  {
    slug: "venini",
    name: "Venini",
    discipline: "Murano glass manufacturer and design house",
    period: "Italy · Founded 1921",
    theme: "glass-craft",
    kind: "venini",
    image: "",
    imageSource: "https://www.venini.com/",
    imageAlt: "Maven illustration exploring Murano glass and colour",
    introduction:
      "Founded in Murano in 1921, Venini became an important centre for collaboration between glassmakers, artists and designers. Its history is closely associated with the development of modern Venetian glass.",
    designPerspective:
      "Venini demonstrates how traditional glassmaking can support experimentation in colour, transparency, pattern and form. The material is not merely a diffuser or decorative covering; it can define the identity of the object.",
    keyPrinciples: [
      "Traditional Murano glassmaking",
      "Artist and designer collaborations",
      "Colour and transparency",
      "Experimental glass techniques",
    ],
    materialLanguage: [
      "Mouth-blown glass",
      "Coloured glass",
      "Layered glass",
      "Textured and patterned glass",
    ],
    mavenInterpretation:
      "An exploration of glass as the primary visual and luminous element. Colour, transparency, thickness and surface treatment are considered together to develop original decorative lighting concepts.",
    lightingApplications: [
      "Murano-inspired chandeliers",
      "Glass pendants",
      "Decorative wall lights",
      "Bespoke glass installations",
    ],
    developmentConsiderations: [
      "Glass colour and thickness",
      "Light transmission and diffusion",
      "Component weight and mounting",
      "Craft process and production repeatability",
    ],
  },

  {
    slug: "seguso",
    name: "Seguso Vetri d'Arte",
    discipline: "Murano glassmaking tradition",
    period: "Italy · Established 1933",
    theme: "glass-craft",
    kind: "seguso",
    image: "",
    imageSource: "https://seguso.com/portfolio/seguso-vetri-darte/",
    imageAlt: "Maven illustration exploring layered glass volumes",
    introduction:
      "Seguso Vetri d'Arte was established in Murano in 1933 and became part of the island's important twentieth-century glassmaking history. Its work is associated with sculptural glass forms and the development of Venetian glass artistry.",
    designPerspective:
      "The tradition provides a reference for understanding glass as a material with depth and volume. Layering, colour and transparency can create different visual effects depending on the form and viewing angle.",
    keyPrinciples: [
      "Murano glass craftsmanship",
      "Sculptural glass volumes",
      "Layered colour and transparency",
      "Material depth",
    ],
    materialLanguage: [
      "Mouth-blown glass",
      "Coloured glass",
      "Layered glass",
      "Sculptural glass forms",
    ],
    mavenInterpretation:
      "A lighting study based on layered glass volumes and controlled colour relationships. The aim is to create depth within the material while preserving the clarity of the overall composition.",
    lightingApplications: [
      "Glass cluster pendants",
      "Sculptural chandeliers",
      "Decorative wall lights",
      "Feature lighting installations",
    ],
    developmentConsiderations: [
      "Glass thickness and component weight",
      "Colour consistency between components",
      "Light transmission and source positioning",
      "Safe mounting and transport",
    ],
  },

  {
    slug: "saint-louis",
    name: "Saint-Louis",
    discipline: "Crystal manufactory",
    period: "France · Founded 1586",
    theme: "light-optics",
    kind: "saintlouis",
    image: "",
    imageSource: "https://www.saint-louis.com/en/faq",
    imageAlt: "Maven illustration exploring cut crystal and refraction",
    introduction:
      "Saint-Louis is a historic French glass and crystal manufactory. Its production includes mouth-blown and hand-finished crystal, with specialist skills in cutting, engraving and gilding.",
    designPerspective:
      "Crystal demonstrates how surface geometry can influence the behaviour of light. Cutting, polishing and faceting produce reflections and highlights that become part of the visual character of a fixture.",
    keyPrinciples: [
      "Precision crystal cutting",
      "Refraction and reflection",
      "Geometric repetition",
      "Craftsmanship and surface finishing",
    ],
    materialLanguage: [
      "Lead crystal",
      "Cut and polished crystal",
      "Engraved glass",
      "Gilded decorative details",
    ],
    mavenInterpretation:
      "A study in precision and optical detail. Repeated crystal forms and carefully considered light-source positioning can create luminous richness without overwhelming the surrounding interior.",
    lightingApplications: [
      "Crystal chandeliers",
      "Decorative wall sconces",
      "Crystal pendants",
      "Hospitality feature lighting",
    ],
    developmentConsiderations: [
      "Crystal geometry and cutting quality",
      "Refraction and glare",
      "Component weight and fixing",
      "Cleaning access and maintenance",
    ],
  },

  {
    slug: "barovier-toso",
    name: "Barovier & Toso",
    discipline: "Murano glassmaker and decorative lighting house",
    period: "Italy · Heritage dating to 1295",
    theme: "glass-craft",
    kind: "barovier",
    image: "",
    imageSource: "https://www.barovier.com/en/about",
    imageAlt: "Maven illustration exploring Venetian crystal craftsmanship",
    introduction:
      "Barovier & Toso traces its glassmaking heritage to 1295. The company continues to work with Venetian crystal and traditional Murano glassmaking processes, producing decorative objects and lighting.",
    designPerspective:
      "Its work illustrates the relationship between heritage craftsmanship and architectural lighting. Individual glass components can be composed into larger decorative structures with a distinctive identity.",
    keyPrinciples: [
      "Venetian glassmaking heritage",
      "Mouth-blown crystal",
      "Handcrafted decorative components",
      "Chandelier composition",
    ],
    materialLanguage: [
      "Venetian crystal",
      "Mouth-blown glass",
      "Coloured glass",
      "Hand-finished metal details",
    ],
    mavenInterpretation:
      "A contemporary interpretation of handcrafted glass composition, using individual elements to build a larger architectural lighting feature. The emphasis is on material character, scale and considered assembly.",
    lightingApplications: [
      "Grand chandeliers",
      "Glass pendants",
      "Decorative wall lighting",
      "Large-scale hospitality installations",
    ],
    developmentConsiderations: [
      "Glass component dimensions and weight",
      "Suspension and structural coordination",
      "Assembly sequence",
      "Transport and installation protection",
    ],
  },

  // 02. GEOMETRY, FORM & SPACE

  {
    slug: "alexander-calder",
    name: "Alexander Calder",
    discipline: "Sculptor and kinetic artist",
    period: "United States · 1898–1976",
    theme: "geometry-space",
    kind: "calder",
    image: "",
    imageSource: "https://hirshhorn.si.edu/explore/in-depth-alexander-calder/",
    imageAlt: "Maven illustration exploring suspended balance and movement",
    introduction:
      "Alexander Calder transformed modern sculpture through mobiles and other suspended constructions. Trained initially as a mechanical engineer, he explored balance, movement and the relationship between forms and their environment.",
    designPerspective:
      "Calder's mobiles demonstrate that negative space is as important as the individual components. A composition can achieve equilibrium through carefully balanced relationships rather than symmetry.",
    keyPrinciples: [
      "Counterbalance",
      "Suspended composition",
      "Negative space",
      "Movement and visual equilibrium",
    ],
    materialLanguage: [
      "Metal sheet",
      "Wire",
      "Painted surfaces",
      "Lightweight structural elements",
    ],
    mavenInterpretation:
      "A suspended lighting composition using varied forms at different heights. The arrangement is developed around balance, spacing and the visual volume of the installation.",
    lightingApplications: [
      "Double-height chandeliers",
      "Sculptural suspended lighting",
      "Lobby installations",
      "Large-scale feature fixtures",
    ],
    developmentConsiderations: [
      "Suspension points and load paths",
      "Weight distribution",
      "Movement and stability",
      "Installation access and maintenance",
    ],
  },

  {
    slug: "serge-mouille",
    name: "Serge Mouille",
    discipline: "Lighting designer and metalworker",
    period: "France · 1922–1988",
    theme: "geometry-space",
    kind: "mouille",
    image: "",
    imageSource: "https://www.serge-mouille.com/en/serge-mouille/",
    imageAlt: "Maven illustration exploring articulated metal lighting",
    introduction:
      "Serge Mouille developed a distinctive lighting vocabulary through articulated metal arms, directional shades and slender structural forms. His background in metalworking informed the construction and character of his designs.",
    designPerspective:
      "His work demonstrates how a small number of structural lines can define an entire lighting object. The relationship between arm, shade and mounting point creates both function and visual identity.",
    keyPrinciples: [
      "Articulated geometry",
      "Directional lighting",
      "Slender structural lines",
      "Visual asymmetry",
    ],
    materialLanguage: [
      "Painted steel",
      "Aluminium",
      "Metal components",
      "Matte finishes",
    ],
    mavenInterpretation:
      "An original lighting study built around an expressive metal armature. Directional heads and carefully controlled proportions create a balance between utility and sculptural character.",
    lightingApplications: [
      "Wall sconces",
      "Directional pendants",
      "Multi-arm ceiling fixtures",
      "Reading and task lighting",
    ],
    developmentConsiderations: [
      "Arm rigidity and joint construction",
      "Weight distribution",
      "Electrical routing",
      "Directional performance and adjustability",
    ],
  },

  {
    slug: "michael-anastassiades",
    name: "Michael Anastassiades",
    discipline: "Contemporary designer",
    period: "Cyprus / United Kingdom · Born 1967",
    theme: "geometry-space",
    kind: "anastassiades",
    image: "",
    imageSource: "https://www.studiomichaelanastassiades.com/about",
    imageAlt: "Maven illustration exploring geometric lighting and balance",
    introduction:
      "Michael Anastassiades is a Cyprus-born, London-based designer whose practice spans lighting, furniture and objects. His training in civil engineering and industrial design informs an approach that combines technical rigour with considered form.",
    designPerspective:
      "His work demonstrates how elementary geometries can create a strong spatial presence. Proportion, alignment, material and the relationship between components carry the visual identity.",
    keyPrinciples: [
      "Geometric reduction",
      "Balance and proportion",
      "Material precision",
      "Restraint and visual clarity",
    ],
    materialLanguage: [
      "Brass",
      "Glass",
      "Metal",
      "Polished and brushed finishes",
    ],
    mavenInterpretation:
      "A minimal pendant or chandelier using a small number of geometric elements. Each component is carefully proportioned, with the overall composition designed to feel balanced and resolved.",
    lightingApplications: [
      "Minimal pendants",
      "Geometric chandeliers",
      "Linear suspension systems",
      "Contemporary wall lighting",
    ],
    developmentConsiderations: [
      "Dimensional accuracy",
      "Alignment and balance",
      "Finish quality",
      "Concealed electrical connections",
    ],
  },

  {
    slug: "apparatus",
    name: "APPARATUS",
    discipline: "Interdisciplinary design studio",
    period: "United States · Founded 2012",
    theme: "geometry-space",
    kind: "apparatus",
    image: "",
    imageSource: "https://apparatusstudio.com/pages/about",
    imageAlt: "Maven illustration exploring material contrast and architectural form",
    introduction:
      "APPARATUS is a New York-based interdisciplinary design studio co-founded by Gabriel Hendifar and Jeremy Anderson. Its practice connects lighting, furniture and objects through a distinctive overall design language.",
    designPerspective:
      "The studio's approach treats individual objects as part of a wider interior composition. Historical references, material contrasts and hand-finished details contribute to a coherent visual environment.",
    keyPrinciples: [
      "Holistic interior composition",
      "Material contrast",
      "Historical and cultural references",
      "Small-studio craftsmanship",
    ],
    materialLanguage: [
      "Hand-patinated brass",
      "Marble",
      "Suede",
      "Horsehair, lacquer and porcelain",
    ],
    mavenInterpretation:
      "A lighting concept built around contrasting materials and carefully resolved transitions. The objective is to make each material contribute to the overall composition rather than compete for attention.",
    lightingApplications: [
      "Decorative pendants",
      "Sculptural chandeliers",
      "Wall lighting",
      "Coordinated hospitality lighting schemes",
    ],
    developmentConsiderations: [
      "Material compatibility",
      "Weight and fixing strategy",
      "Assembly and finish coordination",
      "Maintenance of specialist surfaces",
    ],
  },

  // 03. GLASS, MATERIAL & CRAFT

  {
    slug: "poul-henningsen",
    name: "Poul Henningsen",
    discipline: "Lighting designer, architect and writer",
    period: "Denmark · 1894–1967",
    theme: "light-optics",
    kind: "poul",
    image: "",
    imageSource: "https://www.louispoulsen.com/en/about-us/designers/poul-henningsen",
    imageAlt: "Maven illustration exploring layered reflector geometry",
    introduction:
      "Poul Henningsen approached lighting as a study of human perception. His shade systems explored how light could be reflected, concealed and distributed to create comfortable illumination.",
    designPerspective:
      "His layered shade systems demonstrate that fixture geometry directly influences light distribution. The size, curvature, spacing and finish of each element contribute to the optical performance.",
    keyPrinciples: [
      "Layered reflectors",
      "Glare reduction",
      "Controlled light distribution",
      "Visual comfort",
    ],
    materialLanguage: [
      "Spun metal",
      "Painted metal",
      "Opal glass",
      "Reflective and matte surfaces",
    ],
    mavenInterpretation:
      "A contemporary lighting study built around overlapping reflector elements. Carefully considered spacing and surface finishes allow the fixture's structure to contribute to the quality of illumination.",
    lightingApplications: [
      "Layered chandeliers",
      "Architectural pendants",
      "Decorative ceiling fixtures",
      "Indirect wall lighting",
    ],
    developmentConsiderations: [
      "Reflector geometry and source positioning",
      "Glare and viewing angles",
      "Light distribution and surface reflectance",
      "Thermal management and material compatibility",
    ],
  },

  {
    slug: "gino-sarfatti",
    name: "Gino Sarfatti",
    discipline: "Lighting and industrial designer",
    period: "Italy · 1912–1985",
    theme: "light-optics",
    kind: "sarfatti",
    image: "",
    imageSource: "https://astep.design/designers/gino-sarfatti/",
    imageAlt: "Maven illustration exploring component-led lighting design",
    introduction:
      "Gino Sarfatti was the founder and creative force behind Arteluce. His work explored new light sources, materials, components and production techniques, contributing significantly to modern Italian lighting design.",
    designPerspective:
      "His designs reveal how a small number of carefully resolved components can create a strong visual identity. Technical construction and the visible structure become part of the aesthetic language.",
    keyPrinciples: [
      "Structural economy",
      "Component-led design",
      "Technical experimentation",
      "Precision and visual clarity",
    ],
    materialLanguage: [
      "Brass",
      "Aluminium",
      "Steel",
      "Glass and emerging materials",
    ],
    mavenInterpretation:
      "A restrained lighting composition in which the structural framework, light source and mounting details are treated as one coherent design. Every visible component should have a clear purpose.",
    lightingApplications: [
      "Linear chandeliers",
      "Multi-point ceiling fixtures",
      "Minimalist pendants",
      "Wall-mounted lighting",
    ],
    developmentConsiderations: [
      "Structural stability",
      "Component standardisation",
      "Electrical access and maintenance",
      "Finish consistency across components",
    ],
  },

  {
    slug: "carlo-scarpa",
    name: "Carlo Scarpa",
    discipline: "Architect and glass designer",
    period: "Italy · 1906–1978",
    theme: "glass-craft",
    kind: "scarpa",
    image: "",
    imageSource: "https://www.metmuseum.org/exhibitions/listings/2013/carlo-scarpa",
    imageAlt: "Maven illustration exploring textured and layered glass",
    introduction:
      "Carlo Scarpa brought architectural thinking into glass design through his work with Venini between 1932 and 1947. His experiments explored colour, texture, transparency and traditional glassmaking techniques.",
    designPerspective:
      "Scarpa's glass work demonstrates how surface treatment and material depth can become central to an object's identity. Techniques such as battuti create a distinctive relationship between texture, transparency and light.",
    keyPrinciples: [
      "Surface texture and depth",
      "Layering and transparency",
      "Geometric precision",
      "Colour and material interaction",
    ],
    materialLanguage: [
      "Murano glass",
      "Battuti surface treatment",
      "Sommerso glass",
      "Layered and coloured glass",
    ],
    mavenInterpretation:
      "An original glass lighting study using layered translucent volumes, controlled surface texture and restrained metal detailing. The objective is to allow the material itself to shape the character of the light.",
    lightingApplications: [
      "Glass pendants",
      "Wall sconces",
      "Chandeliers",
      "Decorative table lamps",
    ],
    developmentConsiderations: [
      "Glass thickness and weight",
      "Light transmission",
      "Glare and source positioning",
      "Glass-to-metal connections",
    ],
  },

  // 04. SCULPTURE, ART & HERITAGE

  {
    slug: "diego-giacometti",
    name: "Diego Giacometti",
    discipline: "Sculptor and furniture designer",
    period: "Switzerland / France · 1902–1985",
    theme: "sculpture-culture",
    kind: "giacometti",
    image: "",
    imageSource: "https://www.sothebys.com/en/artists/diego-giacometti",
    imageAlt: "Maven illustration exploring organic bronze structures",
    introduction:
      "Diego Giacometti developed a distinctive sculptural language through bronze furniture, objects and decorative forms. His work frequently drew on animals, branches and natural references.",
    designPerspective:
      "His practice demonstrates how irregular organic forms can be translated into carefully composed metal structures. The resulting objects combine sculptural character with functional purpose.",
    keyPrinciples: [
      "Organic geometry",
      "Sculptural metalwork",
      "Nature-inspired forms",
      "Handcrafted surface character",
    ],
    materialLanguage: [
      "Bronze",
      "Patinated metal",
      "Textured surfaces",
      "Organic metal components",
    ],
    mavenInterpretation:
      "A lighting direction that translates natural contours into an original metal composition. The aim is to combine visual delicacy, sculptural character and a structurally sound construction.",
    lightingApplications: [
      "Sculptural chandeliers",
      "Decorative table lamps",
      "Bronze wall lights",
      "Statement hospitality fixtures",
    ],
    developmentConsiderations: [
      "Metal thickness and structural stability",
      "Organic component connections",
      "Surface texture and patination",
      "Weight, fixing and assembly",
    ],
  },
];

export const homeDesignThemes = designThemes.map((theme) => ({
  ...theme,
  designers: designers
    .filter((designer) => designer.theme === theme.id)
    .map((designer) => ({
      name: designer.name,
      slug: designer.slug,
      discipline: designer.discipline,
    })),
}));

export const getDesignerBySlug = (slug: string) =>
  designers.find((designer) => designer.slug === slug);

export const getDesignersByTheme = (themeId: string) =>
  designers.filter((designer) => designer.theme === themeId);
