import { SubjectHealthView, SubjectRow } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";

export type SubjectWithUserCount = SubjectHealthView & {
  subjects: SubjectRow;
};

async function getSubjectUsers(role: "tutor" | "student", subject_id: string) {
  const countColumn = role === "tutor" ? "student_count" : "tutor_count";

  const { data: health, error: healthError } = await supabase
    .from("subject_health")
    .select(`${countColumn}, id`)
    .eq("id", subject_id)
    .single()
    .overrideTypes<SubjectHealthView>();

  if (healthError) {
    console.error("subject_health fetch error:", healthError);
    return null;
  }

  const { data: subjectInfo, error: subjectError } = await supabase
    .from("subjects")
    .select("name, color, code, grade")
    .eq("id", subject_id)
    .single()
    .overrideTypes<SubjectRow>();

  if (subjectError) {
    console.error("subjects fetch error:", subjectError);
    return null;
  }

  const { count: resourceCount, error: resourceError } = await supabase
    .from("resources")
    .select("*", { count: "exact", head: true })
    .eq("subject", subject_id);

  if (resourceError) {
    console.error(" resource count error: ", resourceError);
    return null;
  }
  const result: SubjectWithUserCount & { resource_count: number } = {
    ...health,
    subjects: subjectInfo,
    resource_count: resourceCount ?? 0,
  };

  return result;
}

export async function getUserSubjects(role: "tutor" | "student", uid: string) {
  const idColumn = role === "tutor" ? "tutor_id" : "student_id";
  const table = role === "tutor" ? "tutor_subjects" : "student_subjects";

  const { data: rows, error } = await supabase
    .from(table)
    .select(`subject_id, tutors!inner(approved)`)
    .eq(idColumn, uid);

  if (error) {
    console.error("subject ID fetch error:", error);
    return [];
  }

  const subjectIds = rows.map((r) => r.subject_id);
  if (subjectIds.length === 0) return [];

  const results = await Promise.all(
    subjectIds.map(async (subject_id) => {
      const subject = await getSubjectUsers(role, subject_id);
      if (!subject) return null;

      const countColumn = role === "tutor" ? "student_count" : "tutor_count";
      const count = subject[countColumn] ?? 0;

      return {
        subject_id,
        count,
        name: subject.subjects.name,
        color: subject.subjects.color,
        code: subject.subjects.code,
        grade: subject.subjects.grade,
        resource_count: subject.resource_count,
      };
    })
  );

  return results.filter(Boolean);
}

export type ComputedUserSubjectCard = Awaited<
  ReturnType<typeof getUserSubjects>
>[number];
