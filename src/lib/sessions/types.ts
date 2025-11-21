import { Dispatch, SetStateAction } from "react";
import {
  SessionRow,
  StudentRow,
  SubjectRow,
  TutorRow,
  UserRow,
} from "../computedtypes";

export interface SessionDataProps<T> {
  setSelectedSession: Dispatch<SetStateAction<T | null>>;
  setCount: Dispatch<SetStateAction<number>>;
}

export type SessionWithUsers = SessionRow & {
  tutors: TutorRow & {
    users: Pick<UserRow, "full_name" | "email">;
  };
  students: StudentRow & {
    users: Pick<UserRow, "full_name" | "email">;
  };
  subjects: SubjectRow;
};
