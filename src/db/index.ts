import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";
import { drizzle as drizzleNeon, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { drizzle as drizzleNodePg, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

type Client = NeonHttpDatabase<typeof schema> | NodePgDatabase<typeof schema>;

function createClient(url: string): Client {
  // Neon endpoints speak their HTTP/1.1 wire protocol; anything else (local
  // dev, self-hosted Postgres) uses a classic node-postgres pool.
  if (url.includes("neon.tech")) {
    return drizzleNeon(neon(url), { schema });
  }
  return drizzleNodePg(new Pool({ connectionString: url }), { schema });
}

/**
 * Lazily constructed Postgres client. The connection is created on first use
 * so the app can boot (and serve login/static pages) before DATABASE_URL
 * exists; only the first query surfaces a readable configuration error.
 */
let _db: Client | null = null;

export function getDb(): Client {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Create a Neon Postgres database and add its connection string to .env, then run `npm run db:push`.",
    );
  }
  _db = createClient(url);
  return _db;
}

export type { Client as Db };
export { schema };
