import { NextResponse } from "next/server";

import type {
  DesignIntent,
  DesignInterpretation,
} from "@/app/lib/design/types";

import { createDummyConcepts } from "@/app/lib/ai/concepts";
import { generateMavenConceptImage } from "@/app/lib/ai/image";

export const runtime = "nodejs";

type ConceptRequest = {
  designIntent: DesignIntent;
  interpretation: DesignInterpretation;
  referenceImageData?: string;
};

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as ConceptRequest;

    if (!body?.designIntent) {
      return NextResponse.json(
        {
          error:
            "Design intent is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!body?.interpretation) {
      return NextResponse.json(
        {
          error:
            "Design interpretation is required.",
        },
        {
          status: 400,
        }
      );
    }

    const concepts =
      createDummyConcepts(
        body.designIntent,
        body.interpretation
      );

    const conceptsWithImages = [];

    for (const concept of concepts) {
      console.log(
        `Maven image generation: ${concept.number} / ${concept.title}`
      );

      const imageUrl =
        await generateMavenConceptImage(
          concept,
          body.designIntent,
          body.interpretation,
          body.referenceImageData
        );

      conceptsWithImages.push({
        ...concept,
        imageUrl,
      });
    }

    return NextResponse.json({
      success: true,
      concepts: conceptsWithImages,
    });
  } catch (error) {
    console.error(
      "Maven Concept Generation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate Maven design concepts.",
      },
      {
        status: 500,
      }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";

// import type {
//   DesignIntent,
//   DesignInterpretation,
// } from "@/app/lib/design/types";

// import { createDummyConcepts } from "@/app/lib/ai/concepts";
// import { generateMavenConceptImage } from "@/app/lib/ai/image";

// import {
//   enforceRateLimit,
//   readJsonBody,
//   cleanString,
//   cleanStringArray,
//   badRequest,
//   serverError,
// } from "@/app/lib/apiGuard";

// export const runtime = "nodejs";

// type ConceptRequest = {
//   designIntent: DesignIntent;
//   interpretation: DesignInterpretation;
//   referenceImageData?: string;
// };

// const MAX_BODY_BYTES = 10 * 1024 * 1024;

// export async function POST(
//   request: NextRequest
// ) {
//   try {
//     const rateLimit = await enforceRateLimit(
//       request,
//       {
//         endpoint: "concepts",
//         maxRequests: 3,
//         windowMs: 60 * 60 * 1000,
//       }
//     );

//     if (rateLimit) {
//       return rateLimit;
//     }

//     const body =
//       (await readJsonBody(
//         request,
//         MAX_BODY_BYTES
//       )) as ConceptRequest;

//     if (!body?.designIntent) {
//       return badRequest(
//         "Design intent is required."
//       );
//     }

//     if (!body?.interpretation) {
//       return badRequest(
//         "Design interpretation is required."
//       );
//     }

//     const intent = body.designIntent;

//     const safeDesignIntent = {
//       project: {
//         name: cleanString(
//           intent.project?.name,
//           200
//         ),
//         location: cleanString(
//           intent.project?.location,
//           160
//         ),
//         space: cleanString(
//           intent.project?.space,
//           160
//         ),
//       },

//       application: cleanStringArray(
//         intent.application,
//         8,
//         80
//       ),

//       atmosphere: cleanStringArray(
//         intent.atmosphere,
//         8,
//         80
//       ),

//       materials: cleanStringArray(
//         intent.materials,
//         12,
//         80
//       ),

//       fixture: cleanStringArray(
//         intent.fixture,
//         8,
//         80
//       ),

//       reference: {
//         fileName: cleanString(
//           intent.reference?.fileName,
//           250
//         ),
//         imageUrl: "",
//         notes: cleanString(
//           intent.reference?.notes,
//           2000
//         ),
//       },

//       scale: cleanString(
//         intent.scale,
//         80
//       ),
//     };

//     let referenceImageData =
//       typeof body.referenceImageData === "string"
//         ? body.referenceImageData
//         : undefined;

//     if (
//       referenceImageData &&
//       !referenceImageData.startsWith(
//         "data:image/"
//       )
//     ) {
//       referenceImageData = undefined;
//     }

//     if (
//       referenceImageData &&
//       referenceImageData.length >
//         9 * 1024 * 1024
//     ) {
//       return NextResponse.json(
//         {
//           error:
//             "The reference image is too large.",
//         },
//         { status: 413 }
//       );
//     }

//     const concepts =
//       createDummyConcepts(
//         safeDesignIntent,
//         body.interpretation
//       );

//     const conceptsWithImages = [];

//     for (const concept of concepts) {
//       console.log(
//         `Maven image generation: ${concept.number} / ${concept.title}`
//       );

//       const imageUrl =
//         await generateMavenConceptImage(
//           concept,
//           safeDesignIntent,
//           body.interpretation,
//           referenceImageData
//         );

//       conceptsWithImages.push({
//         ...concept,
//         imageUrl,
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       concepts: conceptsWithImages,
//     });
//   } catch (error) {
//     console.error(
//       "Maven Concept Generation error:",
//       error
//     );

//     if (
//       error instanceof Error &&
//       error.message === "REQUEST_TOO_LARGE"
//     ) {
//       return NextResponse.json(
//         {
//           error:
//             "The request is too large. Please use a smaller reference image.",
//         },
//         { status: 413 }
//       );
//     }

//     if (
//       error instanceof Error &&
//       error.message === "INVALID_JSON"
//     ) {
//       return badRequest(
//         "Invalid request data."
//       );
//     }

//     const message =
//       error instanceof Error
//         ? error.message
//         : "";

//     if (
//       /credit|quota|depleted|limit/i.test(
//         message
//       )
//     ) {
//       return NextResponse.json(
//         {
//           error:
//             "Maven's image generation service has temporarily reached its usage limit. Please try again later.",
//         },
//         { status: 503 }
//       );
//     }

//     return serverError();
//   }
// }