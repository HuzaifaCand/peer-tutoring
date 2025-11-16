"use client";

import { useCallback } from "react";
import { getSubjectTutors } from "./getSubjectTutors";
import { useDataFetch } from "@/hooks/useDataFetch";
import { CardsLoading } from "@/components/card/CardsLoading";
import { TutorCard } from "./TutorCard";

export function TutorCards({ sid }: { sid: string }) {
  const fetchFn = useCallback(() => getSubjectTutors(sid), [sid]);
  const { data, loading } = useDataFetch(fetchFn);

  if (loading)
    return <CardsLoading count={4} layoutClassName="grid grid-cols-1 gap-3" />;

  return (
    <div className="grid grid-cols-1 gap-3">
      {data.map((t) => (
        <TutorCard key={t.id} tutor={t} />
      ))}
    </div>
  );
}
