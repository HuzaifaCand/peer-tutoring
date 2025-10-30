"use client";

import { Table } from "@/components/table/Table";
import { ComputedStudentRow, getStudents } from "./getStudents";
import { studentColumns } from "./StudentTableColumns";
import { useEffect, useState } from "react";

interface StudentsTableProps {
  setRowCount: (rows: number) => void;
}

export default function StudentsTable({ setRowCount }: StudentsTableProps) {
  const [data, setData] = useState<ComputedStudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getStudents();
      setData(formatted);
      setLoading(false);
    }

    load();
  }, [refetchFlag]);

  return (
    <Table
      type="students"
      data={data}
      columns={studentColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
      setRowCount={setRowCount}
    />
  );
}
