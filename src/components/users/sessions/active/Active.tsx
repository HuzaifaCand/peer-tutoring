"use client";

import { useCallback } from "react";
import { getActiveSessions } from "./getActiveSessions";
import { useDataFetch } from "@/hooks/useDataFetch";
import { SharedPropsType } from "../SessionsMain";
import { ActiveSessionCard } from "./ActiveSessionCard";
import { EmptyGrid } from "@/components/card/EmptyCardGrid";
import { ActiveSessionMessagingPanel } from "./ActiveMessagingPanel";

function ActiveSessionSkeleton() {
  return (
    <div className="space-y-2">
      {/* Fake ActiveSessionCard */}
      <div className="rounded-xl bg-mainBg shadow-md p-6 text-sm border border-white/5 animate-pulse">
        {/* Header */}
        <div className="mb-2 flex justify-between items-center">
          <div className="h-4 w-24 bg-white/10 rounded"></div>
          <div className="h-4 w-20 bg-white/10 rounded"></div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 sm:flex sm:justify-between sm:items-center space-y-2 py-4">
          <div className="space-y-2">
            <div className="h-3 w-16 bg-white/10 rounded"></div>
            <div className="h-3 w-28 bg-white/10 rounded"></div>
          </div>
          {/* <div className="space-y-2">
          <div className="h-3 w-16 bg-white/10 rounded"></div>
          <div className="h-3 w-28 bg-white/10 rounded"></div>
        </div> */}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-2 flex justify-between">
          <div className="h-3 w-16 bg-white/10 rounded"></div>
          <div className="h-3 w-12 bg-white/10 rounded"></div>
        </div>
      </div>

      {/* Fake Messaging Panel */}
      <div className="bg-mainBg rounded-xl border border-white/5 h-[200px] animate-pulse">
        <div className="py-6 border-b border-white/5" />
      </div>
    </div>
  );
}

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
