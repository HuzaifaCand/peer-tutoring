"use client";

import { useCallback } from "react";
import { getOnsiteSlots } from "./getSlots";
import { useDataFetch } from "@/hooks/useDataFetch";
import { OnsiteAvailablity } from "../browse-tutors/OnsiteAvailability";

export function TutorSlots({ tutorId }: { tutorId: string }) {
  const fetchFn = useCallback(() => getOnsiteSlots(tutorId), [tutorId]);

  const { data: slots, loading } = useDataFetch(fetchFn);

  if (!slots || loading) return null;
  return (
    <div className="p-4 bg-elevatedBg rounded-2xl">
      <OnsiteAvailablity slots={slots} />
    </div>
  );
}
