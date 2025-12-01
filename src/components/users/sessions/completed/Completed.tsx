"use client";

import { useCallback } from "react";
import {
  CompletedSessionsType,
  getCompletedSessions,
} from "./getCompletedSessions";
import { useDataFetch } from "@/hooks/useDataFetch";
import { sortByTimestamp } from "@/utils/sortUtils";
import { CardGrid } from "@/components/card/CardGrid";

export function CompletedSessions({
  userId,
  role,
}: {
  userId: string;
  role: "student" | "tutor";
}) {
  const fetchFn = useCallback(
    () => getCompletedSessions(userId, role),
    [userId, role]
  );

  const { data, loading } = useDataFetch(fetchFn, {
    sortFn: sortByTimestamp<CompletedSessionsType, "completedAt">(
      "completedAt",
      "desc"
    ),
  });

  return (
    <CardGrid
      type="compSessions"
      data={data}
      loading={loading}
      layoutClassName="grid grid-cols-1 gap-3"
      role={role}
    />
  );
}
