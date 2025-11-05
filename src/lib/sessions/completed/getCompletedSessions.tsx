import { fetchSessions } from "../fetchSessions";
import { formatCompletedSession } from "./formatCompletedSession";

export async function getCompletedSessions() {
  const completed_sessions = await fetchSessions({
    status: "completed",
    extendSelect: `
      scheduled_for,
      verified,
      rejection_reason,
      start_time,
      completed_at,
      duration_minutes
    `,
  });

  return completed_sessions.map(formatCompletedSession);
}

export type ComputedCompletedSessionRow = Awaited<
  ReturnType<typeof getCompletedSessions>
>[number];
