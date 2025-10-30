"use client";

import SectionHeader from "@/components/SectionHeader";
import TutorsTable from "./TutorsTable";
import { useState } from "react";

export default function TutorsOverview() {
  const [rowCount, setRowCount] = useState(0);
  return (
    <main className="text text-textWhite">
      <SectionHeader
        title="Registered Tutors"
        rightSlot={`${rowCount} rows shown`}
      />
      <TutorsTable setRowCount={setRowCount} />
    </main>
  );
}
