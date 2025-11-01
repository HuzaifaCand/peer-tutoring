"use client";

import { Table } from "@/components/table/Table";

import { useEffect, useState } from "react";
import {
  ComputedActiveSessionRow,
  getActiveSessions,
} from "./getActiveSessions";
import { activeSessionColumns } from "./ActiveSessionColumns";

export default function ActiveSessionsTable() {
  const [data, setData] = useState<ComputedActiveSessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getActiveSessions();
      setData(formatted);
      setLoading(false);
    }

    load();
  }, [refetchFlag]);

  return (
    <section>
      <Table
        type="activeSessions"
        data={data}
        columns={activeSessionColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
      />
    </section>
  );
}
