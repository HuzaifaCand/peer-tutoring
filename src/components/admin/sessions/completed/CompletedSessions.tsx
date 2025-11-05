"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import CompletedSessionsTable from "./CompletedSessionsTable";
import { ComputedCompletedSessionRow } from "./getCompletedSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";

export default function CompletedSessions() {
  const [rowCount, setRowCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<ComputedCompletedSessionRow | null>(null);

  const closeModal = useCloseModal(setShowModal);
  return (
    <main>
      {showModal && selectedSession && (
        <Modal
          data={selectedSession}
          type="completedSession"
          onClose={closeModal}
        />
      )}
      <SectionHeader
        title="Completed Sessions"
        rightSlot={`${rowCount} rows shown`}
      />
      <CompletedSessionsTable
        setCount={setRowCount}
        setShowModal={setShowModal}
        setSelectedSession={setSelectedSession}
      />
    </main>
  );
}
