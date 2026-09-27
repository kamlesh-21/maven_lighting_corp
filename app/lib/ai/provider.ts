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

// import type { DesignInterpretation } from "@/app/lib/design/types";

// type InterpreterInput = Array<{
//   type: "input_text" | "input_image";
//   text?: string;
//   image_url?: string;
//   detail?: "low" | "high" | "auto";
// }>;

// export async function runDesignInterpreter(
//   input: InterpreterInput,
//   instructions: string
// ): Promise<DesignInterpretation> {
//   // Dummy provider for local development and testing.
//   // This deliberately does not call any external AI service.

//   console.log("Maven Dummy Design Interpreter");
//   console.log("Interpreter input:", input);
//   console.log("Interpreter instructions:", instructions);

//   await new Promise((resolve) => setTimeout(resolve, 900));

//   return {
//     designCharacter:
//       "Heritage hospitality with contemporary restraint, combining a crafted material presence with a strong architectural character.",

//     formDirection:
//       "A substantial sculptural fixture with layered volume and a clear central silhouette, designed to read as a focal element within the space.",

//     materialDirection:
//       "Use the selected primary metal finish as the structural language, supported by a restrained secondary material to introduce texture and depth without making the fixture visually busy.",

//     proportionAndScale:
//       "The fixture should have a strong statement presence appropriate to the selected architectural setting, with proportions calibrated to the ceiling height and surrounding spatial volume.",

//     lightingCharacter:
//       "Warm, diffused decorative illumination with controlled light output, allowing the fixture itself to remain visually important even when the space is fully lit.",

//     visualLanguage:
//       "Refined, material-led and architectural, with enough craftsmanship and detail to feel bespoke rather than catalogue-driven.",

//     referenceInterpretation:
//       "The reference is treated as a source of visual language rather than something to copy literally. Its silhouette, proportion, material character and overall mood should inform an original Maven interpretation.",

//     architecturalIntent:
//       "Create a distinctive decorative lighting element that contributes to the identity of the space while remaining proportionate to the architecture and appropriate for hospitality use.",

//     generationDirection:
//       "Develop three clearly differentiated concept directions from this intent: one more sculptural and architectural, one more layered and material-focused, and one more crafted and artisanal. Maintain realistic construction logic and bespoke hospitality character across all three."
//   };
// }

// app/lib/ai/provider.ts
import { InferenceClient } from "@huggingface/inference";
import type { DesignInterpretation } from "@/app/lib/design/types";

type InterpreterInput = Array<{
  type: "input_text" | "input_image";
  text?: string;
  image_url?: string;
  detail?: "low" | "high" | "auto";
}>;

function extractJson(text: string): string {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error(
      "Maven interpreter did not return valid JSON."
    );
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function validateInterpretation(
  value: unknown
): DesignInterpretation {
  if (!value || typeof value !== "object") {
    throw new Error(
      "Maven interpreter returned an invalid interpretation."
    );
  }

  const result =
    value as Record<string, unknown>;

  const fields = [
    "designCharacter",
    "formDirection",
    "materialDirection",
    "proportionAndScale",
    "lightingCharacter",
    "visualLanguage",
    "referenceInterpretation",
    "architecturalIntent",
    "generationDirection",
  ];

  for (const field of fields) {
    if (
      typeof result[field] !== "string" ||
      !result[field]
    ) {
      throw new Error(
        `Maven interpreter returned incomplete data: ${field}`
      );
    }
  }

  return result as DesignInterpretation;
}

export async function runDesignInterpreter(
  input: InterpreterInput,
  instructions: string
): Promise<DesignInterpretation> {
  const hfToken = process.env.HF_TOKEN;

  if (!hfToken) {
    throw new Error(
      "HF_TOKEN is not configured on the server."
    );
  }

  const selectedModel =
    process.env.HF_TEXT_MODEL ||
    "Qwen/Qwen2.5-VL-3B-Instruct";

  console.log("========================================");
  console.log(
    "Maven Hugging Face Design Interpreter"
  );
  console.log("========================================");
  console.log("Model:", selectedModel);

  const client =
    new InferenceClient(hfToken);

  const hasImage = input.some(
    (item) => item.type === "input_image"
  );

  /*
   * Keep the first implementation deliberately simple.
   *
   * No system message.
   * One user message.
   *
   * Text-only requests use a plain string.
   * Requests containing a reference image use
   * OpenAI-compatible multimodal content.
   */

  const textParts = input
    .filter(
      (item) => item.type === "input_text"
    )
    .map((item) => item.text || "")
    .join("\n\n");

  const messages = hasImage
    ? [
        {
          role: "user" as const,
          content: [
            {
              type: "text",
              text: `${instructions}\n\n${textParts}`,
            },
            ...input
              .filter(
                (item) =>
                  item.type ===
                    "input_image" &&
                  item.image_url
              )
              .map((item) => ({
                type: "image_url",
                image_url: {
                  url: item.image_url,
                },
              })),
          ],
        },
      ]
    : [
        {
          role: "user" as const,
          content:
            `${instructions}\n\n${textParts}`,
        },
      ];

  try {
    const chatCompletion =
      await client.chatCompletion({
        model: selectedModel,
        provider: "auto",
        messages,
        temperature: 0.2,
        max_tokens: 1800,
      } as any);

    const message =
      chatCompletion?.choices?.[0]
        ?.message;

    const rawContent =
      typeof message?.content === "string"
        ? message.content
        : "";

    if (!rawContent) {
      throw new Error(
        "Maven interpreter returned an empty response."
      );
    }

    console.log(
      "Maven interpreter response received."
    );

    const jsonText =
      extractJson(rawContent);

    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText);
    } catch {
      console.error(
        "Raw Maven interpreter response:",
        rawContent
      );

      throw new Error(
        "Maven interpreter returned malformed JSON."
      );
    }

    return validateInterpretation(
      parsed
    );
  } catch (error: any) {
    /*
     * Hugging Face's ProviderApiError can hide the
     * useful provider response inside httpResponse.
     * Log it explicitly so we can diagnose the
     * actual provider/model issue if another error
     * occurs.
     */

    console.error(
      "Maven interpreter provider error:"
    );

    console.error(
      "Status:",
      error?.httpResponse?.status
    );

    console.error(
      "Provider response:",
      error?.httpResponse?.body
    );

    throw error;
  }
}