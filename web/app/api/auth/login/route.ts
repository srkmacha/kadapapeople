import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  createAuthToken,
  verifyPassword,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const userResult = await db.query(
      `
        SELECT
          id,
          name,
          email,
          password_hash,
          status
        FROM users
        WHERE LOWER(email) = $1
        LIMIT 1
      `,
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          error: "This account is not active.",
        },
        { status: 403 }
      );
    }

    if (!user.password_hash) {
      return NextResponse.json(
        {
          success: false,
          error: "This account does not have a password configured.",
        },
        { status: 403 }
      );
    }

    const passwordValid = await verifyPassword(
      password,
      user.password_hash
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const rolesResult = await db.query(
      `
        SELECT r.name
        FROM user_roles ur
        INNER JOIN roles r
          ON r.id = ur.role_id
        WHERE ur.user_id = $1
        ORDER BY r.name
      `,
      [user.id]
    );

    const roles = rolesResult.rows.map(
      (row) => row.name as string
    );

    if (roles.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "This account has no assigned role.",
        },
        { status: 403 }
      );
    }

    const token = await createAuthToken({
      userId: user.id,
      email: user.email,
      roles,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
      },
    });

    response.cookies.set({
      name: "kp_auth",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to sign in.",
      },
      { status: 500 }
    );
  }
}
