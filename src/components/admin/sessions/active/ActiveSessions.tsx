"use client";

import ActiveSessionsGrid from "@/components/admin/sessions/active/ActiveSessionsGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useState } from "react";
import { ComputedActiveSession } from "@/lib/sessions/active/getActiveSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { getSessionById } from "../../../../lib/sessions/getSessionById";
import { formatActiveSession } from "../../../../lib/sessions/active/formatActiveSession";

export default function ActiveSessions() {
  const [count, setCount] = useState(0);
  const [selectedSession, setSelectedSession] =
    useState<ComputedActiveSession | null>(null);

  const closeModal = useCloseModal(setSelectedSession);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
      const getSession = async () => {
        const data = await getSessionById({
          id,
          status: "in_progress",
        });

        const formatted = formatActiveSession(data);
        setSelectedSession(formatted);
      };
      getSession();
    }
  }, []);

  return (
    <main>
      {selectedSession && (
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
        setSelectedSession={setSelectedSession}
      />
    </main>
  );
}
