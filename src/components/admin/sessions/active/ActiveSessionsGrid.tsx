"use client";

import {
  ComputedActiveSessionRow,
  getActiveSessions,
} from "./getActiveSessions";
import { useEffect, useState } from "react";
import { CardGrid } from "@/components/card/CardGrid";

export default function ActiveSessionsList({
  setCount,
}: {
  setCount: (items: number) => void;
}) {
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
      load();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refetchFlag]);

  useEffect(() => {
    setCount(data.length);
  }, [data, setCount]);

  return (
    <CardGrid
      type="activeSessions"
      lastUpdated={lastUpdated}
      data={data}
      loading={loading}
      layoutClassName="grid gap-4 lg:grid-cols-2"
      setRefetchFlag={setRefetchFlag}
    />
  );
}
