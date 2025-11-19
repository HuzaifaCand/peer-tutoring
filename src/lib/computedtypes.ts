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

export type StudentUser = StudentRow & {
  users: Pick<UserRow, "full_name" | "email">;
  student_subjects: {
    subjects: SubjectRow;
  }[];
};

export type TutorUser = TutorRow & {
  users: Pick<UserRow, "full_name" | "email">;
  available_slots: SlotsRow[];
  tutor_subjects: {
    subjects: SubjectRow;
  }[];
};

export type SessionWithUsers = SessionRow & {
  tutors: TutorRow & {
    users: Pick<UserRow, "full_name" | "email">;
  };
  students: StudentRow & {
    users: Pick<UserRow, "full_name" | "email">;
  };
  subjects: SubjectRow;
};

export type Resource = ResourceRow & {
  subjects: SubjectRow;
  users: Pick<UserRow, "full_name" | "role">;
  verified_by_tutor?: {
    users: Pick<UserRow, "full_name">;
  } | null;
};

export type SubjectWithUserCount = SubjectHealthView & {
  subjects: SubjectRow;
};

export type SubjectTutor = TutorSubject & {
  subjects: SubjectRow;
  tutors: TutorRow & {
    users: Pick<UserRow, "full_name">;
    available_slots: SlotsRow[];
  };
};

export type EditRequestWithUserWithAdmin = EditRequest & {
  users: UserRow;
  admin: UserRow | null;
};
