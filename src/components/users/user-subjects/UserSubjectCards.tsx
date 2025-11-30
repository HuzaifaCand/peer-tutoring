"use client";

import { useCallback } from "react";
import { useDataFetch } from "@/hooks/useDataFetch";
import { getUserSubjects } from "./getUserSubjects";
import { CardsLoading } from "@/components/card/CardsLoading";
import { UserSubjectCard } from "./UserSubjectCard";

export default function UserSubjectCards({
  uid,
  role,
}: {
  uid: string;
  role: "tutor" | "student";
}) {
  const fetchFn = useCallback(() => getUserSubjects(role, uid), [role, uid]);
  const { data, loading } = useDataFetch(fetchFn);

  return (
    <section>
      <div className="sm:mb-4 mb-6">
        <h2 className="text-2xl text-textWhite font-semibold">Your Subjects</h2>
      </div>

      {loading ? (
        <CardsLoading layoutClassName="grid grid-cols-1 gap-4" count={1} />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data.map((subject) => (
            <UserSubjectCard
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
