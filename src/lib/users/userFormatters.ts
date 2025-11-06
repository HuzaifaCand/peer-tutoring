import { StudentUser, TutorUser } from "../computedtypes";

export function extractUserInfo(user: { full_name: string; email: string }) {
  return {
    s_id: user.email.split("@")[0],
    full_name: user.full_name.split(" ").slice(0, -1).join(" "),
    email: user.email,
  };
}

export function formatTutor(t: TutorUser) {
  const userInfo = extractUserInfo(t.users);

  return {
    ...userInfo,
    id: t.id,
    grade: t.grade,
    subjects: t.subjects.join(" | "),
    verified: t.approved,
    available_slots: t.available_slots?.filter((s) => s.available).length ?? 0,
    unavailable_slots:
      t.available_slots?.filter((s) => !s.available).length ?? 0,
    admin_seen: t.admin_seen,
    created_at: t.created_at,
  };
}

export function formatStudent(s: StudentUser) {
  const userInfo = extractUserInfo(s.users);

  return {
    ...userInfo,
    id: s.id,
    grade: s.grade,
    subjects: s.subjects.join(" | "),
    admin_seen: s.admin_seen,
    created_at: s.created_at,
  };
}
