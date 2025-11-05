"use client";

import { Table } from "@/components/table/Table";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ComputedCancelledSessionRow,
  getCancelledSessions,
} from "./getCancelledSessions";
import { cancelledSessionColumns } from "./CancelledSessionColumns";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "../types";

export default function CancelledSessionsTable({
  setCount,
  setShowModal,
  setSelectedSession,
}: SessionDataProps<ComputedCancelledSessionRow>) {
  const { data, loading, setRefetchFlag } = useDataFetch(getCancelledSessions);

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
