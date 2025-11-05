import { format, parseISO } from "date-fns";
import { SessionWithUsers } from "@/lib/computedtypes";
import { extractTutorStudentInfo, computeMode } from "../sessionFormatters";

export function formatCancelledSession(s: SessionWithUsers) {
  const info = extractTutorStudentInfo(s);
  const mode = computeMode(s.is_online);

  const cancelledBy =
    s.cancelled_by === s.tutors.id
      ? "Tutor"
      : s.cancelled_by === s.students.id
      ? "Student"
      : s.cancelled_by === null
      ? "System"
      : "Admin";

  const cancelledAtISO = s.cancelled_at ?? s.scheduled_for;
  const formattedCancelledAt = cancelledAtISO
    ? format(parseISO(cancelledAtISO), "dd/LL/yy, p")
    : "Unknown";

  return {
    id: s.id,
    ...info,
    ...mode,
    subject: s.subject,

    cancel_reason: s.cancel_reason ?? "",
    cancellation_source: s.cancellation_source,
    cancelled_by: cancelledBy,

    cancelled_at: s.cancelled_at,
    formatted_cancelled_at: formattedCancelledAt,
    scheduled_for: s.scheduled_for
      ? format(parseISO(s.scheduled_for), "dd/LL/yy, p")
      : "",
  };
}
