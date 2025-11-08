"use client";

import CancelledSessionsTable from "./CancelledSessionsTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useState } from "react";
import { ComputedCancelledSessionRow } from "@/lib/sessions/cancelled/getCancelledSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatCancelledSession } from "@/lib/sessions/cancelled/formatCancelledSession";

export default function CancelledSessions() {
  const [count, setCount] = useState(0);
  const [selectedSession, setSelectedSession] =
    useState<ComputedCancelledSessionRow | null>(null);

  const closeModal = useCloseModal(setSelectedSession);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
      const getSession = async () => {
        const data = await getSessionById({
          id,
          status: "cancelled",
        });

        const formatted = formatCancelledSession(data);
        setSelectedSession(formatted);
      };
      getSession();
    }
  }, []);

  return (
    <main>
      <Modal
        type="cancelledSession"
        onClose={closeModal}
        data={selectedSession}
      />

      <SectionHeader
        title="Cancelled Sessions"
        rightSlot={`${count} rows shown`}
      />

      <CancelledSessionsTable
        setCount={setCount}
        setSelectedSession={setSelectedSession}
      />
    </main>
  );
}
