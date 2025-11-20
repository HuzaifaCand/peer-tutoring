import { StudentSubject, SubjectRow, TutorSubject } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";

export type StudentSubjects = StudentSubject & {
  subjects: SubjectRow;
};

export type TutorSubjects = TutorSubject & {
  subjects: SubjectRow;
};

export async function getStudentSubjects(uid: string) {
  const { data, error } = await supabase
    .from("student_subjects")
    .select("*, subjects(*)")
    .eq("student_id", uid)
    .overrideTypes<StudentSubjects[]>();

  if (error) console.error("Error fetching student subjects", error);

  const studentSubjects = data?.map((s: StudentSubjects) => ({
    subject_id: s.subject_id,
    note: s.note,
    label: s.subjects.label,
    name: s.subjects.name,
    code: s.subjects.code,
    color: s.subjects.color,
    grade: s.subjects.grade,
  }));

  return studentSubjects ?? [];
}

export type ComputedStudentSubject = Awaited<
  ReturnType<typeof getStudentSubjects>
>[number];

export async function getTutorSubjects(uid: string) {
  const { data, error } = await supabase
    .from("tutor_subjects")
    .select("*, subjects(*)")
    .eq("tutor_id", uid)
    .overrideTypes<TutorSubjects[]>();

  if (error) console.error("Error fetching tutor subjects", error);

  const tutorSubjects = data?.map((s: TutorSubjects) => ({
    subject_id: s.subject_id,
    note: s.credentials,
    label: s.subjects.label,
    name: s.subjects.name,
    code: s.subjects.code,
    color: s.subjects.color,
    grade: s.subjects.grade,
  }));

  return tutorSubjects ?? [];
}

export type ComputedTutorSubject = Awaited<
  ReturnType<typeof getTutorSubjects>
>[number];
