"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useState } from "react";
import CompletedSessionsTable from "./CompletedSessionsTable";
import { ComputedCompletedSessionRow } from "../../../../lib/sessions/completed/getCompletedSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatCompletedSession } from "@/lib/sessions/completed/formatCompletedSession";

export default function CompletedSessions() {
  const [rowCount, setRowCount] = useState(0);
  const [selectedSession, setSelectedSession] =
    useState<ComputedCompletedSessionRow | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
      const getSession = async () => {
        const data = await getSessionById({
          id,
          status: "completed",
        });

        const formatted = formatCompletedSession(data);
        setSelectedSession(formatted);
      };
      getSession();
    }
  }, []);

  const closeModal = useCloseModal(setSelectedSession);
  return (
    <main>
      <Modal
        data={selectedSession}
        type="completedSession"
        onClose={closeModal}
      />

      <SectionHeader
        title="Completed Sessions"
        rightSlot={`${rowCount} rows shown`}
      />
      <CompletedSessionsTable
        setCount={setRowCount}
        setSelectedSession={setSelectedSession}
      />
    </main>
  );
}
