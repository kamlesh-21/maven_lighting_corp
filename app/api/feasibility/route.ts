// // app/api/feasibility/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getMavenDb } from "@/app/lib/mongodb";
// import { sendFeasibilityNotification } from "@/app/lib/email";

// export const runtime = "nodejs";

// const MAX_REQUESTS_PER_HOUR = 10;

// function clean(value: unknown, maxLength = 200) {
//   if (typeof value !== "string") {
//     return "";
//   }

//   return value.trim().slice(0, maxLength);
// }

// function cleanArray(
//   value: unknown,
//   maxItems = 20,
//   maxLength = 100
// ) {
//   if (!Array.isArray(value)) {
//     return [];
//   }

//   return value
//     .filter((item): item is string => typeof item === "string")
//     .slice(0, maxItems)
//     .map((item) => item.trim().slice(0, maxLength));
// }

// function isValidEmail(email: string) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function getClientIp(request: NextRequest) {
//   const forwardedFor =
//     request.headers.get("x-forwarded-for");

//   if (forwardedFor) {
//     return forwardedFor.split(",")[0].trim();
//   }

//   return (
//     request.headers.get("x-real-ip") ||
//     "unknown"
//   );
// }

// function createEnquiryId() {
//   const now = new Date();

//   const year = String(now.getFullYear()).slice(-2);
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");

//   const random = Math.floor(
//     1000 + Math.random() * 9000
//   );

//   return `MAVEN-FR-${year}${month}${day}-${random}`;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const contact = {
//       name: clean(body.contact?.name, 120),
//       email: clean(body.contact?.email, 160).toLowerCase(),
//       phone: clean(body.contact?.phone, 40),
//     };

//     const project = {
//       name: clean(body.project?.name, 200),
//       location: clean(body.project?.location, 160),
//       space: clean(body.project?.space, 160),
//     };

//     const requirement = {
//       quantity: clean(body.requirement?.quantity, 100),
//       timeline: clean(body.requirement?.timeline, 160),
//       notes: clean(body.requirement?.notes, 2000),
//     };

//     const concept = {
//       id: clean(body.concept?.id, 100),
//       number: clean(body.concept?.number, 20),
//       title: clean(body.concept?.title, 120),
//       subtitle: clean(body.concept?.subtitle, 300),
//       description: clean(body.concept?.description, 2000),
//       form: clean(body.concept?.form, 2000),
//       material: clean(body.concept?.material, 2000),
//       lighting: clean(body.concept?.lighting, 2000),
//       architecturalRole: clean(
//         body.concept?.architecturalRole,
//         2000
//       ),
//     };

//     const designIntent = {
//       application: cleanArray(
//         body.designIntent?.application
//       ),
//       atmosphere: cleanArray(
//         body.designIntent?.atmosphere
//       ),
//       materials: cleanArray(
//         body.designIntent?.materials
//       ),
//       fixture: cleanArray(
//         body.designIntent?.fixture
//       ),
//       scale: clean(body.designIntent?.scale, 100),
//       reference: {
//         fileName: clean(
//           body.designIntent?.reference?.fileName,
//           250
//         ),
//         notes: clean(
//           body.designIntent?.reference?.notes,
//           2000
//         ),
//       },
//     };

//     if (!contact.name) {
//       return NextResponse.json(
//         { error: "Please enter your name." },
//         { status: 400 }
//       );
//     }

//     if (!isValidEmail(contact.email)) {
//       return NextResponse.json(
//         { error: "Please enter a valid email address." },
//         { status: 400 }
//       );
//     }

//     if (!contact.phone) {
//       return NextResponse.json(
//         { error: "Please enter your phone number." },
//         { status: 400 }
//       );
//     }

//     if (!project.name) {
//       return NextResponse.json(
//         { error: "Please enter the project name." },
//         { status: 400 }
//       );
//     }

//     if (!concept.id || !concept.title) {
//       return NextResponse.json(
//         { error: "The selected Maven concept is missing." },
//         { status: 400 }
//       );
//     }

//     const db = await getMavenDb();

//     const rateLimitCollection =
//       db.collection("api_rate_limits");

//     const ip = getClientIp(request);
//     const now = new Date();

