import React from "react";
import { TableRowProps } from "./types";

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
        const content = col.render ? col.render(row) : String(value ?? "");

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
            title={col.truncate && !col.render ? String(value) : undefined}
          >
            {content}
          </td>
        );
      })}
    </tr>
  );
}
