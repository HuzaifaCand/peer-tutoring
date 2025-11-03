"use client";

import ActiveSessionsGrid from "@/components/admin/sessions/active/ActiveSessionsGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import { ComputedActiveSession } from "@/components/admin/sessions/active/getActiveSessions";
import { Modal } from "@/components/modal/ModalComponent";

export default function ActiveSessions() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<ComputedActiveSession | null>(null);

  return (
    <main>
      {showModal && selectedSession && (
        <Modal
          type="activeSession"
          onClose={() => setShowModal(false)}
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
