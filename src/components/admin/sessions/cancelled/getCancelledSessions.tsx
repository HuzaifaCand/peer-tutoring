import { supabase } from "@/lib/supabase/client";
import { SessionWithUsers } from "@/lib/computedtypes";
import { format, parseISO } from "date-fns";

export async function getCancelledSessions() {
  const { data: cancelled_sessions, error } = await supabase
    .from("sessions")
    .select(
      "id, tutors(id, grade, users(full_name, email)), students(id, grade, users(full_name, email)), subject, scheduled_for, cancel_reason, cancelled_at, cancellation_source, cancelled_by, is_online"
    )
    .eq("status", "cancelled")
    .overrideTypes<SessionWithUsers[]>();

  if (error) {
    console.error("Error fetching cancelled sessions:", error);
    throw error;
  }

  const formatted = (cancelled_sessions || []).map((s) => ({
    id: s.id,
    tutor_id: s.tutors.users.email.split("@")[0],
    tutor_name: s.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
    tutor_grade: s.tutors.grade,
    student_id: s.students.users.email.split("@")[0],
    student_name: s.students.users.full_name.split(" ").slice(0, -1).join(" "),
    student_grade: s.students.grade,
    is_online: s.is_online,
    mode: s.is_online === true ? "Online" : "Onsite",
    cancel_reason: s.cancel_reason,
    cancelled_at: s.cancelled_at,
    formatted_cancelled_at: format(
      parseISO(s.cancelled_at ?? s.scheduled_for),
      "dd/LL/yy, p"
    ),

    cancellation_source: s.cancellation_source,
    scheduled_for: format(parseISO(s.scheduled_for), "dd/LL/yy, p"),
    cancelled_by:
      s.cancelled_by === s.tutors.id
        ? "Tutor"
        : s.cancelled_by === s.students.id
        ? "Student"
        : s.cancelled_by === null
        ? "System"
        : "Admin",
    subject: s.subject,
  }));
  return formatted;
}

export type ComputedCancelledSessionRow = Awaited<
  ReturnType<typeof getCancelledSessions>
>[number];
