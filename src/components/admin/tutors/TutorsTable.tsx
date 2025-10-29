"use client";

import { Table } from "@/components/table/Table";
import { getTutors, ComputedTutorRow } from "./getTutors";
import { tutorColumns } from "./TutorTableColumns";
import { useEffect, useState } from "react";

export default function TutorsTable() {
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

      // Sort tutors by admin_seen first, then by verification status
      const sorted = [...formatted].sort((a, b) => {
        // unseen first
        if (a.admin_seen !== b.admin_seen) {
          return a.admin_seen ? 1 : -1;
        }
        // then by verification status
        const aStatus = statusOrder[a.verified as keyof typeof statusOrder];
        const bStatus = statusOrder[b.verified as keyof typeof statusOrder];
        return aStatus - bStatus;
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
    />
  );
}
