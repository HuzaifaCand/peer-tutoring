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

export default function CancelledSessionsTable({
  setCount,
  setShowModal,
  setSelectedSession,
}: SessionDataProps<ComputedCancelledSessionRow>) {
  const sortFn = defaultSorters.cancelledSession;

  const { data, loading, setRefetchFlag } = useDataFetch(getCancelledSessions, {
    sortFn,
  });

  const { handleOpen } = useModalOpener(setShowModal, setSelectedSession, "id");
  const handleClick = (s: ComputedCancelledSessionRow) => handleOpen(s);

  return (
    <section>
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
