"use client";

import { Table } from "@/components/table/Table";
import {
  ComputedCancelledSessionRow,
  getCancelledSessions,
} from "@/lib/sessions/cancelled/getCancelledSessions";
import { cancelledSessionColumns } from "./CancelledSessionColumns";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "../../../../lib/sessions/types";
import { defaultSorters } from "@/utils/sorters";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { useEffect, useState } from "react";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatCancelledSession } from "@/lib/sessions/cancelled/formatCancelledSession";

export default function CancelledSessionsTable({
  setCount,
}: SessionDataProps<ComputedCancelledSessionRow>) {
  const sortFn = defaultSorters.cancelledSession;

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

  const { data, loading, setRefetchFlag } = useDataFetch(getCancelledSessions, {
    sortFn,
  });

  const { handleOpen } = useModalOpener(setSelectedSession, "id");
  const handleClick = (s: ComputedCancelledSessionRow) => handleOpen(s);

  return (
    <section>
      <Modal
        type="cancelledSession"
        onClose={closeModal}
        data={selectedSession}
      />
      <Table
        type="cancelledSession"
        data={data}
        onRowClick={handleClick}
        columns={cancelledSessionColumns}
        loading={loading}
        setRowCount={setCount}
        setRefetchFlag={setRefetchFlag}
      />
    </section>
  );
}
