"use client";

import { Table } from "@/components/table/Table";

import { useEffect, useState } from "react";
import {
  ComputedCompletedSessionRow,
  getCompletedSessions,
} from "./getCompletedSessions";
import { completedSessionColumns } from "./CompletedSessionColumns";
import { verificationStatus } from "../../tutors/TutorTableColumns";

export default function CompletedSessionsTable({
  setRowCount,
}: {
  setRowCount: (rows: number) => void;
}) {
  const [data, setData] = useState<ComputedCompletedSessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getCompletedSessions();
      const statusOrder: Record<verificationStatus, number> = {
        unverified: 0,
        verified: 1,
        rejected: 2,
      };

      // sort by verification status first, then admin_seen
      const sorted = [...formatted].sort((a, b) => {
        // first by verification
        const statusA =
          a.verified === null
            ? "unverified"
            : a.verified === true
            ? "verified"
            : "rejected";
        const statusB =
          b.verified === null
            ? "unverified"
            : b.verified === true
            ? "verified"
            : "rejected";

        const aStatus = statusOrder[statusA as keyof typeof statusOrder];
        const bStatus = statusOrder[statusB as keyof typeof statusOrder];
        if (aStatus !== bStatus) return aStatus - bStatus;

        return 0;
      });

      setData(sorted);
      setLoading(false);
    }

    load();
  }, [refetchFlag]);

  return (
    <section>
      <Table
        type="completedSession"
        data={data}
        columns={completedSessionColumns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
        setRowCount={setRowCount}
      />
    </section>
  );
}
