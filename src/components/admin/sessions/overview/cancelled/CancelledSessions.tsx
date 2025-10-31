"use client";

import { Table } from "@/components/table/Table";

import { useEffect, useState } from "react";
import {
  ComputedCancelledSessionRow,
  getCancelledSessions,
} from "./getCancelledSessions";
import { cancelledSessionColumns } from "./CancelledSessionColumns";
import { BadgeInfoIcon, InfoIcon } from "lucide-react";

export default function CancelledSessionsTable() {
  const [data, setData] = useState<ComputedCancelledSessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getCancelledSessions();
      setData(formatted);
      setLoading(false);
    }

    load();
  }, [refetchFlag]);

  return (
    <section>
      <h2 className="text-2xl text-textWhite mb-4 sm:mb-2 md:mb-1 lg:mb-0 font-semibold">
        Cancelled Sessions
      </h2>

      <Table
        type="cancelledSessions"
        data={data}
        columns={cancelledSessionColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
      />
    </section>
  );
}
