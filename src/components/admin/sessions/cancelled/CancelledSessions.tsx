"use client";

import CancelledSessionsTable from "./CancelledSessionsTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useState } from "react";
import { ComputedCancelledSessionRow } from "@/lib/sessions/cancelled/getCancelledSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { getSessionTypeById } from "@/lib/sessions/getSessionTypeById";
import { formatCancelledSession } from "@/lib/sessions/cancelled/formatCancelledSession";

export default function CancelledSessions() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<ComputedCancelledSessionRow | null>(null);

  const closeModal = useCloseModal(setShowModal);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
      setShowModal(true);
      const getSession = async () => {
        const data = await getSessionTypeById({
          id,
          status: "cancelled",
          extendSelect: `
            cancel_reason,
            cancelled_at,
            cancellation_source,
            cancelled_by,
            scheduled_for
          `,
        });

        const formatted = formatCancelledSession(data);
        setSelectedSession(formatted);
      };
      getSession();
    }
  }, []);

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
