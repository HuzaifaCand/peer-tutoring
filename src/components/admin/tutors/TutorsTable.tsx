"use client";

import { Table } from "@/components/table/Table";
import { getTutors, ComputedTutorRow } from "./getTutors";
import { GradeBadge } from "@/components/GradeBadge";
import { TableColumn } from "@/components/table/types";
import { useEffect, useState } from "react";

export const tutorUserColumns: TableColumn<ComputedTutorRow>[] = [
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
  { key: "email", label: "Email", width: 150 },
  { key: "available_slots", label: "Free Slots", width: 120 },
  { key: "subjects", label: "Subjects", width: 150 },
];

export default function TutorsTable() {
  const [data, setData] = useState<ComputedTutorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function loadTutors() {
      setLoading(true);
      const formatted = await getTutors();
      setData(formatted);
      setLoading(false);
    }

    loadTutors();
  }, [refetchFlag]);

  return (
    <Table
      type="tutors"
      data={data}
      columns={tutorUserColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
    />
  );
}
