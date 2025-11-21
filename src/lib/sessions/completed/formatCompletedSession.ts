import { differenceInMinutes, format, parseISO } from "date-fns";
import { extractTutorStudentInfo, computeMode } from "../sessionFormatters";
import { SessionWithUsers } from "../types";

export function formatCompletedSession(s: SessionWithUsers) {
  const start = s.start_time ? parseISO(s.start_time) : null;
  const end = s.completed_at ? parseISO(s.completed_at) : null;
  const actualDuration = start && end ? differenceInMinutes(end, start) : null;

  const info = extractTutorStudentInfo(s);

  const mode = computeMode(s.is_online);

  return {
    id: s.id,
    ...info,
    ...mode,

    date: format(parseISO(s.completed_at ?? ""), "EEE, MMM d"),
    start_time: format(parseISO(s.start_time ?? ""), "p"),
    completed_at: s.completed_at,
    completed_at_time: format(parseISO(s.completed_at ?? ""), "p"),

    subject: s.subjects.label,
    verified: s.verified,
    rejection_reason: s.rejection_reason ?? "",

    expected_duration: s.duration_minutes,
    actual_duration: actualDuration,
  };
}
