import { SubjectHealthView } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";

export type SubjectHealthStatus = "healthy" | "oversupply" | "low-supply";

export function computeHealth(
  tutors: number | null,
  students: number | null
): SubjectHealthStatus {
  if (students === null || tutors === null) return "healthy";
  if (students === 0 && tutors === 0) return "healthy";
  const ratio = tutors / students;

  if (ratio >= 0.5 && ratio <= 1.25) return "healthy";
  if (ratio > 1.25) return "oversupply";
  return "low-supply";
}

export async function getSubjectsHealth() {
  const { data: subjects, error } = await supabase
    .from("subject_health")
    .select("*")
    .overrideTypes<SubjectHealthView[]>();

  if (error) {
    console.error("Error fetching subjects health view:", error);
    throw error;
  }
  const formatted = (subjects || []).map((s) => ({
    subject: s.subject,
    tutors: s.tutor_count,
    students: s.student_count,
    health: computeHealth(s.tutor_count, s.student_count),
  }));

  return formatted;
}

export type ComputedSubjectHealthView = Awaited<
  ReturnType<typeof getSubjectsHealth>
>[number];