//     const windowStart = new Date(
//       now.getTime() - 60 * 60 * 1000
//     );

//     const recentRequests =
//       await rateLimitCollection.countDocuments({
//         ip,
//         endpoint: "feasibility",
//         createdAt: {
//           $gte: windowStart,
//         },
//       });

//     if (recentRequests >= MAX_REQUESTS_PER_HOUR) {
//       return NextResponse.json(
//         {
//           error:
//             "Too many requests. Please try again later.",
//         },
//         { status: 429 }
//       );
//     }

//     await rateLimitCollection.insertOne({
//       ip,
//       endpoint: "feasibility",
//       createdAt: now,
//     });

//     const enquiryId = createEnquiryId();

//     const enquiry = {
//       enquiryId,
//       status: "new",
//       createdAt: now,

//       contact,

//       project,

//       requirement,

//       concept,

//       designIntent,

//       source: "maven-design-studio",

//       notification: {
//         attempted: false,
//         sent: false,
//       },
//     };

//     const collection =
//       db.collection("feasibility_requests");

//     await collection.createIndex(
//       { enquiryId: 1 },
//       { unique: true }
//     );

//     await collection.createIndex({
//       createdAt: -1,
//     });

//     const insertResult =
//       await collection.insertOne(enquiry);

//     try {
//       await sendFeasibilityNotification({
//         enquiryId,
//         contact,
//         project,
//         requirement,
//         concept: {
//           number: concept.number,
//           title: concept.title,
//           subtitle: concept.subtitle,
//         },
//       });

//       await collection.updateOne(
//         { _id: insertResult.insertedId },
//         {
//           $set: {
//             "notification.attempted": true,
//             "notification.sent": true,
//             "notification.sentAt": new Date(),
//           },
//         }
//       );
//     } catch (emailError) {
//       console.error(
//         "Maven notification email failed:",
//         emailError
//       );

//       await collection.updateOne(
//         { _id: insertResult.insertedId },
//         {
//           $set: {
//             "notification.attempted": true,
//             "notification.sent": false,
//             "notification.error":
//               emailError instanceof Error
//                 ? emailError.message
//                 : "Unknown email error",
//           },
//         }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       enquiryId,
//       message:
//         "Your feasibility request has been received.",
//     });
//   } catch (error) {
//     console.error(
//       "Maven feasibility API error:",
//       error
//     );

//     return NextResponse.json(
//       {
//         error:
//           "We could not submit the request right now. Please try again.",
//       },
//       { status: 500 }
//     );
//   }
// }

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getMavenDb } from "@/app/lib/mongodb";
import {
  sendFeasibilityNotification,
} from "@/app/lib/email";

import {
  enforceRateLimit,
  readJsonBody,
  cleanString,
  cleanStringArray,
  isValidEmail,
  badRequest,
  serverError,
} from "@/app/lib/apiGuard";

export const runtime = "nodejs";

const MAX_BODY_BYTES =
  500 * 1024;

function createEnquiryId() {
  const now = new Date();

  const year = String(
    now.getFullYear()
  ).slice(-2);

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `MAVEN-FR-${year}${month}${day}-${random}`;
}

