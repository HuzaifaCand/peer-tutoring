"use client";

import { useCallback } from "react";
import {
  getScheduledSessions,
  ScheduledSessionsType,
} from "./getScheduledSessions";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SharedPropsType } from "../SessionsMain";
import { CardsLoading } from "@/components/card/CardsLoading";
import { ScheduledSessionCard } from "./ScheduledSessionCard";
import { EmptyGrid } from "@/components/card/EmptyCardGrid";
import { sortByTimestamp } from "@/utils/sortUtils";

export function ScheduledSessions({
  sharedProps,
}: {
  sharedProps: SharedPropsType;
}) {
  const { role, userId } = sharedProps;

  const fetchFn = useCallback(
    () => getScheduledSessions(userId, role),
    [userId, role]
  );

  const { data, loading, setRefetchFlag } = useDataFetch(fetchFn, {
    sortFn: sortByTimestamp<ScheduledSessionsType, "scheduledFor">(
      "scheduledFor",
      "asc"
    ),
  });

  if (loading)
    return <CardsLoading count={6} layoutClassName="grid grid-cols-1 gap-3" />;

  if (!data || data.length === 0)
    return <EmptyGrid text="You have no sessions scheduled" />;

  return (
    <div className="space-y-3 mt-3">
      {data.map((ss, i) => (
        <ScheduledSessionCard
          refetch={() => setRefetchFlag((prev) => !prev)}
          index={i}
          ss={ss}
          key={i}
          sharedProps={sharedProps}
        />
      ))}
    </div>
  );
}
