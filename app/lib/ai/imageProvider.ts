import { InferenceClient } from "@huggingface/inference";

export type ImageGenerationOptions = {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
  negativePrompt?: string;
};

export async function generateImage(
  options: ImageGenerationOptions
): Promise<Buffer> {
  console.log("========================================");
  console.log("Maven Hugging Face image provider");
  console.log("========================================");

  const hfToken = process.env.HF_TOKEN;

  if (!hfToken) {
    throw new Error(
      "HF_TOKEN is not configured on the server."
    );
  }

  const selectedModel =
    options.model ||
    process.env.HF_IMAGE_MODEL ||
    "black-forest-labs/FLUX.1-schnell";

  console.log("Model:", selectedModel);
  console.log("Width:", options.width || 1024);
  console.log("Height:", options.height || 1024);
  console.log(
    "Prompt length:",
    options.prompt?.length || 0
  );

  const client = new InferenceClient(hfToken);

  const imageBlob = await client.textToImage({
    model: selectedModel,
    inputs: options.prompt,
    provider: "auto",

    parameters: {
      width: Number(options.width) || 1024,
      height: Number(options.height) || 1024,

      ...(options.negativePrompt
        ? {
            negative_prompt:
              options.negativePrompt,
          }
        : {}),
    },
  });

  console.log(
    "Hugging Face image response received."
  );

  /*
   * The HF SDK returns a Blob-like value, but the exact
   * TypeScript definition varies between SDK versions.
   *
   * We intentionally convert it through a minimal
   * server-side interface instead of depending on
   * version-specific Blob properties.
   */

  const response = imageBlob as unknown as {
    arrayBuffer: () => Promise<ArrayBuffer>;
  };

  if (
    !response ||
    typeof response.arrayBuffer !== "function"
  ) {
    throw new Error(
      "Hugging Face returned an invalid image response."
    );
  }

  const arrayBuffer =
    await response.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  if (!buffer.length) {
    throw new Error(
      "Hugging Face returned an empty image."
    );
  }

  console.log(
    "Image buffer size:",
    buffer.length
  );

  return buffer;
}

// import { InferenceClient } from "@huggingface/inference";

// export type ImageGenerationOptions = {
//   prompt: string;
//   model?: string;
//   referenceModel?: string;
//   referenceImageData?: string;
//   width?: number;
//   height?: number;
//   negativePrompt?: string;
// };

// function dataUrlToBuffer(
//   dataUrl: string
// ): Buffer {
//   const match = dataUrl.match(
//     /^data:image\/[^;]+;base64,([\s\S]+)$/
//   );

//   if (!match) {
//     throw new Error(
//       "Invalid reference image data."
//     );
//   }

//   return Buffer.from(match[1], "base64");
// }

// export async function generateImage(
//   options: ImageGenerationOptions
// ): Promise<Buffer> {
//   const hfToken = process.env.HF_TOKEN;

//   if (!hfToken) {
//     throw new Error(
//       "HF_TOKEN is not configured on the server."
//     );
//   }

//   const client = new InferenceClient(hfToken);

//   const width =
//     Number(options.width) || 1024;

//   const height =
//     Number(options.height) || 1024;

//   /*
//    * Reference-aware generation
//    */
//   if (options.referenceImageData) {
//     const selectedReferenceModel =
//       options.referenceModel ||
//       process.env.HF_IMAGE_REFERENCE_MODEL ||
//       "black-forest-labs/FLUX.1-Kontext-dev";

//     console.log("========================================");
//     console.log(
//       "Maven Hugging Face reference image provider"
//     );
//     console.log("========================================");
//     console.log(
//       "Model:",
//       selectedReferenceModel
//     );
//     console.log("Width:", width);
//     console.log("Height:", height);

//     const referenceBuffer =
//       dataUrlToBuffer(
//         options.referenceImageData
//       );

//     const imageResult =
//       await (client as any).imageToImage(
//         referenceBuffer,
//         {
//           model: selectedReferenceModel,
//           provider: "auto",
//           prompt: options.prompt,
//           parameters: {
//             width,
//             height,
//             ...(options.negativePrompt
//               ? {
//                   negative_prompt:
//                     options.negativePrompt,
//                 }
//               : {}),
//           },
//         }
//       );

//     const response =
//       imageResult as unknown as {
//         arrayBuffer?: () => Promise<ArrayBuffer>;
//       };

//     if (
//       !response ||
//       typeof response.arrayBuffer !==
//         "function"
//     ) {
//       throw new Error(
//         "Hugging Face returned an invalid reference-conditioned image response."
//       );
//     }

//     const arrayBuffer =
//       await response.arrayBuffer();

//     const buffer =
//       Buffer.from(arrayBuffer);

//     if (!buffer.length) {
//       throw new Error(
//         "Hugging Face returned an empty reference-conditioned image."
//       );
//     }

//     return buffer;
//   }

//   /*
//    * Normal text-to-image generation
//    */
//   const selectedModel =
//     options.model ||
//     process.env.HF_IMAGE_MODEL ||
//     "black-forest-labs/FLUX.1-schnell";

//   console.log("========================================");
//   console.log(
//     "Maven Hugging Face image provider"
//   );
//   console.log("========================================");
//   console.log("Model:", selectedModel);
//   console.log("Width:", width);
//   console.log("Height:", height);
//   console.log(
//     "Prompt length:",
//     options.prompt?.length || 0
//   );

//   const imageBlob =
//     await client.textToImage({
//       model: selectedModel,
//       inputs: options.prompt,
//       provider: "auto",

//       parameters: {
//         width,
//         height,

//         ...(options.negativePrompt
//           ? {
//               negative_prompt:
//                 options.negativePrompt,
//             }
//           : {}),
//       },
//     });

//   console.log(
//     "Hugging Face image response received."
//   );

//   const response =
//     imageBlob as unknown as {
//       arrayBuffer: () => Promise<ArrayBuffer>;
//     };

//   if (
//     !response ||
//     typeof response.arrayBuffer !==
//       "function"
//   ) {
//     throw new Error(
//       "Hugging Face returned an invalid image response."
//     );
//   }

//   const arrayBuffer =
//     await response.arrayBuffer();

//   const buffer =
//     Buffer.from(arrayBuffer);

//   if (!buffer.length) {
//     throw new Error(
//       "Hugging Face returned an empty image."
//     );
//   }

//   console.log(
//     "Image buffer size:",
//     buffer.length
//   );

//   return buffer;
// }