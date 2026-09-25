// import OpenAI from "openai";

// const apiKey = process.env.OPENAI_API_KEY;

// if (!apiKey) {
//   throw new Error("OPENAI_API_KEY is not configured.");
// }

// const client = new OpenAI({
//   apiKey,
// });

// type DesignInput =
//   | {
//       type: "input_text";
//       text: string;
//     }
//   | {
//       type: "input_image";
//       image_url: string;
//       detail?: "low" | "high" | "auto";
//     };

// export async function runDesignInterpreter(input: DesignInput[], instructions: string) {
//   const response = await client.responses.create({
//     model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
//     store: false,
//     instructions,
//     input: [
//       {
//         role: "user",
//         content: input.map((item) => {
//           if (item.type === "input_text") {
//             return {
//               type: "input_text",
//               text: item.text,
//             } as const;
//           }

//           return {
//             type: "input_image",
//             image_url: item.image_url,
//             detail: item.detail ?? "auto",
//           } as const;
//         }),
//       },
//     ],
//     text: {
//       format: {
//         type: "json_schema",
//         name: "maven_design_interpretation",
//         description:
//           "Structured interpretation of an architect's bespoke lighting design intent.",
//         strict: true,
//         schema: {
//           type: "object",
//           additionalProperties: false,
//           properties: {
//             designCharacter: {
//               type: "string",
//             },
//             formDirection: {
//               type: "string",
//             },
//             materialDirection: {
//               type: "string",
//             },
//             proportionAndScale: {
//               type: "string",
//             },
//             lightingCharacter: {
//               type: "string",
//             },
//             visualLanguage: {
//               type: "string",
//             },
//             referenceInterpretation: {
//               type: "string",
//             },
//             architecturalIntent: {
//               type: "string",
//             },
//             generationDirection: {
//               type: "string",
//             },
//           },
//           required: [
//             "designCharacter",
//             "formDirection",
//             "materialDirection",
//             "proportionAndScale",
//             "lightingCharacter",
//             "visualLanguage",
//             "referenceInterpretation",
//             "architecturalIntent",
//             "generationDirection",
//           ],
//         },
//       },
//     },
//   });

//   return JSON.parse(response.output_text);
// }

import type { DesignInterpretation } from "@/app/lib/design/types";

type InterpreterInput = Array<{
  type: "input_text" | "input_image";
  text?: string;
  image_url?: string;
  detail?: "low" | "high" | "auto";
}>;

export async function runDesignInterpreter(
  input: InterpreterInput,
  instructions: string
): Promise<DesignInterpretation> {
  // Dummy provider for local development and testing.
  // This deliberately does not call any external AI service.

  console.log("Maven Dummy Design Interpreter");
  console.log("Interpreter input:", input);
  console.log("Interpreter instructions:", instructions);

  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    designCharacter:
      "Heritage hospitality with contemporary restraint, combining a crafted material presence with a strong architectural character.",

    formDirection:
      "A substantial sculptural fixture with layered volume and a clear central silhouette, designed to read as a focal element within the space.",

    materialDirection:
      "Use the selected primary metal finish as the structural language, supported by a restrained secondary material to introduce texture and depth without making the fixture visually busy.",

    proportionAndScale:
      "The fixture should have a strong statement presence appropriate to the selected architectural setting, with proportions calibrated to the ceiling height and surrounding spatial volume.",

    lightingCharacter:
      "Warm, diffused decorative illumination with controlled light output, allowing the fixture itself to remain visually important even when the space is fully lit.",

    visualLanguage:
      "Refined, material-led and architectural, with enough craftsmanship and detail to feel bespoke rather than catalogue-driven.",

    referenceInterpretation:
      "The reference is treated as a source of visual language rather than something to copy literally. Its silhouette, proportion, material character and overall mood should inform an original Maven interpretation.",

    architecturalIntent:
      "Create a distinctive decorative lighting element that contributes to the identity of the space while remaining proportionate to the architecture and appropriate for hospitality use.",

    generationDirection:
      "Develop three clearly differentiated concept directions from this intent: one more sculptural and architectural, one more layered and material-focused, and one more crafted and artisanal. Maintain realistic construction logic and bespoke hospitality character across all three."
  };
}