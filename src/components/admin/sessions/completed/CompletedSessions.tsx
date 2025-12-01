"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useState } from "react";
import CompletedSessionsTable from "./CompletedSessionsTable";
import { ComputedCompletedSessionRow } from "../../../../lib/sessions/completed/getCompletedSessions";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { getSessionById } from "@/lib/sessions/getSessionById";
import { formatCompletedSession } from "@/lib/sessions/completed/formatCompletedSession";

export default function CompletedSessions() {
  const [rowCount, setRowCount] = useState(0);

  return (
    <main>
      <SectionHeader
        title="Completed Sessions"
        rightSlot={`${rowCount} rows shown`}
      />
      <CompletedSessionsTable setCount={setRowCount} />
    </main>
  );
}
