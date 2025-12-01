"use client";
import { CardGrid } from "@/components/card/CardGrid";
import { useModalOpener } from "@/components/modal/useModalOpener";
import {
  getActiveSessions,
  ComputedActiveSession,
} from "@/lib/sessions/active/getActiveSessions";
import { useEffect, useState } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SessionDataProps } from "@/lib/sessions/types";
import { defaultSorters } from "@/utils/sorters";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { Modal } from "@/components/modal/ModalComponent";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatActiveSession } from "@/lib/sessions/active/formatActiveSession";

export default function ActiveSessionsGrid({
  setCount,
}: SessionDataProps<ComputedActiveSession>) {
  const [selectedSession, setSelectedSession] =
    useState<ComputedActiveSession | null>(null);

  const closeModal = useCloseModal(setSelectedSession);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
      const getSession = async () => {
        const data = await getSessionById({
          id,
          status: "in_progress",
        });

        const formatted = formatActiveSession(data);
        setSelectedSession(formatted);
      };
      getSession();
    }
  }, []);
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
    <>
      <Modal type="activeSession" onClose={closeModal} data={selectedSession} />
      <CardGrid
        type="activeSession"
        data={data}
        loading={loading}
        lastUpdated={lastUpdated}
        layoutClassName="grid gap-4 lg:grid-cols-2"
        handleCardClick={handleOpen}
        setRefetchFlag={setRefetchFlag}
      />
    </>
  );
}
