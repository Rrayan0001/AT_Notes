import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Scripts run outside Next.js, which is what normally loads .env files.
 * Node's built-in loader avoids adding a dotenv dependency.
 */
export function loadEnv(): void {
  for (const file of [".env.local", ".env"]) {
    const path = join(process.cwd(), file);
    if (existsSync(path)) {
      process.loadEnvFile(path);
      return;
    }
  }
}
