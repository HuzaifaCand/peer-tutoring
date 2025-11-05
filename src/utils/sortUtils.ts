/**
 * Generic timestamp sorter that safely handles null/undefined timestamps.
 *
 * @param key   - field name containing a timestamp (string or Date)
 * @param order - "asc" for earliest first, "desc" for latest first
 *
 * Works with nullable fields and won't throw for missing timestamps.
 */
export function sortByTimestamp<
  T extends Record<string, unknown>,
  K extends keyof T
>(key: K, order: "asc" | "desc" = "desc") {
  return (a: T, b: T) => {
    const aValue = a[key];
    const bValue = b[key];

    // Handle null or undefined safely
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1; // nulls go last
    if (bValue == null) return -1;

    const aDate =
      aValue instanceof Date
        ? aValue.getTime()
        : new Date(aValue as string).getTime();
    const bDate =
      bValue instanceof Date
        ? bValue.getTime()
        : new Date(bValue as string).getTime();

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
