"use client";

import { useCallback } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { getUsersForSubjects } from "./getSubjectUsers";
import { CardsLoading } from "@/components/card/CardsLoading";
import { SubjectUserCard } from "./SubjectUserCard";

export default function SubjectUserCards({
  uid,
  role,
}: {
  uid: string;
  role: "tutor" | "student";
}) {
  const fetchFn = useCallback(
    () => getUsersForSubjects(role, uid),
    [role, uid]
  );
  const { data, loading } = useDataFetch(fetchFn);

  return (
    <section>
      <div className="sm:mb-4 mb-6">
        <h2 className="text-2xl text-textWhite font-semibold">Your Subjects</h2>
      </div>

      {loading ? (
        <CardsLoading layoutClassName="grid grid-cols-1 gap-4" count={2} />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data.map((subject) => (
            <SubjectUserCard
              key={subject?.subject_id}
              subject={subject}
              role={role}
            />
          ))}
        </div>
      )}
    </section>
  );
}
