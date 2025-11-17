"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useState } from "react";
import EditRequestsTable from "./EditRequestsTable";

export default function EditRequests() {
  const [rows, setRows] = useState<number>(0);

  return (
    <main>
      <SectionHeader title="Edit Requests" rightSlot={`${rows} rows shown`} />
      <EditRequestsTable setRows={setRows} />
    </main>
  );
}
