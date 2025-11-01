"use client";

import { Table } from "@/components/table/Table";

import { useEffect, useState } from "react";
import {
  ComputedCompletedSessionRow,
  getCompletedSessions,
} from "./getCompletedSessions";
import { completedSessionColumns } from "./CompletedSessionColumns";

export default function CompletedSessionsTable({
  setRowCount,
}: {
  setRowCount: (rows: number) => void;
}) {
  const [data, setData] = useState<ComputedCompletedSessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getCompletedSessions();
      setData(formatted);
      setLoading(false);
    }

    load();
  }, [refetchFlag]);

  return (
    <section>
      <Table
        type="completedSessions"
        data={data}
        columns={completedSessionColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
        setRowCount={setRowCount}
      />
    </section>
  );
}
