"use client";

import { Table } from "@/components/table/Table";
import { getStudents } from "./getStudents";
import { studentColumns } from "./StudentTableColumns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { sortByAdminSeen } from "@/utils/sortUtils";

interface StudentsTableProps {
  setRowCount: Dispatch<SetStateAction<number>>;
}

export default function StudentsTable({ setRowCount }: StudentsTableProps) {
  const sortFn = sortByAdminSeen;
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
