"use client";

import { Table } from "@/components/table/Table";
import {
  ComputedStudentRow,
  getStudents,
} from "../../../lib/users/getStudents";
import { studentColumns } from "./StudentTableColumns";
import { Dispatch, SetStateAction } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { defaultSorters } from "@/utils/sorters";
import { useModalOpener } from "@/components/modal/useModalOpener";

interface StudentsTableProps {
  setRowCount: Dispatch<SetStateAction<number>>;
  setStudent: Dispatch<SetStateAction<ComputedStudentRow | null>>;
}

export default function StudentsTable({
  setRowCount,
  setStudent,
}: StudentsTableProps) {
  const sortFn = defaultSorters.student;
  const { data, loading, setRefetchFlag } = useDataFetch(getStudents, {
    sortFn,
  });

  const { handleOpen } = useModalOpener(setStudent);
  const handleClick = (s: ComputedStudentRow) => handleOpen(s);

  return (
    <Table
      type="student"
      data={data}
      columns={studentColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
      setRowCount={setRowCount}
      onRowClick={handleClick}
    />
  );
}
