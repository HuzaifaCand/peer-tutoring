import { StudentRow, TutorRow, UserRow, SlotsRow } from "./base";

// formed types, full comemnting needed to know where they are going as i dont want to keep them in the same file but i probably should idk

export type StudentUser = StudentRow & {
  users: Pick<UserRow, "full_name" | "email">; // student table on admins/student
};

export type TutorUser = TutorRow & {
  users: Pick<UserRow, "full_name" | "email">; // student table on admins/student
  avaialble_slots: SlotsRow[];
};
