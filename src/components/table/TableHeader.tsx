import React from "react";
import { TableColumn } from "./types";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
}

export function TableHeader<T extends Record<string, unknown>>({
  columns,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-elevatedBg sticky top-0 z-10">
      <tr>
        {columns.map((col, index) => (
          <th
            key={String(col.key)}
            style={{
              maxWidth: col.maxWidth ?? "200px",
            }}
            className={`py-3  text-left text-[13px] font-semibold text-textButton ${
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
