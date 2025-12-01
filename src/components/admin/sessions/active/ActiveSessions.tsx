"use client";

import ActiveSessionsGrid from "@/components/admin/sessions/active/ActiveSessionsGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";

export default function ActiveSessions() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <SectionHeader
        title="Active Sessions"
        rightSlot={`${count} active sessions`}
      />

      <ActiveSessionsGrid setCount={setCount} />
    </main>
  );
}
