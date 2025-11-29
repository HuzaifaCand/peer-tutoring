"use client";

import { useCallback, useState } from "react";
import { getSessionRequests, UnifiedRequest } from "./getSessionRequests";
import { useDataFetch } from "@/hooks/useDataFetch";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { RequestCard } from "./RequestCard";
import { EmptyGrid } from "@/components/card/EmptyCardGrid";
import { defaultSorters } from "@/utils/sorters";
import { CardsLoading } from "@/components/card/CardsLoading";
import { SharedPropsType } from "../SessionsMain";
import { ViewRequestModal } from "./modal/ViewRequestModal";

export function SessionRequests({
  sharedProps,
}: {
  sharedProps: SharedPropsType;
}) {
  const [selectedReq, setSelectedReq] = useState<UnifiedRequest | null>(null);
  const { userId, role } = sharedProps;

  const getSessionReqs = useCallback(
    () => getSessionRequests(userId, role),
    [userId]
  );

  const { data, loading, setRefetchFlag } = useDataFetch(getSessionReqs, {
    sortFn: defaultSorters.sessionRequests,
  });
  const { handleOpen } = useModalOpener(setSelectedReq, "id");
  const closeModal = useCloseModal(setSelectedReq);

  if (loading)
    return <CardsLoading count={4} layoutClassName="grid grid-cols-1 gap-3" />;

  if (!data || data.length === 0)
    return <EmptyGrid text="No Session Requests" />;

  return (
    <>
      <ViewRequestModal
        role={role}
        req={selectedReq}
        closeModal={closeModal}
        refetch={() => setRefetchFlag((prev) => !prev)}
      />
      <div className="space-y-3 mt-3">
        {data.map((req) => (
          <RequestCard
            role={role}
            key={req.id}
            req={req}
            handleOpen={handleOpen}
          />
        ))}
      </div>
    </>
  );
}
