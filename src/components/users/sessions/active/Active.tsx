"use client";

import { useCallback } from "react";
import { getActiveSessions } from "./getActiveSessions";
import { useDataFetch } from "@/hooks/useDataFetch";
import { ActiveSessionCard } from "./ActiveSessionCard";
import { EmptyGrid } from "@/components/card/EmptyCardGrid";
import { ActiveSessionMessagingPanel } from "./ActiveMessagingPanel";
import { CardsLoading } from "@/components/card/CardsLoading";

function ActiveSessionSkeleton() {
  return (
    <div className="space-y-2">
      {/* Fake ActiveSessionCard */}
      <CardsLoading count={1} layoutClassName="grid grid-cols-1" />

      {/* Fake Messaging Panel */}
      <div className="bg-mainBg rounded-xl border border-white/5 h-[200px] animate-pulse">
        <div className="py-6 border-b border-white/5" />
      </div>
    </div>
  );
}

export function ActiveSessions({
  userId,
  role,
}: {
  userId: string;
  role: "student" | "tutor";
}) {
  const fetchFn = useCallback(
    () => getActiveSessions(userId, role),
    [userId, role]
  );

  const { data, loading, setRefetchFlag } = useDataFetch(fetchFn);
  if (loading)
    return (
      <div className="mt-3 space-y-3">
        <ActiveSessionSkeleton />
      </div>
    );

  if (!data || data.length === 0)
    return <EmptyGrid text="No sessions active right now" />;

  return (
    <div className="space-y-3 mt-3">
      {data.map((as, i) => (
        <div className="space-y-2" key={i}>
          <ActiveSessionCard
            as={as}
            role={role}
            userId={userId}
            refetch={() => setRefetchFlag((prev) => !prev)}
          />
          <ActiveSessionMessagingPanel
            sessionId={as.id}
            userId={userId}
            disable={false}
          />
        </div>
      ))}
    </div>
  );
}
