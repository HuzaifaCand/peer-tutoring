import { SubjectTutor } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";

export async function getSubjectTutors(subject_id: string) {
  const { data, error } = await supabase
    .from("tutor_subjects")
    .select(
      "tutors(grade, about, users(full_name), approved, available_online, available_slots(*)), tutor_id, credentials"
    )
    .eq("subject_id", subject_id)
    .overrideTypes<SubjectTutor[]>();

  if (error) console.error("Subject Tutors error", error);

  const tutors = data?.map((t) => ({
    name: t.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
    id: t.tutor_id,
    grade: t.tutors.grade,
    subject_credentials: t.credentials,
    about: t.tutors.about,
    verified: t.tutors.approved,
    total_slots: t.tutors.available_slots.length,
    available_slots:
      t.tutors.available_slots?.filter((s) => s.available).length ?? 0,
    available_online: t.tutors.available_online,
  }));

  return tutors ?? [];
}

export type SubjectTutorType = Awaited<
  ReturnType<typeof getSubjectTutors>
>[number];
