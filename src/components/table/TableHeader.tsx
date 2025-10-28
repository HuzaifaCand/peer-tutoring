import React from "react";
import { TableColumn } from "./types";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
}

export function TableHeader<T extends Record<string, unknown>>({
  columns,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-gradient-to-r from-elevatedBg to-elevatedBg/50">
      <tr>
        {columns.map((col) => (
          <th
            key={String(col.key)}
            style={{
              width: col.width,
              maxWidth: col.width,
            }}
            className="p-3 text-left text-sm font-semibold text-textButton uppercase tracking-wide"
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
