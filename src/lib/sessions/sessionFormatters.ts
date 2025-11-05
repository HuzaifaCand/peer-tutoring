import { SessionWithUsers } from "@/lib/computedtypes";

export function extractTutorStudentInfo(s: SessionWithUsers) {
  const tutorEmail = s.tutors.users.email ?? "";
  const studentEmail = s.students.users.email ?? "";

  return {
    tutor_id: tutorEmail.split("@")[0],
    tutor_name: s.tutors.users.full_name.split(" ").slice(0, -1).join(" "),
    tutor_grade: s.tutors.grade,
    student_id: studentEmail.split("@")[0],
    student_name: s.students.users.full_name.split(" ").slice(0, -1).join(" "),
    student_grade: s.students.grade,
  };
}

export function computeMode(is_online: boolean) {
  return {
    is_online,
    mode: is_online ? "Online" : "Onsite",
  };
}
