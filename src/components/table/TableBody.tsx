import React from "react";
import { TableBodyProps } from "./types";
import { TableRow } from "./TableRow";

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
