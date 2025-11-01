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
import { ComputedCancelledSessionRow } from "../admin/sessions/overview/cancelled/getCancelledSessions";

export type tableTypes =
  | "students"
  | "tutors"
  | "cancelledSessions"
  | "activeSessions"
  | "scheduledSessions"
  | "completedSessions"
  | "scheduledSessions"
  | "subjects";

export type TableRowByType = {
  tutors: ComputedTutorRow;
  students: ComputedStudentRow;
  cancelledSessions: ComputedCancelledSessionRow;
  subjects: ComputedSubjectHealthView;
  activeSessions: ComputedActiveSessionRow;
  completedSessions: ComputedCompletedSessionRow;
  scheduledSessions: ComputedScheduledSessionRow;
};

import { Dispatch, SetStateAction } from "react";
import { ComputedSubjectHealthView } from "../admin/overview/getSubjectsHealth";
import { ComputedActiveSessionRow } from "../admin/sessions/active/getActiveSessions";
import { ComputedCompletedSessionRow } from "../admin/sessions/completed/getCompletedSessions";
import { ComputedScheduledSessionRow } from "../admin/sessions/scheduled/getScheduledSessions";

export type refetchFlagType = Dispatch<SetStateAction<boolean>>;

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  type: tableTypes;
  loading: boolean;
  setRefetchFlag: refetchFlagType;
  setRowCount?: (rows: number) => void;
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
