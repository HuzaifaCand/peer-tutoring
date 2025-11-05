import { fetchSessions } from "../fetchSessions";
import { formatCancelledSession } from "./formatCancelledSession";

export async function getCancelledSessions() {
  const cancelled_sessions = await fetchSessions({
    status: "cancelled",
    extendSelect: `
      cancel_reason,
      cancelled_at,
      cancellation_source,
      cancelled_by,
      scheduled_for
    `,
  });

  return cancelled_sessions.map(formatCancelledSession);
}

export type ComputedCancelledSessionRow = Awaited<
  ReturnType<typeof getCancelledSessions>
>[number];
