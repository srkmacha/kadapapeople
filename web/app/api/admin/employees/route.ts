import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

const MANAGE_ROLES = new Set([
  "SUPER_ADMIN",
  "ADMIN",
]);

const ASSIGNABLE_ROLES = new Set([
  "ADMIN",
  "BUSINESS_MANAGER",
  "BUSINESS_OWNER",
  "BUSINESS_STAFF",
  "CONTENT_MANAGER",
  "DATA_MANAGER",
  "MODERATOR",
  "SUPPORT",
]);

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null
  );
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);

  if (!auth.ok) {
    return auth.response;
  }

  try {
    const result = await db.query(`
      SELECT
        u.id,
        u.name,
        u.email,
        u.phone,
        u.status,
        u.email_verified_at,
        u.phone_verified_at,
        u.created_at,
        u.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', r.id,
              'name', r.name,
              'description', r.description
            )
            ORDER BY r.name
          ) FILTER (WHERE r.id IS NOT NULL),
          '[]'::json
        ) AS roles
      FROM users u
      LEFT JOIN user_roles ur
        ON ur.user_id = u.id
      LEFT JOIN roles r
        ON r.id = ur.role_id
      GROUP BY
        u.id,
        u.name,
        u.email,
        u.phone,
        u.status,
        u.email_verified_at,
        u.phone_verified_at,
        u.created_at,
        u.updated_at
      ORDER BY u.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      employees: result.rows,
    });
  } catch (error) {
    console.error("Employee list error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load employees.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);

  if (!auth.ok) {
    return auth.response;
  }

  const currentRoles = new Set(auth.user.roles);

  if (![...MANAGE_ROLES].some((role) => currentRoles.has(role))) {
    return NextResponse.json(
      {
        success: false,
        error: "You do not have permission to manage employees.",
      },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body.",
      },
      { status: 400 }
    );
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim() || null;
  const password = String(body.password || "");

  const requestedRoles = Array.isArray(body.roles)
    ? body.roles.map((role) => String(role).trim())
    : [];

  if (!name) {
    return NextResponse.json(
      {
        success: false,
        error: "Employee name is required.",
      },
      { status: 400 }
    );
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      {
        success: false,
        error: "A valid email address is required.",
      },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      {
        success: false,
        error: "Password must contain at least 8 characters.",
      },
      { status: 400 }
    );
  }

  if (!requestedRoles.length) {
    return NextResponse.json(
      {
        success: false,
        error: "At least one employee role is required.",
      },
      { status: 400 }
    );
  }

  const invalidRoles = requestedRoles.filter(
    (role) => !ASSIGNABLE_ROLES.has(role)
  );

  if (invalidRoles.length) {
    return NextResponse.json(
      {
        success: false,
        error: `Invalid employee role: ${invalidRoles.join(", ")}`,
      },
      { status: 400 }
    );
  }

  if (
    currentRoles.has("ADMIN") &&
    !currentRoles.has("SUPER_ADMIN") &&
    requestedRoles.includes("ADMIN")
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Only a SUPER_ADMIN can create another ADMIN.",
      },
      { status: 403 }
    );
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const existing = await client.query(
      `
        SELECT id
        FROM users
        WHERE lower(email) = lower($1)
        LIMIT 1
      `,
      [email]
    );

    if (existing.rowCount) {
      await client.query("ROLLBACK");

      return NextResponse.json(
        {
          success: false,
          error: "An employee with this email already exists.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = randomUUID();

    await client.query(
      `
        INSERT INTO users (
          id,
          name,
          email,
          phone,
          password_hash,
          status
        )
        VALUES ($1, $2, $3, $4, $5, 'ACTIVE')
      `,
      [userId, name, email, phone, passwordHash]
    );

    const roleResult = await client.query(
      `
        SELECT id, name
        FROM roles
        WHERE name = ANY($1::varchar[])
      `,
      [requestedRoles]
    );

    if (roleResult.rowCount !== requestedRoles.length) {
      throw new Error("One or more requested roles do not exist.");
    }

    for (const role of roleResult.rows) {
      await client.query(
        `
          INSERT INTO user_roles (
            user_id,
            role_id
          )
          VALUES ($1, $2)
        `,
        [userId, role.id]
      );
    }

    await client.query(
      `
        INSERT INTO audit_logs (
          user_id,
          action,
          entity_type,
          entity_id,
          new_values,
          ip_address,
          user_agent
        )
        VALUES (
          $1,
          'CREATE',
          'USER',
          $2,
          $3::jsonb,
          $4,
          $5
        )
      `,
      [
        auth.user.userId,
        userId,
        JSON.stringify({
          name,
          email,
          phone,
          status: "ACTIVE",
          roles: requestedRoles,
        }),
        getClientIp(request),
        request.headers.get("user-agent"),
      ]
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        success: true,
        employee: {
          id: userId,
          name,
          email,
          phone,
          status: "ACTIVE",
          roles: requestedRoles,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Employee creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create employee.",
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
