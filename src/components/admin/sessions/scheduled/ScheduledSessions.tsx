"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import ScheduledSessionsTable from "./ScheduledSessionsTable";
import { ComputedScheduledSessionRow } from "./getScheduledSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";

export default function ScheduledSessions() {
  const [rowCount, setRowCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<ComputedScheduledSessionRow | null>(null);

  const closeModal = useCloseModal(setShowModal);

  return (
    <main>
      {showModal && selectedSession && (
        <Modal
          data={selectedSession}
          type="scheduledSession"
          onClose={closeModal}
        />
      )}
      <SectionHeader
        title="Scheduled Sessions"
        rightSlot={`${rowCount} rows shown`}
      />
      <ScheduledSessionsTable
        setCount={setRowCount}
        setSelectedSession={setSelectedSession}
        setShowModal={setShowModal}
      />
    </main>
  );
}
