import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cwd = process.cwd();
    const envPath = path.join(cwd, ".env.local");

    const envExists = fs.existsSync(envPath);

    let databaseUrlFound = false;

    if (envExists) {
      const content = fs.readFileSync(envPath, "utf8");
      databaseUrlFound = /^\s*DATABASE_URL\s*=/m.test(content);
    }

    return NextResponse.json({
      success: true,
      message: "Next.js API runtime is working.",
      cwd,
      envExists,
      databaseUrlFound,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}
