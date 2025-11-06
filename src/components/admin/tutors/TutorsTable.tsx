"use client";

import { Table } from "@/components/table/Table";
import { ComputedTutorRow, getTutors } from "../../../lib/users/getTutors";
import { tutorColumns } from "./TutorTableColumns";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Dispatch, SetStateAction } from "react";
import { defaultSorters } from "@/utils/sorters";
import { useModalOpener } from "@/components/modal/useModalOpener";

interface TutorsTableProps {
  setRowCount: Dispatch<SetStateAction<number>>;
  setTutor: Dispatch<SetStateAction<ComputedTutorRow | null>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function TutorsTable({
  setRowCount,
  setShowModal,
  setTutor,
}: TutorsTableProps) {
  const sortFn = defaultSorters.tutor;

  const { data, loading, setRefetchFlag } = useDataFetch(getTutors, { sortFn });

  const { handleOpen } = useModalOpener(setShowModal, setTutor);

  const handleClick = (t: ComputedTutorRow) => handleOpen(t);

  return (
    <Table
      type="tutor"
      data={data}
      columns={tutorColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
      setRowCount={setRowCount}
      onRowClick={handleClick}
    />
  );
}
