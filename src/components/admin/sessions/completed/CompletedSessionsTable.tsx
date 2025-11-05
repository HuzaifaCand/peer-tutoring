"use client";

import { Table } from "@/components/table/Table";
import {
  getCompletedSessions,
  ComputedCompletedSessionRow,
} from "./getCompletedSessions";
import { completedSessionColumns } from "./CompletedSessionColumns";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "../types";
import { sortByVerification } from "@/utils/sortUtils";

export default function CompletedSessionsTable({
  setCount,
  setShowModal,
  setSelectedSession,
}: SessionDataProps<ComputedCompletedSessionRow>) {
  const sortFn = sortByVerification;

  const { data, loading, setRefetchFlag } = useDataFetch(getCompletedSessions, {
    sortFn,
  });
  const { handleOpen } = useModalOpener(setShowModal, setSelectedSession, "id");

  return (
    <Table
      type="completedSession"
      data={data}
      columns={completedSessionColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
      onRowClick={handleOpen}
      setRowCount={setCount}
    />
  );
}
