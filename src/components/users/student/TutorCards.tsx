"use client";

import { useCallback, useEffect } from "react";
import { getSubjectTutors } from "./getSubjectTutors";
import { useDataFetch } from "@/hooks/useDataFetch";
import { CardsLoading } from "@/components/card/CardsLoading";
import { TutorCard } from "./TutorCard";

interface TutorCardProps {
  sid: string;
  setTutorCount: (t: number) => void;
}
export function TutorCards({ sid, setTutorCount }: TutorCardProps) {
  const fetchFn = useCallback(() => getSubjectTutors(sid), [sid]);
  const { data, loading } = useDataFetch(fetchFn);

  useEffect(() => {
    if (loading) return;
    if (setTutorCount) {
      setTutorCount(data.length);
    }
  }, [data, setTutorCount, loading]);

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
