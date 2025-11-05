import { fetchSessions } from "../fetchSessions";
import { formatScheduledSession } from "./formatScheduledSession";

export async function getScheduledSessions() {
  const sessions = await fetchSessions({
    status: "scheduled",
    extendSelect: `
      duration_minutes,
      scheduled_for,
      booked_at
    `,
  });

  return sessions.map(formatScheduledSession);
}

export type ComputedScheduledSessionRow = Awaited<
  ReturnType<typeof getScheduledSessions>
>[number];
