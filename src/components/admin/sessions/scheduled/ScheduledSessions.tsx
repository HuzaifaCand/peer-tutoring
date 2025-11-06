"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useState } from "react";
import ScheduledSessionsTable from "./ScheduledSessionsTable";
import { ComputedScheduledSessionRow } from "../../../../lib/sessions/scheduled/getScheduledSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatScheduledSession } from "@/lib/sessions/scheduled/formatScheduledSession";

export default function ScheduledSessions() {
  const [rowCount, setRowCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<ComputedScheduledSessionRow | null>(null);

  const closeModal = useCloseModal(setShowModal, setSelectedSession);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
      setShowModal(true);
      const getSession = async () => {
        const data = await getSessionById({
          id,
          status: "scheduled",
        });

        const formatted = formatScheduledSession(data);
        setSelectedSession(formatted);
      };
      getSession();
    }
  }, []);

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
