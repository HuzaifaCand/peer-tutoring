import { supabase } from "@/lib/supabase/client";
import { TutorUser } from "@/lib/computedtypes";
import { formatTutor } from "./userFormatters";
import { fullTutorSelect } from "./userSelects";

export async function getTutors() {
  const { data: tutors, error } = await supabase
    .from("tutors")
    .select(fullTutorSelect)
    .overrideTypes<TutorUser[]>();

  if (error) {
    console.error("Error fetching tutors:", error);
    throw error;
  }

  const formatted = tutors.map(formatTutor);
  return formatted;
}

export type ComputedTutorRow = Awaited<ReturnType<typeof getTutors>>[number];

export async function getTutorById(id: string) {
  const { data: tutor, error } = await supabase
    .from("tutors")
    .select(fullTutorSelect)
    .eq("id", id)
    .single()
    .overrideTypes<TutorUser>();

  if (error) {
    console.error("Failed to fetch tutor with id:", id);
    throw error;
  }

  return formatTutor(tutor);
}
