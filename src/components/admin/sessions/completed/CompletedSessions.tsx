"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import CompletedSessionsTable from "./CompletedSessionsTable";

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
