"use client";

import { useCallback } from "react";
import { getActiveSessions } from "./getActiveSessions";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SharedPropsType } from "../SessionsMain";
import { CardsLoading } from "@/components/card/CardsLoading";
import { ActiveSessionCard } from "./ActiveSessionCard";
import { EmptyGrid } from "@/components/card/EmptyCardGrid";

export function ActiveSessions({
  sharedProps,
}: {
  sharedProps: SharedPropsType;
}) {
  const { role, userId } = sharedProps;

  const fetchFn = useCallback(
    () => getActiveSessions(userId, role),
    [userId, role]
  );

  const { data, loading, setRefetchFlag } = useDataFetch(fetchFn);
  if (loading)
    return <CardsLoading count={1} layoutClassName="grid grid-cols-1 gap-3" />;

  if (!data || data.length === 0)
    return <EmptyGrid text="No sessions active right now" />;

  return (
    <div className="space-y-3 mt-3">
      {data.map((as, i) => (
        <ActiveSessionCard
          key={i}
          as={as}
          role={role}
          userId={userId}
          refetch={() => setRefetchFlag((prev) => !prev)}
        />
      ))}
    </div>
  );
}
