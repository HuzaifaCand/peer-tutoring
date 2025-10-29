"use client";

import { useState, useMemo } from "react";
import { DataTableProps } from "./types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableLoading } from "./TableLoading";
import { TableTopbar } from "./TableTopbar";

export function Table<T extends Record<string, unknown>>({
  type,
  data,
  columns,
  onRowClick,
  loading,
  searchable = true,
  setRefetchFlag,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(lower))
    );
  }, [search, data]);

  const gradeCounts = useMemo(() => {
    if (type !== "students" && type !== "tutors") return null;

    const asCount = data.filter((row) => row.grade === "AS").length;
    const a2Count = data.filter((row) => row.grade === "A2").length;

    return { as: asCount, a2: a2Count };
  }, [data, type]);

  return (
    <div className="w-full text-sm overflow-x-auto">
      <TableTopbar
        gradeCounts={gradeCounts}
        searchConfig={{
          value: search,
          setValue: setSearch,
          searchable,
        }}
        loadingState={{
          loading,
          refetch: setRefetchFlag,
        }}
      />

      <div className="overflow-hidden rounded-t-xl bg-mainBg shadow-md">
        {loading && (
          <TableLoading columns={columns} rowCount={filteredData.length} />
        )}
        {!loading && (
          <table className="w-full border-collapse text-sm text-textWhite">
            <TableHeader columns={columns} />
            <TableBody
              data={filteredData}
              columns={columns}
              onRowClick={onRowClick}
            />
          </table>
        )}
      </div>
    </div>
  );
}
