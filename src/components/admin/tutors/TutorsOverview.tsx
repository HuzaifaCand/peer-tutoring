"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import TutorsTable from "./TutorsTable";
import { useEffect, useState } from "react";
import { ComputedTutorRow, getTutorById } from "../../../lib/users/getTutors";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";

export default function TutorsOverview() {
  const [rowCount, setRowCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<ComputedTutorRow | null>(
    null
  );

  const closeModal = useCloseModal(setShowModal, setSelectedTutor);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      setShowModal(true);
      const getTutor = async () => {
        const data = await getTutorById(id);
        setSelectedTutor(data);
      };
      getTutor();
    }
  }, []);

  return (
    <main>
      {showModal && selectedTutor && (
        <Modal type="tutor" onClose={closeModal} data={selectedTutor} />
      )}
      <SectionHeader
        title="Registered Tutors"
        rightSlot={`${rowCount} rows shown`}
      />

      <TutorsTable
        setShowModal={setShowModal}
        setTutor={setSelectedTutor}
        setRowCount={setRowCount}
      />
    </main>
  );
}
