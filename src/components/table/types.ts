export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  maxWidth?: string | number;
  truncate?: boolean;
  render?: (row: T) => React.ReactNode; // custom render logic
}

export interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
  onClick?: () => void;
}

import { ComputedTutorRow } from "../admin/tutors/getTutors";
import { ComputedStudentRow } from "../admin/students/getStudents";
import { ComputedCancelledSessionRow } from "../../lib/sessions/cancelled/getCancelledSessions";
import { ComputedSubjectHealthView } from "../admin/overview/getSubjectsHealth";
import { ComputedActiveSession } from "../../lib/sessions/active/getActiveSessions";
import { ComputedCompletedSessionRow } from "../../lib/sessions/completed/getCompletedSessions";
import { ComputedScheduledSessionRow } from "../../lib/sessions/scheduled/getScheduledSessions";

export type tableTypes =
  | "student"
  | "tutor"
  | "cancelledSession"
  | "activeSession"
  | "scheduledSession"
  | "completedSession"
  | "scheduledSession"
  | "subject";

export type TableRowByType = {
  tutor: ComputedTutorRow;
  student: ComputedStudentRow;
  cancelledSession: ComputedCancelledSessionRow;
  subject: ComputedSubjectHealthView;
  activeSession: ComputedActiveSession;
  completedSession: ComputedCompletedSessionRow;
  scheduledSession: ComputedScheduledSessionRow;
};

import { Dispatch, SetStateAction } from "react";

export type refetchFlagType = Dispatch<SetStateAction<boolean>>;

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  type: tableTypes;
  loading: boolean;
  setRefetchFlag: refetchFlagType;
  setRowCount?: Dispatch<SetStateAction<number>>;
}

export interface TableLoadingProps<T> {
  columns: TableColumn<T>[];
  rowCount?: number;
}

export interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
}
