"use client";

import { Table } from "@/components/table/Table";
import { ComputedStudentRow, getStudents } from "./getStudents";
import { studentColumns } from "./StudentTableColumns";
import { Dispatch, SetStateAction } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import {
  chainSorters,
  sortByAdminSeen,
  sortByTimestamp,
} from "@/utils/sortUtils";
import { defaultSorters } from "@/utils/sorters";

interface StudentsTableProps {
  setRowCount: Dispatch<SetStateAction<number>>;
}

export default function StudentsTable({ setRowCount }: StudentsTableProps) {
  const sortFn = defaultSorters.student;
  const { data, loading, setRefetchFlag } = useDataFetch(getStudents, {
    sortFn,
  });

  return (
    <Table
      type="student"
      data={data}
      columns={studentColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
      setRowCount={setRowCount}
    />
  );
}
