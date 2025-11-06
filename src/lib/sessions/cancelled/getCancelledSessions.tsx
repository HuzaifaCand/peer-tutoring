import { fetchSessions } from "../fetchSessions";
import { formatCancelledSession } from "./formatCancelledSession";

export async function getCancelledSessions() {
  const cancelled_sessions = await fetchSessions("cancelled");

  return cancelled_sessions.map(formatCancelledSession);
}

export type ComputedCancelledSessionRow = Awaited<
  ReturnType<typeof getCancelledSessions>
>[number];
