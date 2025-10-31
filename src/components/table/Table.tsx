"use client";

import { useState, useEffect } from "react";
import { DataTableProps, TableRowByType } from "./types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableLoading } from "./TableLoading";
import { TableTopbar } from "./TableTopbar";
import { availabilities } from "./AvailabilityFilter";
import { useGradeCounts } from "./useGradeCount";
import { useFilteredTableData } from "./useTableFiltering";

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
  const [availabilityFilter, setAvailabilityFilter] =
    useState<availabilities>("all");

  // compuiting filtered data
  const filteredData = useFilteredTableData(
    type,
    data,
    search,
    availabilityFilter
  );

  useEffect(() => {
    if (setRowCount) {
      setRowCount(filteredData.length);
    }
  }, [filteredData, setRowCount]);

  const gradeCounts = useGradeCounts(type, data);

  return (
    <div className="w-full text-sm overflow-x-auto scroll-x-auto no-scrollbar">
      <TableTopbar
        rowCount={filteredData.length}
        gradeCounts={gradeCounts}
        type={type}
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
          <table className="w-full border-collapse text-xs text-textWhite">
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
