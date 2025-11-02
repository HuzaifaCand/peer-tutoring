"use client";

import ActiveSessionsList from "@/components/admin/sessions/active/ActiveSessionsGrid";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";

export default function ActiveSessions() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <SectionHeader
        title="Active Sessions"
        rightSlot={`${count} active sessions`}
      />
      <ActiveSessionsList setCount={setCount} />
    </main>
  );
}
