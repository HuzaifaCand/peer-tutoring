import { format, parseISO } from "date-fns";
import { SessionWithUsers } from "@/lib/computedtypes";
import { extractTutorStudentInfo, computeMode } from "../sessionFormatters";

export function formatScheduledSession(s: SessionWithUsers) {
  const info = extractTutorStudentInfo(s);
  const mode = computeMode(s.is_online);
  const date = parseISO(s.scheduled_for);

  return {
    ...info,
    ...mode,
    id: s.id,
    subject: s.subject,
    duration_minutes: s.duration_minutes,
    booked_at: s.booked_at,
    scheduled_for_iso: s.scheduled_for,
    scheduled_for: format(date, "EEE, MMM d, p"),
  };
}
