import { supabase } from "@/lib/supabase/client";
import { StudentRow, SubjectRow, UserRow } from "@/lib/computedtypes";
import { formatStudent } from "./userFormatters";
import { fullStudentSelect } from "./userSelects";

type StudentUser = StudentRow & {
  users: Pick<UserRow, "full_name" | "email">;
  student_subjects: {
    subjects: SubjectRow;
  }[];
};

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select(fullStudentSelect)
    .overrideTypes<StudentUser[]>();

  if (error) {
    console.error("getStudents()", error);
    throw new Error(`Failed to fetch students: ${error.message}`);
  }

  return (data ?? []).map(formatStudent);
}
export type ComputedStudentRow = Awaited<
  ReturnType<typeof getStudents>
>[number];

export async function getStudentById(id: string) {
  const { data, error } = await supabase
    .from("students")
    .select(fullStudentSelect)
    .eq("id", id)
    .single()
    .overrideTypes<StudentUser>();

  if (error) {
    console.error(`getStudentById(${id})`, error);
    throw new Error(`Failed to fetch student ${id}: ${error.message}`);
  }

  return formatStudent(data);
}
