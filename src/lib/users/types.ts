import { TutorSubjects } from "@/components/users/profile/getSubjects";
import {
  SlotsRow,
  StudentRow,
  StudentSubject,
  SubjectRow,
  TutorRow,
  TutorSubject,
  UserRow,
} from "../computedtypes";

export type TutorUser = TutorRow & {
  users: Pick<UserRow, "full_name" | "email">;
  available_slots: SlotsRow[];
  tutor_subjects: (TutorSubject & {
    subjects: SubjectRow;
  })[];
};

export type StudentUser = StudentRow & {
  users: Pick<UserRow, "full_name" | "email">;
  student_subjects: (StudentSubject & {
    subjects: SubjectRow;
  })[];
};
