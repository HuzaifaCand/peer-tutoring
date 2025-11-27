import { supabase } from "@/lib/supabase/client";

export async function getScheduledSessions(
  uid: string,
  role: "tutor" | "student"
) {
  const idCol = role === "tutor" ? "tutor_id" : "student_id";

  const { data, error } = await supabase
    .from("sessions")
    .select(
      `
      id,
      tutors:tutors(users(full_name)),
      students:students(users(full_name)),
      subject_id,
      duration_minutes,
      scheduled_for,
      is_online,
      message,
      subjects:subjects(label)
    `
    )
    .eq(idCol, uid)
    .eq("status", "scheduled")
    .order("scheduled_for", { ascending: true })
    .overrideTypes<ScheduledSessionRow[]>();

  if (error) {
    console.error("scheduled sessions error", error);
    throw error;
  }

  const formatted = data?.map((s) => {
    const studentName = s.students.users.full_name
      .split(" ")
      .slice(0, -1)
      .join(" ");

    const tutorName = s.tutors.users.full_name
      .split(" ")
      .slice(0, -1)
      .join(" ");

    return {
      id: s.id,
      sName: studentName,
      tName: tutorName,

      subject: s.subject_id,
      subjectLabel: s.subjects.label,

      scheduledFor: s.scheduled_for,
      isOnline: s.is_online,
      duration: s.duration_minutes,

      message: s.message ?? null,
    };
  });

  return formatted ?? [];
}

// Types
type ScheduledSessionRow = {
  id: string;
  tutors: { users: { full_name: string } };
  students: { users: { full_name: string } };
  subject_id: string;
  duration_minutes: number;
  scheduled_for: string;
  is_online: boolean;
  message: string | null;
  subjects: { label: string };
};

export type ScheduledSessionsType = Awaited<
  ReturnType<typeof getScheduledSessions>
>[number];
