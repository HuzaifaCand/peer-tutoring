"use client";

import { Table } from "@/components/table/Table";
import { ComputedStudentRow, getStudents } from "./getStudents";
import { TableColumn } from "@/components/table/types";
import { GradeBadge } from "@/components/GradeBadge";
import { useEffect, useState } from "react";

export const studentUserColumns: TableColumn<ComputedStudentRow>[] = [
  { key: "id", label: "ID", width: 90 },
  {
    key: "full_name",
    label: "Name",
    width: 200,
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="truncate">{row.full_name}</span>
        <GradeBadge grade={row.grade} />
      </div>
    ),
  },
  { key: "email", label: "Email", width: 200 },
  { key: "subjects", label: "Subjects", width: 150 },
];

export default function StudentsTable() {
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
      columns={studentUserColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
    />
  );
}
