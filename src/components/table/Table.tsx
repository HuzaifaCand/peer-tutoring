"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTableProps, TableRowByType } from "./types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableLoading } from "./TableLoading";
import { TableTopbar } from "./TableTopbar";

export function Table<K extends keyof TableRowByType>({
  type,
  data,
  columns,
  onRowClick,
  loading,
  searchable = true,
  setRefetchFlag,
  setRowCount,
}: DataTableProps<TableRowByType[K]> & { type: K }) {
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  // compuiting filtered data
  const filteredData = useMemo(() => {
    let filtered = data;

    // availability filter first
    if (type === "tutors") {
      const tutorData = data as TableRowByType["tutors"][];

      if (availabilityFilter !== "all") {
        filtered = tutorData.filter((row) => {
          const isActive = row.unavailable_slots > 0;
          return availabilityFilter === "active" ? isActive : !isActive;
        });
      }
    }

    // search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.entries(row).some(([key, value]) => {
          const val = String(value).toLowerCase();

          if (key === "full_name") return val.startsWith(lower);
          if (key === "grade") return val === lower;
          return val.includes(lower);
        })
      );
    }

    return filtered;
  }, [search, data, availabilityFilter, type]);

  useEffect(() => {
    if (setRowCount) {
      setRowCount(filteredData.length);
    }
  }, [filteredData, setRowCount]);

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
        availabilityFilter={{
          value: availabilityFilter,
          setValue: setAvailabilityFilter,
        }}
      />

      <div className="overflow-hidden rounded-t-xl bg-mainBg shadow-md">
        {loading && (
          <TableLoading columns={columns} rowCount={filteredData.length || 8} />
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
