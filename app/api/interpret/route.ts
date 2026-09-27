// // app/api/interpret/route.ts
// import { NextResponse } from "next/server";

// import type { DesignIntent } from "@/app/lib/design/types";
// import { interpretDesignIntent } from "@/app/lib/ai/generate";

// export const runtime = "nodejs";

// type InterpretRequest = {
//   designIntent: DesignIntent;
//   referenceImageData?: string;
// };

// export async function POST(request: Request) {
//   try {
//     const body =
//       (await request.json()) as InterpretRequest;

//     if (!body?.designIntent) {
//       return NextResponse.json(
//         {
//           error: "Design intent is required.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const interpretation =
//       await interpretDesignIntent(
//         body.designIntent,
//         body.referenceImageData
//           ? {
//               dataUrl:
//                 body.referenceImageData,
//             }
//           : undefined
//       );

//     return NextResponse.json({
//       success: true,
//       interpretation,
//     });
//   } catch (error) {
//     console.error(
//       "Maven Design Interpreter error:",
//       error
//     );

//     return NextResponse.json(
//       {
//         error:
//           error instanceof Error
//             ? error.message
//             : "Unable to interpret the design intent.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

import type { DesignIntent } from "@/app/lib/design/types";
import { interpretDesignIntent } from "@/app/lib/ai/generate";

import {
  enforceRateLimit,
  readJsonBody,
  cleanString,
  cleanStringArray,
  badRequest,
  serverError,
} from "@/app/lib/apiGuard";

export const runtime = "nodejs";

type InterpretRequest = {
  designIntent: DesignIntent;
  referenceImageData?: string;
};

const MAX_BODY_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(
      request,
      {
        endpoint: "interpret",
        maxRequests: 10,
        windowMs: 60 * 60 * 1000,
      }
    );

    if (rateLimit) {
      return rateLimit;
    }

    const body =
      (await readJsonBody(
        request,
        MAX_BODY_BYTES
      )) as InterpretRequest;

    if (!body?.designIntent) {
      return badRequest(
        "Design intent is required."
      );
    }

    const intent = body.designIntent;

    const safeDesignIntent = {
      project: {
        name: cleanString(
          intent.project?.name,
          200
        ),
        location: cleanString(
          intent.project?.location,
          160
        ),
        space: cleanString(
          intent.project?.space,
          160
        ),
      },

      application: cleanStringArray(
        intent.application,
        8,
        80
      ),

      atmosphere: cleanStringArray(
        intent.atmosphere,
        8,
        80
      ),

      materials: cleanStringArray(
        intent.materials,
        12,
        80
      ),

      fixture: cleanStringArray(
        intent.fixture,
        8,
        80
      ),

      reference: {
        fileName: cleanString(
          intent.reference?.fileName,
          250
        ),
        imageUrl: "",
        notes: cleanString(
          intent.reference?.notes,
          2000
        ),
      },

      scale: cleanString(
        intent.scale,
        80
      ),
    };

    let referenceImageData =
      typeof body.referenceImageData === "string"
        ? body.referenceImageData
        : undefined;

    if (referenceImageData) {
      if (
        !referenceImageData.startsWith(
          "data:image/"
        )
      ) {
        referenceImageData = undefined;
      }

      if (
        referenceImageData &&
        referenceImageData.length >
          9 * 1024 * 1024
      ) {
        return badRequest(
          "The reference image is too large."
        );
      }
    }

    const interpretation =
      await interpretDesignIntent(
        safeDesignIntent,
        referenceImageData
          ? {
              dataUrl: referenceImageData,
            }
          : undefined
      );

    return NextResponse.json({
      success: true,
      interpretation,
    });
  } catch (error) {
    console.error(
      "Maven Design Interpreter error:",
      error
    );

    if (
      error instanceof Error &&
      error.message === "REQUEST_TOO_LARGE"
    ) {
      return NextResponse.json(
        {
          error:
            "The request is too large. Please use a smaller reference image.",
        },
        { status: 413 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "INVALID_JSON"
    ) {
      return badRequest(
        "Invalid request data."
      );
    }

    return serverError();
  }
}