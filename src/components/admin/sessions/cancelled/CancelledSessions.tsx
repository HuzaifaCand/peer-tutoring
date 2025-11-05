"use client";

import CancelledSessionsTable from "./CancelledSessionsTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import { ComputedCancelledSessionRow } from "@/components/admin/sessions/cancelled/getCancelledSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";

export default function CancelledSessions() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<ComputedCancelledSessionRow | null>(null);

  const closeModal = useCloseModal(setShowModal);

  return (
    <main>
      {showModal && selectedSession && (
        <Modal
          type="cancelledSession"
          onClose={closeModal}
          data={selectedSession}
        />
      )}

      <SectionHeader
        title="Cancelled Sessions"
        rightSlot={`${count} rows shown`}
      />

      <CancelledSessionsTable
        setCount={setCount}
        setShowModal={setShowModal}
        setSelectedSession={setSelectedSession}
      />
    </main>
  );
}
