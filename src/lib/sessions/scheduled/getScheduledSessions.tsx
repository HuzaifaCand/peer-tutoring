import { fetchSessions } from "../fetchSessions";
import { formatScheduledSession } from "./formatScheduledSession";

export async function getScheduledSessions() {
  const sessions = await fetchSessions("scheduled");

  return sessions.map(formatScheduledSession);
}

export type ComputedScheduledSessionRow = Awaited<
  ReturnType<typeof getScheduledSessions>
>[number];
