export const baseUserSelect =
  "id, grade, users(full_name, email), created_at, about";

export const extendedStudentSelect = "student_subjects(*, subjects(*))";

export const extendedTutorSelect =
  "approved, available_slots(*), tutor_subjects(*, subjects(*)), available_online";

export const fullTutorSelect = `${baseUserSelect}, ${extendedTutorSelect}`;
export const fullStudentSelect = `${baseUserSelect}, ${extendedStudentSelect}`;
