import { StudentRow, TutorRow, UserRow } from "./types/base";

// formed types, full comemnting needed to know where they are going as i dont want to keep them in the same file but i probably should idk

export type StudentUser = StudentRow & {
  users: Pick<UserRow, "full_name" | "email">; // student table on admins/student
};

export const studentUserColumns = [
  { key: "id", label: "ID", width: 80 },
  { key: "full_name", label: "Name", width: 150, truncate: true },
  { key: "email", label: "Email", width: 200, truncate: true },
  { key: "grade", label: "Grade", width: 80 },
  { key: "subjects", label: "Subjects", width: 150 },
];

export type TutorUser = TutorRow & {
  users: Pick<UserRow, "full_name" | "email">; // student table on admins/student
};

export const tutorUserColumns = [
  { key: "id", label: "ID", width: 80 },
  { key: "full_name", label: "Name", width: 150, truncate: true },
  { key: "email", label: "Email", width: 200, truncate: true },
  { key: "grade", label: "Grade", width: 80 },
  { key: "subjects", label: "Subjects", width: 150 },
];
