import { supabase } from "@/lib/supabase/client";
import { SessionWithUsers } from "@/lib/computedtypes";
import { differenceInMinutes, format, parseISO } from "date-fns";

export async function getCompletedSessions() {
  const { data: completed_sessions, error } = await supabase
    .from("sessions")
    .select(
      `
      id,
      tutors(grade, users(full_name, email)),
      students(grade, users(full_name, email)),
      subject,
      scheduled_for,
      verified,
      rejection_reason,
      is_online,
      start_time,
      completed_at,
      duration_minutes
      `
    )
    .eq("status", "completed")
    .overrideTypes<SessionWithUsers[]>();

  if (error) {
    console.error("Error fetching completed sessions:", error);
    throw error;
  }

  const formatted =
    completed_sessions?.map((s) => {
      const start = s.start_time ? parseISO(s.start_time) : null;
      const end = s.completed_at ? parseISO(s.completed_at) : null;
      const actualDuration =
        start && end ? differenceInMinutes(end, start) : null;

      return {
        id: s.id,
        tutor_id: s.tutors.users.email.split("@")[0],
        tutor_name: s.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
        tutor_grade: s.tutors.grade,
        student_id: s.students.users.email.split("@")[0],
        student_name: s.students.users.full_name
          .split(" ")
          .slice(0, -1)
          .join(" "),
        student_grade: s.students.grade,

        date: format(parseISO(s.completed_at ?? ""), "EEE, MMM d"),
        start_time: format(parseISO(s.start_time ?? ""), "p"),

        completed_at: s.completed_at,
        completed_at_time: format(parseISO(s.completed_at ?? ""), "p"),
        subject: s.subject,
        verified: s.verified,
        rejection_reason: s.rejection_reason ?? "",
        is_online: s.is_online,
        mode: s.is_online === true ? "Online" : "Onsite",
        expected_duration: s.duration_minutes,
        actual_duration: actualDuration,
      };
    }) ?? [];

  return formatted;
}

export type ComputedCompletedSessionRow = Awaited<
  ReturnType<typeof getCompletedSessions>
>[number];
