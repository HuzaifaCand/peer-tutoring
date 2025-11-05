import { fetchSessions } from "../fetchSessions";
import { formatActiveSession } from "./formatActiveSession";

export async function getActiveSessions() {
  const active_sessions = await fetchSessions({
    status: "in_progress",
    extendSelect: `
      start_time,
      duration_minutes
    `,
  });

  return active_sessions.map(formatActiveSession);
}

export type ComputedActiveSession = Awaited<
  ReturnType<typeof getActiveSessions>
>[number];
