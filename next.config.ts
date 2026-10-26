import type { NextConfig } from "next";

/**
 * Azure App Service only: set the app setting AZURE_STANDALONE=1 to build the
 * lean standalone server bundle (`node .next/standalone/server.js` startup).
 * Vercel leaves it unset and builds exactly as before — this flag is inert on
 * the Vercel builder, which uses its own packaging.
 */
const nextConfig: NextConfig = {
  ...(process.env.AZURE_STANDALONE === "1" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
