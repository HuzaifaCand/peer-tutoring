import { computeMode, extractTutorStudentInfo } from "../sessionFormatters";
import { format, parseISO } from "date-fns";
import { SessionWithUsers } from "../types";

export function formatActiveSession(s: SessionWithUsers) {
  const info = extractTutorStudentInfo(s);

  const mode = computeMode(s.is_online);

  return {
    id: s.id,
    ...info,
    ...mode,
    subject: s.subjects.label,
    subject_id: s.subjects.id,
    start_time: format(parseISO(s.start_time ?? ""), "p"),
    start_time_iso: s.start_time,
    duration_minutes: s.duration_minutes,

    cta: "View Details",
  };
}