export async function POST(
  request: NextRequest
) {
  try {
    const rateLimit =
      await enforceRateLimit(
        request,
        {
          endpoint: "feasibility",
          maxRequests: 10,
          windowMs:
            60 * 60 * 1000,
        }
      );

    if (rateLimit) {
      return rateLimit;
    }

    const body =
      await readJsonBody(
        request,
        MAX_BODY_BYTES
      );

    const contact = {
      name: cleanString(
        body.contact?.name,
        120
      ),

      email: cleanString(
        body.contact?.email,
        160
      ).toLowerCase(),

      phone: cleanString(
        body.contact?.phone,
        40
      ),
    };

    const project = {
      name: cleanString(
        body.project?.name,
        200
      ),

      location: cleanString(
        body.project?.location,
        160
      ),

      space: cleanString(
        body.project?.space,
        160
      ),
    };

    const requirement = {
      quantity: cleanString(
        body.requirement?.quantity,
        100
      ),

      timeline: cleanString(
        body.requirement?.timeline,
        160
      ),

      notes: cleanString(
        body.requirement?.notes,
        2000
      ),
    };

    const concept = {
      id: cleanString(
        body.concept?.id,
        100
      ),

      number: cleanString(
        body.concept?.number,
        20
      ),

      title: cleanString(
        body.concept?.title,
        120
      ),

      subtitle: cleanString(
        body.concept?.subtitle,
        300
      ),

      description: cleanString(
        body.concept?.description,
        2000
      ),

      form: cleanString(
        body.concept?.form,
        2000
      ),

      material: cleanString(
        body.concept?.material,
        2000
      ),

      lighting: cleanString(
        body.concept?.lighting,
        2000
      ),

      architecturalRole:
        cleanString(
          body.concept
            ?.architecturalRole,
          2000
        ),
    };

    const designIntent = {
      application:
        cleanStringArray(
          body.designIntent
            ?.application,
          8,
          80
        ),

      atmosphere:
        cleanStringArray(
          body.designIntent
            ?.atmosphere,
          8,
          80
        ),

      materials:
        cleanStringArray(
          body.designIntent
            ?.materials,
          12,
          80
        ),

      fixture:
        cleanStringArray(
          body.designIntent
            ?.fixture,
          8,
          80
        ),

      scale: cleanString(
        body.designIntent?.scale,
        80
      ),

      reference: {
        fileName: cleanString(
          body.designIntent
            ?.reference?.fileName,
          250
        ),

        notes: cleanString(
          body.designIntent
            ?.reference?.notes,
          2000
        ),
      },
    };

    if (!contact.name) {
      return badRequest(
        "Please enter your name."
      );
    }

    if (
      !isValidEmail(
        contact.email
      )
    ) {
      return badRequest(
        "Please enter a valid email address."
      );
    }

    if (!contact.phone) {
      return badRequest(
        "Please enter your phone number."
      );
    }

    if (!project.name) {
      return badRequest(
        "Please enter the project name."
      );
    }

    if (
      !concept.id ||
      !concept.title
    ) {
      return badRequest(
        "The selected Maven concept is missing."
      );
    }

    const db =
      await getMavenDb();

    const now = new Date();

    const enquiryId =
      createEnquiryId();

    const enquiry = {
      enquiryId,

      status: "new",

      createdAt: now,

      contact,

      project,

      requirement,

      concept,

      designIntent,

      source:
        "maven-design-studio",

      notification: {
        attempted: false,
        sent: false,
      },
    };

    const collection =
      db.collection(
        "feasibility_requests"
      );

    const insertResult =
      await collection.insertOne(
        enquiry
      );

    try {
      await sendFeasibilityNotification(
        {
          enquiryId,

          contact,

          project,

          requirement,

          concept: {
            number:
              concept.number,

            title:
              concept.title,

            subtitle:
              concept.subtitle,
          },
        }
      );

      await collection.updateOne(
        {
          _id:
            insertResult.insertedId,
        },

        {
          $set: {
            "notification.attempted":
              true,

            "notification.sent":
              true,

            "notification.sentAt":
              new Date(),
          },
        }
      );
    } catch (emailError) {
      console.error(
        "Maven notification email failed:",
        emailError
      );

      await collection.updateOne(
        {
          _id:
            insertResult.insertedId,
        },

        {
          $set: {
            "notification.attempted":
              true,

            "notification.sent":
              false,

            "notification.error":
              emailError instanceof Error
                ? emailError.message
                : "Unknown email error",
          },
        }
      );
    }

    return NextResponse.json({
      success: true,

      enquiryId,

      message:
        "Your feasibility request has been received.",
    });
  } catch (error) {
    console.error(
      "Maven feasibility API error:",
      error
    );

    if (
      error instanceof Error &&
      error.message ===
        "REQUEST_TOO_LARGE"
    ) {
      return NextResponse.json(
        {
          error:
            "The request is too large.",
        },
        {
          status: 413,
        }
      );
    }

    if (
      error instanceof Error &&
      error.message ===
        "INVALID_JSON"
    ) {
      return badRequest(
        "Invalid request data."
      );
    }

    return serverError();
  }
}