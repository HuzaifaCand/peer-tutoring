"use client";

import { Table } from "@/components/table/Table";
import { getTutors, ComputedTutorRow } from "./getTutors";
import { tutorColumns } from "./TutorTableColumns";
import { useEffect, useState } from "react";

interface TutorsTableProps {
  setRowCount: (rows: number) => void;
}

export default function TutorsTable({ setRowCount }: TutorsTableProps) {
  const [tutors, setTutors] = useState<ComputedTutorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function loadTutors() {
      setLoading(true);
      const formatted = await getTutors();

      const statusOrder = {
        Unverified: 0,
        Verified: 1,
        Rejected: 2,
      };

      // sort by verification status first, then admin_seen
      const sorted = [...formatted].sort((a, b) => {
        // first by verification
        const aStatus = statusOrder[a.verified as keyof typeof statusOrder];
        const bStatus = statusOrder[b.verified as keyof typeof statusOrder];
        if (aStatus !== bStatus) return aStatus - bStatus;

        // then unseen first within each status group
        if (a.admin_seen !== b.admin_seen) {
          return a.admin_seen ? 1 : -1;
        }

        return 0;
      });

      setTutors(sorted);

      setLoading(false);
    }

    loadTutors();
  }, [refetchFlag]);

  return (
    <Table
      type="tutors"
      data={tutors}
      columns={tutorColumns}
      loading={loading}
      setRefetchFlag={setRefetchFlag}
      setRowCount={setRowCount}
    />
  );
}
