import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (!auth.ok) {
    return auth.response;
  }

  try {
    const result = await db.query(`
      SELECT
        id,
        name,
        slug,
        description,
        parent_id
      FROM categories
      WHERE is_active = true
      ORDER BY
        CASE
          WHEN parent_id IS NULL THEN 0
          ELSE 1
        END,
        name ASC
    `);

    return NextResponse.json(
      {
        success: true,
        categories: result.rows,
        count: result.rows.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("CATEGORY API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load categories.",
      },
      { status: 500 }
    );
  }
}
