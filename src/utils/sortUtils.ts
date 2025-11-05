// src/utils/sortUtils.ts

export type VerificationStatus = "unverified" | "verified" | "rejected";

/**
 * Converts a verified flag into a normalized string status.
 */
export function getVerificationStatus(v: boolean | null): VerificationStatus {
  if (v === null) return "unverified";
  return v ? "verified" : "rejected";
}

/**
 * Sorts by verification status priority:
 * unverified → verified → rejected
 */
export function sortByVerification<T extends { verified: boolean | null }>(
  a: T,
  b: T
) {
  const order: Record<VerificationStatus, number> = {
    unverified: 0,
    verified: 1,
    rejected: 2,
  };
  return (
    order[getVerificationStatus(a.verified)] -
    order[getVerificationStatus(b.verified)]
  );
}

/**
 * Sorts by admin_seen flag (false → true)
 * meaning unseen items appear first.
 */
export function sortByAdminSeen<T extends { admin_seen: boolean }>(a: T, b: T) {
  if (a.admin_seen === b.admin_seen) return 0;
  return a.admin_seen ? 1 : -1;
}

/**
 * Combines multiple sort functions into one chained sorter.
 * (like SQL ORDER BY col1, col2, ...)
 */
export function chainSorters<T>(...sortFns: ((a: T, b: T) => number)[]) {
  return (a: T, b: T) => {
    for (const fn of sortFns) {
      const result = fn(a, b);
      if (result !== 0) return result;
    }
    return 0;
  };
}
