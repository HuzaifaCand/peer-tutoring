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

  const normalizedTutors = (tutors ?? []).map((t) => ({
    ...t,
    subjects: Array.isArray(t.subjects) ? (t.subjects as string[]) : [], // defensive fallback
  }));

  const formatted = normalizedTutors.map(formatTutor);
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

  const normalizedTutor = {
    ...tutor,
    subjects: Array.isArray(tutor.subjects) ? (tutor.subjects as string[]) : [],
  };

  return formatTutor(normalizedTutor);
}
