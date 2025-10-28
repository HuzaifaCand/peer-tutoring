// --base types -- wont ever change

import { Database } from "../database.types";

export type StudentRow = Database["public"]["Tables"]["students"]["Row"];
export type TutorRow = Database["public"]["Tables"]["tutors"]["Row"];
export type SessionRow = Database["public"]["Tables"]["tutors"]["Row"];
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
