import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function hashPassword(
  password: string
): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export async function createAuthToken(payload: {
  userId: string;
  email: string;
  roles: string[];
}) {
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    roles: payload.roles,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecretKey());
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, getSecretKey());

  return {
    userId: String(payload.userId),
    email: String(payload.email),
    roles: Array.isArray(payload.roles)
      ? payload.roles.map(String)
      : [],
  };
}
