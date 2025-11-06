export const baseUserSelect =
  "id, grade, subjects, admin_seen, users(full_name, email), created_at";

export const extendedStudentSelect = "";

export const extendedTutorSelect = "approved, available_slots(id, available)";

export const fullTutorSelect = `${baseUserSelect}, ${extendedTutorSelect}`;
export const fullStudentSelect = `${baseUserSelect}`;
