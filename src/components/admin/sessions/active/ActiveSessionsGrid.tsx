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
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getActiveSessions();
      setData(formatted);
      setLastUpdated(new Date());
      setLoading(false);
    }

    load();

    const interval = setInterval(() => {
      load(); // background refresh
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refetchFlag]);

  return (
    <CardGrid
      type="activeSessions"
      lastUpdated={lastUpdated}
      data={data}
      loading={loading}
      fields={activeSessionFields}
      layoutClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      setRefetchFlag={setRefetchFlag}
    />
  );
}
