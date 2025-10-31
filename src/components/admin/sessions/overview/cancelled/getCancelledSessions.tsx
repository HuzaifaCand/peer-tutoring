import { supabase } from "@/lib/supabase/client";
import { CancelledSession } from "@/lib/computedtypes";
import { format, parseISO } from "date-fns";

export async function getCancelledSessions() {
  const { data: cancelled_sessions, error } = await supabase
    .from("sessions")
    .select(
      "tutors(users(full_name, email)), students(users(full_name, email)), subject, scheduled_for, cancel_reason"
    )
    .eq("status", "cancelled")
    .overrideTypes<CancelledSession[]>();

  if (error) {
    console.error("Error fetching cancelled sessions:", error);
    throw error;
  }

  const formatted = (cancelled_sessions || []).map((s) => ({
    tutor_id: s.tutors.users.email.split("@")[0],
    tutor_name: s.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
    student_id: s.students.users.email.split("@")[0],
    student_name: s.students.users.full_name.split(" ").slice(0, -1).join(" "),
    cancel_reason: s.cancel_reason,
    scheduled_when: format(parseISO(s.scheduled_for), "EEE, MMM d, p"),
    subject: s.subject,
  }));
  return formatted;
}

export type ComputedCancelledSessionRow = Awaited<
  ReturnType<typeof getCancelledSessions>
>[number];
