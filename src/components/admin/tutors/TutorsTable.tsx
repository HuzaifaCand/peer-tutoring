"use client";

import { Table } from "@/components/table/Table";
import { getTutors, ComputedTutorRow } from "./getTutors";
import { tutorColumns } from "./TutorTableColumns";
import { useDataFetch } from "@/hooks/useDataFetch";
import {
  chainSorters,
  sortByVerification,
  sortByAdminSeen,
  sortByTimestamp,
} from "@/utils/sortUtils";
import { Dispatch, SetStateAction } from "react";

interface TutorsTableProps {
  setRowCount: Dispatch<SetStateAction<number>>;
}

export default function TutorsTable({ setRowCount }: TutorsTableProps) {
  const sortFn = chainSorters<ComputedTutorRow>(
    sortByVerification,
    sortByAdminSeen,
    sortByTimestamp<ComputedTutorRow>("created_at", "desc")
  );

  const { data, loading, setRefetchFlag } = useDataFetch(getTutors, { sortFn });

  return (
    <Table
      type="tutor"
      data={data}
      columns={tutorColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
      setRowCount={setRowCount}
    />
  );
}
