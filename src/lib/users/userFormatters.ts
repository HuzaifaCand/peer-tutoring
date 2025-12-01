import { StudentUser, TutorUser } from "./types";

export function extractUserInfo(user: { full_name: string; email: string }) {
  return {
    studentId: user.email.split("@")[0],
    name: user.full_name.split(" ").slice(0, -1).join(" "),
    email: user.email,
  };
}

export function formatTutor(t: TutorUser) {
  const userInfo = extractUserInfo(t.users);

  const subjects =
    t.tutor_subjects?.map((ts) => ts.subjects?.label).filter(Boolean) ?? [];

  return {
    ...userInfo,
    id: t.id,
    grade: t.grade,
    subjectsList: subjects.join(" | "),
    subjects: t.tutor_subjects,
    verified: t.approved,
    slots: t.available_slots,
    available_slots: t.available_slots?.filter((s) => s.available).length ?? 0,
    unavailable_slots:
      t.available_slots?.filter((s) => !s.available).length ?? 0,
    created_at: t.created_at,
    availableOnline: t.available_online,
    about: t.about,
  };
}

export function formatStudent(s: StudentUser) {
  const userInfo = extractUserInfo(s.users);

  const subjects =
    s.student_subjects?.map((ss) => ss.subjects?.label).filter(Boolean) ?? [];

  return {
    ...userInfo,
    id: s.id,
    grade: s.grade,
    subjects: s.student_subjects,
    subjectsList: subjects.join(" | "),
    created_at: s.created_at,
    about: s.about,
  };
}
