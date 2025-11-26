import { SessionWithUsers } from "@/lib/sessions/types";
import { supabase } from "@/lib/supabase/client";

export async function getCancelledSessions(
  uid: string,
  role: "tutor" | "student"
) {
  const idCol = role === "tutor" ? "tutor_id" : "student_id";
  const { data, error } = await supabase
    .from("sessions")
    .select(
      `tutors:tutors(users(full_name)),
       students:students(users(full_name)), 
       subject_id, 
       cancel_reason, 
       cancellation_source, 
       cancelled_by, 
       is_online, 
       cancelled_at,
       scheduled_for`
    )
    .eq(idCol, uid)
    .eq("status", "cancelled")
    .overrideTypes<SessionWithUsers[]>();

  if (error) {
    console.error("cancelled sessions error", error);
    throw error;
  }

  const formatted = data?.map((cs) => ({
    sName: cs.students.users.full_name.split(" ").slice(0, -1).join(" "),
    tName: cs.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
    subject: cs.subject_id,
    why: cs.cancel_reason,
    who: cs.cancelled_by,
    when: cs.cancelled_at,
    isOnline: cs.is_online,
    source: cs.cancellation_source,
    scheduled_for: cs.scheduled_for,
  }));

  return formatted ?? [];
}

export type CancSessions = Awaited<
  ReturnType<typeof getCancelledSessions>
>[number];
