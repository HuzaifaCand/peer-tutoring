"use client";

import { Table } from "@/components/table/Table";
import {
  ComputedScheduledSessionRow,
  getScheduledSessions,
} from "../../../../lib/sessions/scheduled/getScheduledSessions";
import { scheduledSessionColumns } from "./ScheduledSessionColumns";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "../../../../lib/sessions/types";
import { defaultSorters } from "@/utils/sorters";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { useEffect, useState } from "react";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatScheduledSession } from "@/lib/sessions/scheduled/formatScheduledSession";
import { Modal } from "@/components/modal/ModalComponent";

export default function ScheduledSessionsTable({
  setCount,
}: SessionDataProps<ComputedScheduledSessionRow>) {
  const sortFn = defaultSorters.scheduledSession;

  const { data, loading, setRefetchFlag } = useDataFetch(getScheduledSessions, {
    sortFn,
  });

  const [selectedSession, setSelectedSession] =
    useState<ComputedScheduledSessionRow | null>(null);

  const closeModal = useCloseModal(setSelectedSession);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
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

  const { handleOpen } = useModalOpener(setSelectedSession, "id");

  const handleClick = (s: ComputedScheduledSessionRow) => handleOpen(s);

  return (
    <section>
      <Modal
        data={selectedSession}
        type="scheduledSession"
        onClose={closeModal}
      />
      <Table
        type="scheduledSession"
        data={data}
        columns={scheduledSessionColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
        onRowClick={handleClick}
        setRowCount={setCount}
      />
    </section>
  );
}
