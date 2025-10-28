import React from "react";
import { TableColumn } from "./types";
import { TableRow } from "./TableRow";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
}

export function TableBody<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
}: TableBodyProps<T>) {
  return (
    <tbody>
      {data.map((row, i) => (
        <TableRow
          key={i}
          row={row}
          columns={columns}
          onClick={() => onRowClick?.(row)}
        />
      ))}
    </tbody>
  );
}
