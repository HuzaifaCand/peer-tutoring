import { format, parseISO } from "date-fns";
import { extractTutorStudentInfo, computeMode } from "../sessionFormatters";
import { SessionWithUsers } from "../types";
import { formatted } from "@/components/users/sessions/scheduled/ScheduledSessionCard";

export function formatCompletedSession(s: SessionWithUsers) {
  const info = extractTutorStudentInfo(s);

  const mode = computeMode(s.is_online);

  return {
    id: s.id,
    ...info,
    ...mode,

    scheduledFor: formatted(s.scheduled_for),

    start_time: format(parseISO(s.start_time ?? ""), "p"),
    completed_at: s.completed_at,
    completed_at_time: format(parseISO(s.completed_at ?? ""), "p"),

    subject: s.subjects.label,
    verified: s.verified,
    rejection_reason: s.rejection_reason ?? "",

    expected_duration: s.duration_minutes,
    actual_duration: s.actual_duration,
    studentFeedback: s.student_session_feedback?.message || null,
    tutorFeedback: s.tutor_session_feedback.message,
    studentAttendance: s.tutor_session_feedback.student_attendance,
  };
}
