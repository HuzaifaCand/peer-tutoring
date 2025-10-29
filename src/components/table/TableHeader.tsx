import React from "react";
import { TableColumn } from "./types";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
}

export function TableHeader<T extends Record<string, unknown>>({
  columns,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-elevatedBg">
      <tr>
        {columns.map((col, index) => (
          <th
            key={String(col.key)}
            style={{
              width: col.width,
              maxWidth: col.width,
            }}
            className={`py-3  text-left text-sm font-semibold text-textButton uppercase tracking-wide ${
              index === 0 ? "pl-6" : "pl-3"
            }`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
