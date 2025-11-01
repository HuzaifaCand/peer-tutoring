// --base types -- these wont ever change could even put them in constants if i wanted

import { Database } from "./databasetypes";

export type StudentRow = Database["public"]["Tables"]["students"]["Row"];
export type TutorRow = Database["public"]["Tables"]["tutors"]["Row"];
export type SessionRow = Database["public"]["Tables"]["sessions"]["Row"];
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type SlotsRow = Database["public"]["Tables"]["available_slots"]["Row"];
export type SubjectHealthView =
  Database["public"]["Views"]["subject_health"]["Row"];

// formed types, full comemnting needed to know where they are going as i dont want to keep them in the same file but i probably should idk

export type StudentUser = StudentRow & {
  users: Pick<UserRow, "full_name" | "email">; // student table on admins/student
};

export type TutorUser = TutorRow & {
  users: Pick<UserRow, "full_name" | "email">; // student table on admins/tutor
  avaialble_slots: SlotsRow[];
};

export type SessionWithUsers = SessionRow & {
  tutors: {
    users: Pick<UserRow, "full_name" | "email">;
  };
  students: {
    users: Pick<UserRow, "full_name" | "email">;
  };
};
