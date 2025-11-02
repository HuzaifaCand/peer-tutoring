import { supabase } from "@/lib/supabase/client";
import { SessionWithUsers } from "@/lib/computedtypes";
import { format, parseISO, isAfter } from "date-fns";

export async function getScheduledSessions() {
  const { data: scheduled_sessions, error } = await supabase
    .from("sessions")
    .select(
      `
      tutors(users(full_name, email)),
      students(users(full_name, email)),
      subject,
      scheduled_for,
      rejection_reason,
      is_online,
      duration_minutes
    `
    )
    .eq("status", "scheduled")
    .overrideTypes<SessionWithUsers[]>();

  if (error) {
    console.error("Error fetching scheduled sessions:", error);
    throw error;
  }

  const formatted =
    scheduled_sessions
      ?.map((s) => {
        const parsedDate = parseISO(s.scheduled_for);

        return {
          tutor_id: s.tutors.users.email.split("@")[0],
          tutor_name: s.tutors.users.full_name
            .split(" ")
            .slice(0, -1)
            .join(" "),
          student_id: s.students.users.email.split("@")[0],
          student_name: s.students.users.full_name
            .split(" ")
            .slice(0, -1)
            .join(" "),
          scheduled_for: format(parsedDate, "EEE, MMM d, p"), // display version
          pure_scheduled_for: parsedDate, // raw for sorting
          subject: s.subject,
          is_online: s.is_online,
          mode: s.is_online ? "Online" : "Onsite",
          expected_duration: s.duration_minutes,
        };
      })
      // sort by soonest
      .sort(
        (a, b) =>
          a.pure_scheduled_for.getTime() - b.pure_scheduled_for.getTime()
      ) ?? [];

  return formatted;
}

export type ComputedScheduledSessionRow = Awaited<
  ReturnType<typeof getScheduledSessions>
>[number];
