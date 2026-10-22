/**
 * Names of the OAuth providers the .env currently makes available.
 * Computed at request time so adding keys is enough — no rebuild step.
 */
export function oauthProviderNames(): string[] {
  const providers: string[] = [];
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) providers.push("google");
  return providers;
}
