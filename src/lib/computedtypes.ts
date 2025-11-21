// --base types -- these wont ever change could even put them in constants if i wanted

import { Database } from "./supabase/databasetypes";

export type StudentRow = Database["public"]["Tables"]["students"]["Row"];
export type TutorRow = Database["public"]["Tables"]["tutors"]["Row"];
export type SessionRow = Database["public"]["Tables"]["sessions"]["Row"];
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type SlotsRow = Database["public"]["Tables"]["available_slots"]["Row"];

export type SubjectHealthView =
  Database["public"]["Views"]["subject_health"]["Row"];
export type SubjectPopularityView =
  Database["public"]["Views"]["subject_popularity"]["Row"];
export type SubjectRow = Database["public"]["Tables"]["subjects"]["Row"];

export type TutorSubject =
  Database["public"]["Tables"]["tutor_subjects"]["Row"];
export type StudentSubject =
  Database["public"]["Tables"]["student_subjects"]["Row"];

export type ResourceRow = Database["public"]["Tables"]["resources"]["Row"];

export type Notification = Database["public"]["Tables"]["notifications"]["Row"];

export type EditRequest = Database["public"]["Tables"]["edit_requests"]["Row"];
// formed types, full comemnting needed to know where they are going as i dont want to keep them in the same file but i probably should idk
// yeah you should fs
// yeah i am doing
// yeah done
