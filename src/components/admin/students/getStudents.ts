import { supabase } from "@/lib/supabase/client";
import { StudentUser } from "@/lib/types/views";

export async function getStudents() {
  const { data: students, error } = await supabase
    .from("students")
    .select("grade, subjects, admin_seen, users(full_name, email)")
    .overrideTypes<StudentUser[]>();

  if (error) {
    console.error("Error fetching students:", error);
    throw error;
  }

  const formatted = (students || []).map((s) => ({
    id: s.users.email.split("@")[0],
    full_name: s.users.full_name.split(" ").slice(0, -1).join(" "),
    email: s.users.email,
    grade: s.grade,
    subjects: s.subjects.join(" | ") || [],
    admin_seen: s.admin_seen,
  }));
  return formatted;
}

export type ComputedStudentRow = Awaited<
  ReturnType<typeof getStudents>
>[number];
