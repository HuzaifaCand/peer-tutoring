import {
  SlotsRow,
  SubjectRow,
  TutorRow,
  TutorSubject,
  UserRow,
} from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";

export type SubjectTutor = TutorSubject & {
  subjects: SubjectRow;
  tutors: TutorRow & {
    users: Pick<UserRow, "full_name">;
    available_slots: SlotsRow[];
  };
};

const formatSubjectTutor = (t: SubjectTutor) => {
  return {
    name: t.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
    id: t.tutor_id,
    grade: t.tutors.grade,
    subject_credentials: t.credentials,
    about: t.tutors.about,
    verified: t.tutors.approved,
    slots: t.tutors.available_slots,
    total_slots: t.tutors.available_slots.length,
    available_slots:
      t.tutors.available_slots?.filter((s) => s.available).length ?? 0,
    available_online: t.tutors.available_online,
    subject: t.subjects,
  };
};

const select = `subjects(*),
      tutor_id,
      credentials,
      tutors!inner(
      grade,
      about,
      users(full_name),
      approved,
      available_online,
      available_slots(*))`;

export async function getSubjectTutors(subject_id: string) {
  const { data, error } = await supabase
    .from("tutor_subjects")
    .select(select)
    .eq("subject_id", subject_id)
    .or("tutors.approved.eq.true,tutors.approved.is.null")
    .overrideTypes<SubjectTutor[]>();

  if (error) console.error("Subject Tutors error", error);

  const tutors = data?.map((t) => formatSubjectTutor(t));

  return tutors ?? [];
}

export type SubjectTutorType = Awaited<
  ReturnType<typeof getSubjectTutors>
>[number];

export async function getSubjectTutor(tutor_id: string, subject_id: string) {
  const { data, error } = await supabase
    .from("tutor_subjects")
    .select(select)
    .eq("subject_id", subject_id)
    .eq("tutor_id", tutor_id)
    .or("tutors.approved.eq.true,tutors.approved.is.null")
    .single()
    .overrideTypes<SubjectTutor>();

  if (error) console.error("Subject Tutor error", error);

  if (!data) return null;
  return formatSubjectTutor(data);
}
