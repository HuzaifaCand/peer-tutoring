import { SessionWithUsers } from "@/lib/sessions/types";
import { supabase } from "@/lib/supabase/client";

export async function getCompletedSessions(
  uid: string,
  role: "tutor" | "student"
) {
  const idCol = role === "tutor" ? "tutor_id" : "student_id";

  const { data, error } = await supabase
    .from("sessions")
    .select(
      `
      tutors:tutors(users(full_name)),
      students:students(users(full_name)),
      subject_id,
      duration_minutes,
      completed_at,
      start_time,
      verified,
      verified_by,
      is_online,
      scheduled_for,
      subjects:subjects(label)
    `
    )
    .eq(idCol, uid)
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
    .overrideTypes<SessionWithUsers[]>();

  if (error) {
    console.error("completed sessions error", error);
    throw error;
  }

  const formatted = data?.map((s) => {
    const studentName =
      s.students.users.full_name.split(" ").slice(0, -1).join(" ") ||
      s.students.users.full_name;
    const tutorName =
      s.tutors.users.full_name.split(" ").slice(0, -1).join(" ") ||
      s.tutors.users.full_name;

    // compute REAL duration
    let actualDuration = null;
    if (s.start_time && s.completed_at) {
      const start = new Date(s.start_time).getTime();
      const end = new Date(s.completed_at).getTime();
      actualDuration = Math.round((end - start) / (1000 * 60)); // ms → minutes
    }

    return {
      sName: studentName,
      tName: tutorName,

      subject: s.subject_id,
      expectedDuration: s.duration_minutes,
      actualDuration,

      completedAt: s.completed_at,
      verificationStatus: s.verified
        ? "verified"
        : s.verified === false
        ? "rejected"
        : "unverified",
      isOnline: s.is_online,
      scheduledFor: s.scheduled_for,
      startTime: s.start_time,
      subjectLabel: s.subjects.label,
    };
  });

  return formatted ?? [];
}

export type CompletedSessionsType = Awaited<
  ReturnType<typeof getCompletedSessions>
>[number];
