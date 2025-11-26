"use client";

import { useCallback } from "react";
import { CancSessions, getCancelledSessions } from "./getCancelledSessions";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SharedPropsType } from "../SessionsMain";
import { sortByTimestamp } from "@/utils/sortUtils";
import { CardsLoading } from "@/components/card/CardsLoading";
import { CancelledSessionCard } from "./CancelledSessionCard";
import { EmptyGrid } from "@/components/card/EmptyCardGrid";

export function CancelledSessions({
  sharedProps,
}: {
  sharedProps: SharedPropsType;
}) {
  const { role, userId } = sharedProps;

  const fetchFn = useCallback(
    () => getCancelledSessions(userId, role),
    [userId, role]
  );

  const { data, loading } = useDataFetch(fetchFn, {
    sortFn: sortByTimestamp<CancSessions, "when">("when", "desc"),
  });

  if (loading)
    return <CardsLoading count={6} layoutClassName="grid grid-cols-1 gap-3" />;

  if (!data || data.length === 0)
    return <EmptyGrid text="No cancelled sessions found" />;

  return (
    <div className="space-y-3 mt-3">
      {data.map((cs, i) => (
        <CancelledSessionCard
          key={i}
          cs={cs}
          role={role}
          currentUserId={userId}
        />
      ))}
    </div>
  );
}
