//app/lib/ai/concepts.ts
import type {
  DesignConcept,
  DesignIntent,
  DesignInterpretation,
} from "@/app/lib/design/types";

export function createDummyConcepts(
  designIntent: DesignIntent,
  interpretation: DesignInterpretation
): DesignConcept[] {
  const projectName =
    designIntent.project.name ||
    "Maven Hospitality Project";

  const fixture =
    designIntent.fixture.length > 0
      ? designIntent.fixture.join(", ")
      : "decorative lighting fixture";

  const materials =
    designIntent.materials.length > 0
      ? designIntent.materials.join(", ")
      : "mixed materials";

  const scale =
    designIntent.scale ||
    "architecturally scaled";

  const direction =
    interpretation.generationDirection;

  return [
    {
      id: "concept-01",
      number: "01",
      title: "Sculptural",
      subtitle: "A strong architectural gesture",

      description:
        `A confident architectural interpretation for ${projectName}, developed around ${interpretation.formDirection}. The fixture is intended to establish a clear focal presence without unnecessary ornament.`,

      form:
        `${interpretation.formDirection} The sculptural direction emphasises a strong silhouette, controlled negative space and a clearly readable overall volume.`,

      material:
        `${interpretation.materialDirection} For this direction, the dominant material should establish the primary visual identity while secondary materials remain controlled.`,

      lighting:
        `${interpretation.lightingCharacter} Light should remain integrated with the form rather than competing with it.`,

      architecturalRole:
        `${interpretation.architecturalIntent} This direction is intended to act as a strong visual anchor at ${scale} scale.`,

      generationPrompt:
        `Develop the SCULPTURAL direction from this Maven interpretation:

${direction}

DESIGN CHARACTER:
${interpretation.designCharacter}

FORM:
${interpretation.formDirection}

MATERIAL:
${interpretation.materialDirection}

SCALE:
${interpretation.proportionAndScale}

Create one original bespoke ${fixture}.
Emphasise architectural silhouette, volume, proportion,
controlled negative space and strong presence.
Use ${materials} intelligently.
Do not force every material into the fixture.
Do not copy the reference literally.`,

      visualType: "sculptural",
    },

    {
      id: "concept-02",
      number: "02",
      title: "Layered",
      subtitle: "Material, volume and light",

      description:
        `A more composed interpretation in which depth, overlapping elements and material transitions create the visual character. It follows the same overall intent while expressing it through layers rather than one dominant mass.`,

      form:
        `Translate ${interpretation.formDirection} into a layered composition using overlapping planes, volumes, rings or controlled elements. Maintain a coherent silhouette rather than creating visual clutter.`,

      material:
        `${interpretation.materialDirection} Use the material hierarchy through layers, transitions or restrained accents so that texture and depth become part of the fixture's identity.`,

      lighting:
        `${interpretation.lightingCharacter} Allow light to emerge subtly between or through the layered elements, creating depth and controlled shadow.`,

      architecturalRole:
        `${interpretation.architecturalIntent} This direction should relate to the surrounding architecture through rhythm, depth and proportion rather than relying on a single sculptural gesture.`,

      generationPrompt:
        `Develop the LAYERED direction from this Maven interpretation:

${direction}

DESIGN CHARACTER:
${interpretation.designCharacter}

FORM:
${interpretation.formDirection}

MATERIAL:
${interpretation.materialDirection}

SCALE:
${interpretation.proportionAndScale}

Create one original bespoke ${fixture}.
Emphasise layered construction, depth, material transitions,
shadow, rhythm and controlled illumination.
Use ${materials} intelligently.
Do not make the fixture look mechanically complicated.
Do not copy the reference literally.`,

      visualType: "layered",
    },

    {
      id: "concept-03",
      number: "03",
      title: "Crafted",
      subtitle: "Material-led and tactile",

      description:
        `A warmer, more tactile interpretation in which material authenticity, craftsmanship and surface character become the primary visual language.`,

      form:
        `Interpret ${interpretation.formDirection} with softer geometry, tactile surfaces and a considered relationship between structure, material and light.`,

      material:
        `${interpretation.materialDirection} Give greater visual importance to material authenticity, finish variation and craftsmanship while maintaining a disciplined overall composition.`,

      lighting:
        `${interpretation.lightingCharacter} Use warm, intimate illumination that reveals the texture and material character of the fixture.`,

      architecturalRole:
        `${interpretation.architecturalIntent} This direction should introduce craftsmanship and material richness without becoming overly decorative.`,

      generationPrompt:
        `Develop the CRAFTED direction from this Maven interpretation:

${direction}

DESIGN CHARACTER:
${interpretation.designCharacter}

FORM:
${interpretation.formDirection}

MATERIAL:
${interpretation.materialDirection}

SCALE:
${interpretation.proportionAndScale}

Create one original bespoke ${fixture}.
Emphasise craftsmanship, tactile materiality, authentic finishes,
warm light and refined construction details.
Use ${materials} intelligently.
Keep the design architecturally disciplined.
Do not copy the reference literally.`,

      visualType: "crafted",
    },
  ];
}