export const baseUserSelect = "id, grade, users(full_name, email), created_at";

export const extendedStudentSelect =
  "student_subjects(subjects(id, label, code, grade))";

export const extendedTutorSelect =
  "approved, available_slots(id, available), tutor_subjects(subjects(id, label, code, grade))";

export const fullTutorSelect = `${baseUserSelect}, ${extendedTutorSelect}`;
export const fullStudentSelect = `${baseUserSelect}, ${extendedStudentSelect}`;
