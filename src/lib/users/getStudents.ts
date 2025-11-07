import { supabase } from "@/lib/supabase/client";
import { StudentUser } from "@/lib/computedtypes";
import { formatStudent } from "./userFormatters";
import { fullStudentSelect } from "./userSelects";

export function logSupabaseError(context: string, error: any) {
  console.groupCollapsed(`[Supabase Error] ${context}`);
  console.error("Message:", error.message);
  if (error.details) console.error("Details:", error.details);
  if (error.hint) console.error("Hint:", error.hint);
  if (error.code) console.error("Code:", error.code);
  console.groupEnd();
}

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select(fullStudentSelect)
    .returns<StudentUser[]>();

  if (error) {
    logSupabaseError("getStudents()", error);
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
    .returns<StudentUser>();

  if (error) {
    logSupabaseError(`getStudentById(${id})`, error);
    throw new Error(`Failed to fetch student ${id}: ${error.message}`);
  }

  return formatStudent(data);
}
