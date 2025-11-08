"use client";
import { CardGrid } from "@/components/card/CardGrid";
import { useModalOpener } from "@/components/modal/useModalOpener";
import {
  getActiveSessions,
  ComputedActiveSession,
} from "@/lib/sessions/active/getActiveSessions";
import { useEffect } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "@/lib/sessions/types";
import { defaultSorters } from "@/utils/sorters";

export default function ActiveSessionsGrid({
  setCount,
  setSelectedSession,
}: SessionDataProps<ComputedActiveSession>) {
  const sortFn = defaultSorters.activeSession;

  const { data, loading, setRefetchFlag, lastUpdated } = useDataFetch(
    getActiveSessions,
    { sortFn }
  );

  useEffect(() => {
    setCount(data.length);
  }, [data.length, setCount]);

  const { handleOpen } = useModalOpener(setSelectedSession, "id");

  return (
    <CardGrid
      type="activeSession"
      data={data}
      loading={loading}
      lastUpdated={lastUpdated}
      layoutClassName="grid gap-4 lg:grid-cols-2"
      handleCardClick={handleOpen}
      setRefetchFlag={setRefetchFlag}
    />
  );
}
