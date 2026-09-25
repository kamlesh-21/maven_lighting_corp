import { NextResponse } from "next/server";
import type { DesignIntent } from "@/app/lib/design/types";
import { interpretDesignIntent } from "@/app/lib/ai/generate";

export const runtime = "nodejs";

type InterpretRequest = {
  designIntent: DesignIntent;
  referenceImageData?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InterpretRequest;

    if (!body?.designIntent) {
      return NextResponse.json(
        {
          error: "Design intent is required.",
        },
        {
          status: 400,
        }
      );
    }

    const interpretation = await interpretDesignIntent(
      body.designIntent,
      body.referenceImageData
        ? {
            dataUrl: body.referenceImageData,
          }
        : undefined
    );

    return NextResponse.json({
      success: true,
      interpretation,
    });
  } catch (error) {
    console.error("Maven Design Interpreter error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to interpret the design intent.",
      },
      {
        status: 500,
      }
    );
  }
}
