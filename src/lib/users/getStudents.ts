import { supabase } from "@/lib/supabase/client";
import { StudentUser } from "@/lib/computedtypes";
import { formatStudent } from "./userFormatters";
import { fullStudentSelect } from "./userSelects";

export async function getStudents() {
  const { data: students, error } = await supabase
    .from("students")
    .select(fullStudentSelect)
    .overrideTypes<StudentUser[]>();

  if (error) {
    console.error("Error fetching students:", error);
    throw error;
  }

  const normalizedStudents = (students ?? []).map((s) => ({
    ...s,
    subjects: Array.isArray(s.subjects) ? (s.subjects as string[]) : [], // defensive fallback
  }));

  const formatted = normalizedStudents.map(formatStudent);
  return formatted;
}
export type ComputedStudentRow = Awaited<
  ReturnType<typeof getStudents>
>[number];

export async function getStudentById(id: string): Promise<ComputedStudentRow> {
  const { data: student, error } = await supabase
    .from("students")
    .select(fullStudentSelect)
    .eq("id", id)
    .single()
    .overrideTypes<StudentUser>();

  if (error) {
    console.error("Failed to fetch student with id:", id);
    throw error;
  }

  const normalizedStudent = {
    ...student,
    subjects: Array.isArray(student.subjects)
      ? (student.subjects as string[])
      : [],
  };

  return formatStudent(normalizedStudent);
}
