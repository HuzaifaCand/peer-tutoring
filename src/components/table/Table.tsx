"use client";

import React, { useState, useMemo } from "react";
import { DataTableProps } from "./types";
import { TableSearch } from "./TableSearch";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  searchable = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(lower))
    );
  }, [search, data]);

  return (
    <div className="w-full text-sm overflow-x-auto">
      {searchable && <TableSearch value={search} onChange={setSearch} />}

      <div className="overflow-hidden rounded-t-xl bg-mainBg shadow-md">
        <table className="w-full border-collapse text-sm text-textWhite">
          <TableHeader columns={columns} />
          <TableBody
            data={filteredData}
            columns={columns}
            onRowClick={onRowClick}
          />
        </table>
      </div>
    </div>
  );
}
