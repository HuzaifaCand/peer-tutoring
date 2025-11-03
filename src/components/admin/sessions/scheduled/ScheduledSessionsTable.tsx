"use client";

import { Table } from "@/components/table/Table";

import { useEffect, useState } from "react";
import {
  ComputedScheduledSessionRow,
  getScheduledSessions,
} from "./getScheduledSessions";
import { scheduledSessionColumns } from "./ScheduledSessionColumns";

export default function ScheduledSessionsTable({
  setRowCount,
}: {
  setRowCount: (rows: number) => void;
}) {
  const [data, setData] = useState<ComputedScheduledSessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getScheduledSessions();
      setData(formatted);
      setLoading(false);
    }

    load();
  }, [refetchFlag]);

  return (
    <section>
      <Table
        type="scheduledSession"
        data={data}
        columns={scheduledSessionColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
        setRowCount={setRowCount}
      />
    </section>
  );
}
