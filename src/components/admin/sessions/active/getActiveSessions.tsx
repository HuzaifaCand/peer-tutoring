import { supabase } from "@/lib/supabase/client";
import { SessionWithUsers } from "@/lib/computedtypes";

import { parseISO, format } from "date-fns";

export async function getActiveSessions() {
  const { data: active_sessions, error } = await supabase
    .from("sessions")
    .select(
      "tutors(users(full_name, email)), students(users(full_name, email)), subject, start_time, duration_minutes, is_online"
    )
    .eq("status", "in_progress")
    .overrideTypes<SessionWithUsers[]>();

  if (error) throw error;

  const formatted = (active_sessions || []).map((s) => ({
    tutor_id: s.tutors.users.email.split("@")[0],
    tutor_name: s.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
    student_id: s.students.users.email.split("@")[0],
    student_name: s.students.users.full_name.split(" ").slice(0, -1).join(" "),
    start_time: format(parseISO(s.start_time ?? ""), "p"),
    start_time_iso: s.start_time,
    duration_minutes: s.duration_minutes,
    subject: s.subject,
    is_online: s.is_online,
    mode: s.is_online === true ? "Online" : "Onsite",
  }));
  return formatted;
}

export type ComputedActiveSessionRow = Awaited<
  ReturnType<typeof getActiveSessions>
>[number];
