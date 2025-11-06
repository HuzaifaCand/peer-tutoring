import { fetchSessions } from "../fetchSessions";
import { formatActiveSession } from "./formatActiveSession";

export async function getActiveSessions() {
  const active_sessions = await fetchSessions("in_progress");

  return active_sessions.map(formatActiveSession);
}

export type ComputedActiveSession = Awaited<
  ReturnType<typeof getActiveSessions>
>[number];
