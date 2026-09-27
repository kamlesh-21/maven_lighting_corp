//app/lib/ai/generate.ts
import type {
  DesignIntent,
  DesignInterpretation,
} from "@/app/lib/design/types";

import { buildDesignInterpreterPrompt } from "./prompt";
import { runDesignInterpreter } from "./provider";

type ReferenceImageInput = {
  dataUrl?: string;
};

export async function interpretDesignIntent(
  designIntent: DesignIntent,
  referenceImage?: ReferenceImageInput
): Promise<DesignInterpretation> {
  const input: Array<{
    type: "input_text" | "input_image";
    text?: string;
    image_url?: string;
    detail?: "low" | "high" | "auto";
  }> = [
    {
      type: "input_text",
      text: `
Interpret this design requirement for Maven Decoratives.

Project:
${designIntent.project.name || "Not specified"}

Location:
${designIntent.project.location || "Not specified"}

Space:
${designIntent.project.space || "Not specified"}

Application:
${designIntent.application.join(", ") || "Not specified"}

Atmosphere:
${designIntent.atmosphere.join(", ") || "Not specified"}

Materials:
${designIntent.materials.join(", ") || "Not specified"}

Fixture:
${designIntent.fixture.join(", ") || "Not specified"}

Scale:
${designIntent.scale || "Not specified"}

Reference notes:
${designIntent.reference.notes || "None"}

Reference filename:
${designIntent.reference.fileName || "None"}
`,
    },
  ];

  if (referenceImage?.dataUrl) {
    input.push({
      type: "input_image",
      image_url: referenceImage.dataUrl,
      detail: "high",
    });
  }

  return runDesignInterpreter(
    input,
    buildDesignInterpreterPrompt(designIntent)
  );
}