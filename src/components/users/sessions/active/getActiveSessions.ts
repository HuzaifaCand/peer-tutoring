import { supabase } from "@/lib/supabase/client";

export async function getActiveSessions(
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
      scheduled_for,
      start_time,
      duration_minutes,
      is_online,
      meeting_link,
      subjects:subjects(label)
    `
    )
    .eq(idCol, uid)
    .eq("status", "in_progress")
    .order("start_time", { ascending: false })
    .overrideTypes<ActiveSessionRow[]>();

  if (error) {
    console.error("active sessions error", error);
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
      startTime: s.start_time,

      isOnline: s.is_online,
      meetingLink: s.meeting_link,

      duration: s.duration_minutes, // expected duration
    };
  });

  return formatted ?? [];
}

// Types
type ActiveSessionRow = {
  id: string;
  tutors: { users: { full_name: string } };
  students: { users: { full_name: string } };
  subject_id: string;
  scheduled_for: string;
  start_time: string | null;
  duration_minutes: number;
  is_online: boolean;
  meeting_link: string | null;
  subjects: { label: string };
};

export type ActiveSessionType = Awaited<
  ReturnType<typeof getActiveSessions>
>[number];
