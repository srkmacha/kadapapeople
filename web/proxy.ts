import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const allowedRoles = new Set([
  "SUPER_ADMIN",
  "ADMIN",
  "DATA_MANAGER",
  "CONTENT_MANAGER",
]);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("kp_auth")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = process.env.AUTH_SECRET;

    if (!secret) {
      throw new Error("AUTH_SECRET is missing");
    }

    const secretKey = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, secretKey);

    const roles = Array.isArray(payload.roles)
      ? payload.roles.map(String)
      : [];

    const hasAccess = roles.some((role) => allowedRoles.has(role));

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
