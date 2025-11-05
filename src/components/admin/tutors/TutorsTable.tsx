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
import { defaultSorters } from "@/utils/sorters";

interface TutorsTableProps {
  setRowCount: Dispatch<SetStateAction<number>>;
}

export default function TutorsTable({ setRowCount }: TutorsTableProps) {
  const sortFn = defaultSorters.tutor;

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
