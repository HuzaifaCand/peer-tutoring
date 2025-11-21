import {
  SlotsRow,
  StudentRow,
  SubjectRow,
  TutorRow,
  UserRow,
} from "../computedtypes";

export type TutorUser = TutorRow & {
  users: Pick<UserRow, "full_name" | "email">;
  available_slots: SlotsRow[];
  tutor_subjects: {
    subjects: SubjectRow;
  }[];
};

export type StudentUser = StudentRow & {
  users: Pick<UserRow, "full_name" | "email">;
  student_subjects: {
    subjects: SubjectRow;
  }[];
};
