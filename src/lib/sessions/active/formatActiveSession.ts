import { SessionWithUsers } from "@/lib/computedtypes";
import { computeMode, extractTutorStudentInfo } from "../sessionFormatters";
import { format, parseISO } from "date-fns";

export function formatActiveSession(s: SessionWithUsers) {
  const info = extractTutorStudentInfo(s);

  const mode = computeMode(s.is_online);

  return {
    id: s.id,
    ...info,
    ...mode,
    subject: s.subject,
    start_time: format(parseISO(s.start_time ?? ""), "p"),
    start_time_iso: s.start_time,
    duration_minutes: s.duration_minutes,

    cta: "View Details",
  };
}
