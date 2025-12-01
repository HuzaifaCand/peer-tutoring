"use client";

import CancelledSessionsTable from "./CancelledSessionsTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";

export default function CancelledSessions() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <SectionHeader
        title="Cancelled Sessions"
        rightSlot={`${count} rows shown`}
      />

      <CancelledSessionsTable setCount={setCount} />
    </main>
  );
}
