import { fetchSessions } from "../fetchSessions";
import { formatCompletedSession } from "./formatCompletedSession";

export async function getCompletedSessions() {
  const completed_sessions = await fetchSessions("completed");

  return completed_sessions.map(formatCompletedSession);
}

export type ComputedCompletedSessionRow = Awaited<
  ReturnType<typeof getCompletedSessions>
>[number];
