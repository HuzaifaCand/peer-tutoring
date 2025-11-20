"use client";

import { useEffect, useMemo, useState } from "react";
import { CardGridProps, CardByType, cardTypes } from "./types";
import { CardsLoading } from "./CardsLoading";
import { DataSearch } from "../DataSearch";
import { EmptyGrid } from "./EmptyCardGrid";
import DataRefresh from "../DataRefresh";
import { formatDistanceToNow } from "date-fns";
import { ActiveSessionCard } from "../admin/sessions/active/ActiveSessionCard";
import { ResourceCard } from "../users/resources/ResourceCard";
import { SubjectFilter } from "../users/SubjectFilter";
import { useUserSubjects } from "@/hooks/useUserSubjects";

const typeEmptyGridMap: Record<cardTypes, string> = {
  activeSession: "No sessions are active right now",
  resource: "No resources exist for this subject yet",
};

export function CardGrid<K extends keyof CardByType>({
  type,
  lastUpdated,
  data,
  loading = false,
  layoutClassName,
  setRefetchFlag,
  getKey = (_, i) => i,
  handleCardClick,
}: CardGridProps<K>) {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<"all" | string>("all");

  const { subjects, error: subjectError } = useUserSubjects();

  if (subjectError) console.error(subjectError);

  const filteredData = useMemo(() => {
    let result = data;

    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter((row) =>
        Object.entries(row as Record<string, unknown>).some(([key, value]) => {
          const val = String(value ?? "").toLowerCase();
          if (key.includes("name") || key.includes("id"))
            return val.startsWith(lower);
          return val.includes(lower);
        })
      );
    }

    if (subjectFilter !== "all" && type === "resource") {
      result = result.filter(
        (r) => (r as CardByType["resource"]).subject_id === subjectFilter
      );
    }

    return result;
  }, [search, data, subjectFilter]);

  const [, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {/* Top bar */}
      <div className="relative flex justify-between items-center mb-3 gap-2 overflow-x-auto no-scrollbar">
        <div>
          {type === "activeSession" && lastUpdated && (
            <p className="hidden sm:inline text-xs text-textMuted transition-opacity duration-500">
              Last updated:{" "}
              {formatDistanceToNow(lastUpdated, { addSuffix: true }).replace(
                /^./,
                (c) => c.toUpperCase()
              )}
            </p>
          )}
          {type === "resource" && (
            <SubjectFilter
              subjectFilter={{
                value: subjectFilter,
                setValue: setSubjectFilter,
              }}
              subjectOptions={subjects}
            />
          )}
        </div>

        <div className="flex items-center gap-1">
          <DataSearch value={search} onChange={setSearch} />
          <DataRefresh refetch={setRefetchFlag} loading={loading} />
        </div>
      </div>

      {/* Empty / Loading / Cards */}
      {!loading && filteredData.length === 0 && (
        <EmptyGrid text={typeEmptyGridMap[type]} />
      )}
      {loading && (
        <CardsLoading
          count={filteredData.length || 6}
          layoutClassName={layoutClassName}
        />
      )}

      {!loading && (
        <div className={layoutClassName}>
          {filteredData.map((item, i) => {
            const key = getKey(item, i);

            switch (type) {
              case "activeSession":
                return (
                  <ActiveSessionCard
                    handleCardClick={() => handleCardClick?.(item)}
                    key={key}
                    session={item as CardByType["activeSession"]}
                  />
                );
              case "resource":
                return (
                  <ResourceCard
                    key={key}
                    resource={item as CardByType["resource"]}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      )}
    </section>
  );
}
