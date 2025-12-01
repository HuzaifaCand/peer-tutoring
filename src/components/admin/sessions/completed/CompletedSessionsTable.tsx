"use client";

import { Table } from "@/components/table/Table";
import {
  getCompletedSessions,
  ComputedCompletedSessionRow,
} from "../../../../lib/sessions/completed/getCompletedSessions";
import { completedSessionColumns } from "./CompletedSessionColumns";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "../../../../lib/sessions/types";

import { defaultSorters } from "@/utils/sorters";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { useEffect, useState } from "react";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatCompletedSession } from "@/lib/sessions/completed/formatCompletedSession";

export default function CompletedSessionsTable({
  setCount,
}: SessionDataProps<ComputedCompletedSessionRow>) {
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
  const sortFn = defaultSorters.completedSession;

  const { data, loading, setRefetchFlag } = useDataFetch(getCompletedSessions, {
    sortFn,
  });
  const { handleOpen } = useModalOpener(setSelectedSession, "id");

  const closeModal = useCloseModal(setSelectedSession);

  return (
    <>
      <Modal
        data={selectedSession}
        type="completedSession"
        onClose={closeModal}
        setRefetchFlag={setRefetchFlag}
      />

      <Table
        type="completedSession"
        data={data}
        columns={completedSessionColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
        onRowClick={handleOpen}
        setRowCount={setCount}
      />
    </>
  );
}
