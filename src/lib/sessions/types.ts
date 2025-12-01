import { Dispatch, SetStateAction } from "react";
import {
  SessionRow,
  StudentRow,
  StudentSessionFeedback,
  SubjectRow,
  TutorRow,
  TutorSessionFeedback,
  UserRow,
} from "../computedtypes";

export interface SessionDataProps<T> {
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
  student_session_feedback: StudentSessionFeedback;
  tutor_session_feedback: TutorSessionFeedback;
};
