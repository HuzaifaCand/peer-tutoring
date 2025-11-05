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

export default function ScheduledSessionsTable({
  setCount,
  setSelectedSession,
  setShowModal,
}: SessionDataProps<ComputedScheduledSessionRow>) {
  const sortFn = defaultSorters.scheduledSession;

  const { data, loading, setRefetchFlag } = useDataFetch(getScheduledSessions, {
    sortFn,
  });

  const { handleOpen } = useModalOpener(setShowModal, setSelectedSession, "id");

  const handleClick = (s: ComputedScheduledSessionRow) => handleOpen(s);

  return (
    <section>
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
