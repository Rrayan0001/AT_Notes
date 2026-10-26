/**
 * Domain-switch cooldown shared by the switch API and (indirectly, via the
 * admin unlock) the admin API. One interval, one clock.
 */
export const COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000;

export interface CooldownState {
  /** A switch may be performed right now. */
  canChangeNow: boolean;
  /** When the cooldown ends; null when no cooldown is running. */
  cooldownEndsAt: Date | null;
}

/** `lastChangedAt === null` means the account still has its free first switch. */
export function cooldownState(lastChangedAt: Date | null): CooldownState {
  if (!lastChangedAt) return { canChangeNow: true, cooldownEndsAt: null };
  const cooldownEndsAt = new Date(lastChangedAt.getTime() + COOLDOWN_MS);
  return { canChangeNow: Date.now() >= cooldownEndsAt.getTime(), cooldownEndsAt };
}
