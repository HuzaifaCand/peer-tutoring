"use client";

import SectionHeader from "@/components/SectionHeader";
import StudentsTable from "./StudentsTable";
import { useState } from "react";

export default function StudentsOverview() {
  const [rowCount, setRowCount] = useState(0);
  return (
    <main>
      <SectionHeader
        title="Registered Students"
        rightSlot={`${rowCount} rows shown`}
      />

      <StudentsTable setRowCount={setRowCount} />
    </main>
  );
}
