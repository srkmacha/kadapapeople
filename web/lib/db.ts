import { Pool } from "pg";
import fs from "fs";
import path from "path";

function getDatabaseUrl(): string {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    throw new Error(`Missing .env.local at ${envPath}`);
  }

  const content = fs.readFileSync(envPath, "utf8");

  const match = content.match(
    /^\s*DATABASE_URL\s*=\s*["']?(.+?)["']?\s*$/m
  );

  if (!match || !match[1]) {
    throw new Error(
      `DATABASE_URL not found in ${envPath}`
    );
  }

  return match[1].trim().replace(/^["']|["']$/g, "");
}

const globalForDb = globalThis as unknown as {
  pgPool?: Pool;
};

export const db =
  globalForDb.pgPool ??
  new Pool({
    connectionString: getDatabaseUrl(),
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = db;
}
