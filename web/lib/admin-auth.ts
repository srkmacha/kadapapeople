import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export const ADMIN_ROLES = new Set([
  "SUPER_ADMIN",
  "ADMIN",
  "DATA_MANAGER",
  "CONTENT_MANAGER",
]);

export type AuthenticatedAdmin = {
  userId: string;
  email: string;
  roles: string[];
};

export async function requireAdmin(request: Request): Promise<
  | { ok: true; user: AuthenticatedAdmin }
  | { ok: false; response: NextResponse }
> {
  const cookieHeader = request.headers.get("cookie") ?? "";

  const token = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("kp_auth="))
    ?.slice("kp_auth=".length);

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        { status: 401 }
      ),
    };
  }

  try {
    const user = await verifyAuthToken(decodeURIComponent(token));

    const hasAdminRole = user.roles.some((role) =>
      ADMIN_ROLES.has(role)
    );

    if (!hasAdminRole) {
      return {
        ok: false,
        response: NextResponse.json(
          {
            success: false,
            error: "You do not have permission to access this resource.",
          },
          { status: 403 }
        ),
      };
    }

    return {
      ok: true,
      user,
    };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Your session is invalid or expired.",
        },
        { status: 401 }
      ),
    };
  }
}
