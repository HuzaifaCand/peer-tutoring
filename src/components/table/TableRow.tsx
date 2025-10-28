import React from "react";
import { TableColumn } from "./types";

interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
  onClick?: () => void;
}

export function TableRow<T extends Record<string, unknown>>({
  row,
  columns,
  onClick,
}: TableRowProps<T>) {
  return (
    <tr
      className="transition-colors border-b border-white/5 hover:bg-hoverBg cursor-pointer"
      onClick={onClick}
    >
      {columns.map((col) => {
        const value = row[col.key];
        return (
          <td
            key={String(col.key)}
            style={{
              maxWidth: col.width,
              overflow: col.truncate ? "hidden" : undefined,
              textOverflow: col.truncate ? "ellipsis" : undefined,
              whiteSpace: col.truncate ? "nowrap" : undefined,
            }}
            className="p-3 text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis"
            title={col.truncate ? String(value) : undefined}
          >
            {String(value)}
          </td>
        );
      })}
    </tr>
  );
}
