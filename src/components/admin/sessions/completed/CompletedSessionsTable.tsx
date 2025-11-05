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

export default function CompletedSessionsTable({
  setCount,
  setShowModal,
  setSelectedSession,
}: SessionDataProps<ComputedCompletedSessionRow>) {
  const statusOrder = { unverified: 0, verified: 1, rejected: 2 };
  const sortFn = (
    a: ComputedCompletedSessionRow,
    b: ComputedCompletedSessionRow
  ) => {
    const status = (v: boolean | null) =>
      v === null ? "unverified" : v ? "verified" : "rejected";
    return statusOrder[status(a.verified)] - statusOrder[status(b.verified)];
  };

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
