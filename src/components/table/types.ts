import { Dispatch, SetStateAction } from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  width?: string | number;
  truncate?: boolean;
  render?: (row: T) => React.ReactNode; // ✅ NEW: custom render logic
}

export interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
  onClick?: () => void;
}

export type refetchFlagType = Dispatch<SetStateAction<boolean>>;
export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  type?: "students" | "tutors" | "sessions";
  loading: boolean;
  setRefetchFlag: refetchFlagType;
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
