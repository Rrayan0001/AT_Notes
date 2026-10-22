import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
) => Promise<Buffer>;

/**
 * Password hashing on Node's built-in scrypt — no native dependency.
 * Format: `scrypt$<N>$<salt>$<hash>` in base64.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltB64, hashB64] = stored.split("$");
  if (scheme !== "scrypt" || !saltB64 || !hashB64) return false;
  const hash = Buffer.from(hashB64, "base64");
  const candidate = await scrypt(password, Buffer.from(saltB64, "base64"), hash.length);
  return candidate.length === hash.length && timingSafeEqual(candidate, hash);
}
