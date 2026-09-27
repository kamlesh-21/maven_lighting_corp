//app/lib/ai/image.ts
import type {
  DesignConcept,
  DesignIntent,
  DesignInterpretation,
} from "@/app/lib/design/types";

import { generateImage } from "./imageProvider";

function buildMavenImagePrompt(
  concept: DesignConcept,
  designIntent: DesignIntent,
  interpretation: DesignInterpretation
): string {
  const project =
    designIntent.project.name ||
    "premium hospitality project";

  const location =
    designIntent.project.location ||
    "India";

  const space =
    designIntent.project.space ||
    "hospitality interior";

  const application =
    designIntent.application.join(", ") ||
    "decorative architectural lighting";

  const atmosphere =
    designIntent.atmosphere.join(", ") ||
    "refined and warm";

  const materials =
    designIntent.materials.join(", ") ||
    "mixed premium materials";

  const fixture =
    designIntent.fixture.join(", ") ||
    "bespoke decorative lighting fixture";

  const scale =
    designIntent.scale ||
    "architecturally scaled";

  const referenceText =
    designIntent.reference.notes ||
    "No written reference notes were supplied.";

  return `
Create ONE original bespoke decorative lighting fixture
for Maven Decoratives.

This is an architectural concept visualization for a real
hospitality or premium architectural project.

The fixture is the primary subject.

PROJECT

Project: ${project}
Location: ${location}
Space: ${space}

USER INTENT

Application:
${application}

Atmosphere:
${atmosphere}

Preferred materials:
${materials}

Fixture direction:
${fixture}

Scale:
${scale}

Reference notes:
${referenceText}

MAVEN INTERPRETATION

Design character:
${interpretation.designCharacter}

Form direction:
${interpretation.formDirection}

Material direction:
${interpretation.materialDirection}

Proportion and scale:
${interpretation.proportionAndScale}

Lighting character:
${interpretation.lightingCharacter}

Visual language:
${interpretation.visualLanguage}

Architectural intent:
${interpretation.architecturalIntent}

REFERENCE HANDLING

If a reference image is supplied, use it as visual inspiration.

Study its:
- silhouette
- proportion
- material character
- finish
- rhythm
- craftsmanship
- relationship between light and form

Do NOT reproduce the reference literally.

Do NOT copy a recognisable designer fixture.

Do NOT reproduce a branded product.

Create a new Maven interpretation.

SELECTED MAVEN DIRECTION

${concept.title}
${concept.subtitle}

${concept.description}

FORM

${concept.form}

MATERIAL

${concept.material}

LIGHT

${concept.lighting}

ARCHITECTURAL ROLE

${concept.architecturalRole}

CONCEPT-SPECIFIC DIRECTION

${concept.generationPrompt}

VISUAL REQUIREMENTS

Show exactly ONE complete lighting fixture.

The fixture should be clearly visible.

Use believable architectural proportions.

Use believable material relationships.

Use realistic structural relationships.

The fixture should look like a serious bespoke hospitality
lighting proposal rather than an art sculpture.

The fixture should feel capable of progressing into
custom manufacturing after technical review.

Use a restrained premium hospitality interior.

Show enough architectural context to communicate scale.

Warm realistic decorative illumination.

Subtle realistic shadows.

Professional architectural visualization quality.

No people.

No text.

No logos.

No product labels.

No multiple fixtures.

No collage.

No presentation board.

No impossible floating structures.

No excessive ornament.

No generic mass-market catalogue styling.

The visual should communicate:

FORM
SCALE
MATERIAL
LIGHT
ARCHITECTURAL PRESENCE

Original Maven interpretation only.

IMPORTANT:

The image is a concept-stage visual.
It is not a technical drawing.
It is not a manufacturing approval.
`;
}

export async function generateMavenConceptImage(
  concept: DesignConcept,
  designIntent: DesignIntent,
  interpretation: DesignInterpretation,
  referenceImageData?: string
): Promise<string> {
  const prompt =
    buildMavenImagePrompt(
      concept,
      designIntent,
      interpretation
    );

  const imageBuffer =
    await generateImage({
      prompt,
      width: 1024,
      height: 1024,
      referenceImageData,
    });

  const base64 =
    imageBuffer.toString("base64");

  return `data:image/png;base64,${base64}`;
}