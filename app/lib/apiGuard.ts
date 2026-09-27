import { NextRequest, NextResponse } from "next/server";
import { getMavenDb } from "@/app/lib/mongodb";

type RateLimitConfig = {
  endpoint: string;
  maxRequests: number;
  windowMs: number;
};

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export async function enforceRateLimit(
  request: NextRequest,
  config: RateLimitConfig
) {
  const db = await getMavenDb();

  const collection = db.collection("api_rate_limits");

  const ip = getClientIp(request);
  const now = new Date();

  const windowStart = new Date(
    now.getTime() - config.windowMs
  );

  const recentRequests =
    await collection.countDocuments({
      ip,
      endpoint: config.endpoint,
      createdAt: {
        $gte: windowStart,
      },
    });

  if (recentRequests >= config.maxRequests) {
    return NextResponse.json(
      {
        error:
          "Too many requests. Please wait and try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "3600",
        },
      }
    );
  }

  await collection.insertOne({
    ip,
    endpoint: config.endpoint,
    createdAt: now,
  });

  return null;
}

export async function readJsonBody(
  request: Request,
  maxBytes: number
) {
  const contentLength = request.headers.get("content-length");

  if (
    contentLength &&
    Number(contentLength) > maxBytes
  ) {
    throw new Error("REQUEST_TOO_LARGE");
  }

  const text = await request.text();

  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    throw new Error("REQUEST_TOO_LARGE");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("INVALID_JSON");
  }
}

export function cleanString(
  value: unknown,
  maxLength: number
) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

export function cleanStringArray(
  value: unknown,
  maxItems = 20,
  maxLength = 100
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .slice(0, maxItems)
    .map((item) =>
      cleanString(item, maxLength)
    )
    .filter(Boolean);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function badRequest(message: string) {
  return NextResponse.json(
    { error: message },
    { status: 400 }
  );
}

export function serverError() {
  return NextResponse.json(
    {
      error:
        "Maven could not process this request right now. Please try again.",
    },
    { status: 500 }
  );
}