"use client";
import { CardGrid } from "@/components/card/CardGrid";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { getActiveSessions, ComputedActiveSession } from "./getActiveSessions";
import { useEffect } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "../types";
import { sortByTimestamp } from "@/utils/sortUtils";

export default function ActiveSessionsGrid({
  setCount,
  setShowModal,
  setSelectedSession,
}: SessionDataProps<ComputedActiveSession>) {
  const sortFn = sortByTimestamp<ComputedActiveSession>(
    "start_time_iso",
    "asc"
  );

  const { data, loading, setRefetchFlag, lastUpdated } = useDataFetch(
    getActiveSessions,
    { autoRefresh: true, sortFn }
  );

  useEffect(() => {
    setCount(data.length);
  }, [data.length, setCount]);

  const { handleOpen } = useModalOpener(setShowModal, setSelectedSession, "id");

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
