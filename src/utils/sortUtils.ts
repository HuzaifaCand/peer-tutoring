// src/utils/sortUtils.ts

/**
 * Generic timestamp sorter.
 *
 * @param key - The field name of the timestamp (string key of the object)
 * @param order - "asc" for earliest first, "desc" for latest first
 *
 * Handles:
 *  - ISO strings, Date objects, or null/undefined values
 *  - Safe even if the field doesn't exist (returns 0)
 */
export function sortByTimestamp<T>(
  key: keyof T,
  order: "asc" | "desc" = "desc"
) {
  return (a: T, b: T) => {
    const aValue = a[key];
    const bValue = b[key];

    // Guard for missing fields or invalid timestamps
    if (!aValue || !bValue) return 0;

    const aDate = new Date(aValue as any).getTime();
    const bDate = new Date(bValue as any).getTime();

    if (isNaN(aDate) || isNaN(bDate)) return 0;

    return order === "asc" ? aDate - bDate : bDate - aDate;
  };
}

/**
 * Converts a verified flag into a normalized string status.
 */
export type VerificationStatus = "unverified" | "verified" | "rejected";
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
