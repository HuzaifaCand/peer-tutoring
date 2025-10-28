export interface TableColumn<T> {
  key: keyof T | string; // e.g. "email", "id", "name"
  label: string; // Column header text
  width?: string | number; // Optional, e.g. "200px"
  truncate?: boolean; // Whether to truncate long text
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  searchable?: boolean;
}

export interface TableLoadingProps<T> {
  columns: TableColumn<T>[];
  rowCount?: number;
}
