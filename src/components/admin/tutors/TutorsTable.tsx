"use client";

import { Table } from "@/components/table/Table";
import {
  ComputedTutorRow,
  getTutorById,
  getTutors,
} from "../../../lib/users/getTutors";
import { tutorColumns } from "./TutorTableColumns";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { defaultSorters } from "@/utils/sorters";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { Modal } from "@/components/modal/ModalComponent";

interface TutorsTableProps {
  setRowCount: Dispatch<SetStateAction<number>>;
}

export default function TutorsTable({ setRowCount }: TutorsTableProps) {
  const [selectedTutor, setSelectedTutor] = useState<ComputedTutorRow | null>(
    null
  );

  const closeModal = useCloseModal(setSelectedTutor);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      const getTutor = async () => {
        const data = await getTutorById(id);
        setSelectedTutor(data);
      };
      getTutor();
    }
  }, []);
  const sortFn = defaultSorters.tutor;

  const { data, loading, setRefetchFlag } = useDataFetch(getTutors, { sortFn });

  const { handleOpen } = useModalOpener(setSelectedTutor);

  const handleClick = (t: ComputedTutorRow) => handleOpen(t);

  return (
    <>
      <Modal type="tutor" onClose={closeModal} data={selectedTutor} />

      <Table
        type="tutor"
        data={data}
        columns={tutorColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
        setRowCount={setRowCount}
        onRowClick={handleClick}
      />
    </>
  );
}
