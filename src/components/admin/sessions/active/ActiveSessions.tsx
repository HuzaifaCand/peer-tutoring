"use client";

import ActiveSessionsGrid from "@/components/admin/sessions/active/ActiveSessionsGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import { ComputedActiveSession } from "@/components/admin/sessions/active/getActiveSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";

export default function ActiveSessions() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<ComputedActiveSession | null>(null);

  const closeModal = useCloseModal(setShowModal);

  return (
    <main>
      {showModal && selectedSession && (
        <Modal
          type="activeSession"
          onClose={closeModal}
          data={selectedSession}
        />
      )}

      <SectionHeader
        title="Active Sessions"
        rightSlot={`${count} active sessions`}
      />

      <ActiveSessionsGrid
        setCount={setCount}
        setShowModal={setShowModal}
        setSelectedSession={setSelectedSession}
      />
    </main>
  );
}
