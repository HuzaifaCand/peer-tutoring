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
              maxWidth: col.maxWidth ?? "200px", // cap so long text truncates
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="p-3 text-gray-300"
            title={col.truncate ? String(value) : undefined}
          >
            {content}
          </td>
        );
      })}
    </tr>
  );
}
