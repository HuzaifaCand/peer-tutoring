"use client";

import {
  ComputedActiveSessionRow,
  getActiveSessions,
} from "./getActiveSessions";
import { useEffect, useState } from "react";
import { CardGrid } from "@/components/card/CardGrid";
import { activeSessionFields } from "./ActiveSessionFields";

export default function ActiveSessionsList() {
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
    <CardGrid
      type="activeSessions"
      data={data}
      loading={loading}
      fields={activeSessionFields}
      layoutClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      setRefetchFlag={setRefetchFlag}
    />
  );
}
