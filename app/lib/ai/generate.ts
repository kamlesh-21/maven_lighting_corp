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
  const input: Parameters<typeof runDesignInterpreter>[0] = [
    {
      type: "input_text",
      text: `
Interpret this Maven lighting design intent.

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

  const result = await runDesignInterpreter(
    input,
    buildDesignInterpreterPrompt(designIntent)
  );

  return result as DesignInterpretation;
}