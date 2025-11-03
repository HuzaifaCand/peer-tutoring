"use client";

import { ComputedActiveSession, getActiveSessions } from "./getActiveSessions";
import { useEffect, useState } from "react";
import { CardGrid } from "@/components/card/CardGrid";
import { useRouter } from "next/navigation";

interface Props {
  setCount: (items: number) => void;

  setShowModal: (showModal: boolean) => void;
  setSelectedSession: (session: ComputedActiveSession) => void;
}

export default function ActiveSessionsGrid({
  setCount,
  setShowModal,
  setSelectedSession,
}: Props) {
  const [data, setData] = useState<ComputedActiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getActiveSessions();
      setData(formatted);
      setLastUpdated(new Date());
      setLoading(false);
    }

    load();
    // disabled for now, 5 minute refetcher to keep data not stale
    // const interval = setInterval(() => {
    //   load();
    // }, 5 * 60 * 1000);

    // return () => clearInterval(interval);
  }, [refetchFlag]);

  useEffect(() => {
    setCount(data.length);
  }, [data, setCount]);

  const handleCardClick = (session: ComputedActiveSession) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  return (
    <CardGrid
      type="activeSession"
      lastUpdated={lastUpdated}
      data={data}
      loading={loading}
      handleCardClick={handleCardClick}
      layoutClassName="grid gap-4 lg:grid-cols-2"
      setRefetchFlag={setRefetchFlag}
    />
  );
}
