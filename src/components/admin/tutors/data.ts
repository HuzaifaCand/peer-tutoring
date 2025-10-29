import { supabase } from "@/lib/supabase/client";
import { StudentUser } from "@/lib/types/views";

export async function getTutors() {
  const { data: students, error } = await supabase
    .from("tutors")
    .select("grade, subjects, users(full_name, email)")
    .overrideTypes<StudentUser[]>();

  if (error) {
    console.error("Error fetching students:", error);
    throw error;
  }

  const formatted = (students || []).map((s) => ({
    id: s.users.email.split("@")[0],
    full_name: s.users.full_name,
    email: s.users.email,
    grade: s.grade ?? "—",
    subjects: s.subjects.join(" | ") || [],
  }));
  return formatted;
}
