"use client";

import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";
import ScheduledSessionsTable from "./ScheduledSessionsTable";

export default function ScheduledSessions() {
  const [rowCount, setRowCount] = useState(0);

  return (
    <main>
      <SectionHeader
        title="Scheduled Sessions"
        rightSlot={`${rowCount} rows shown`}
      />
      <ScheduledSessionsTable setRowCount={setRowCount} />
    </main>
  );
}
