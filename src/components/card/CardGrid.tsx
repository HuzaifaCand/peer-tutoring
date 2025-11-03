"use client";

import { useEffect, useMemo, useState } from "react";
import { CardGridProps, CardByType } from "./types";
import { CardsLoading } from "./CardsLoading";
import { DataSearch } from "../DataSearch";
import { EmptyGrid } from "./EmptyCardGrid";
import DataRefresh from "../DataRefresh";
import { formatDistanceToNow } from "date-fns";
import { ActiveSessionCard } from "./ActiveSessionCard"; // import our new card

export function CardGrid<K extends keyof CardByType>({
  type,
  lastUpdated,
  data,
  loading = false,
  layoutClassName = "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
  setRefetchFlag,
  getKey = (_, i) => i,
  handleCardClick,
}: CardGridProps<K>) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();

    return data.filter((row) =>
      Object.entries(row as Record<string, unknown>).some(([key, value]) => {
        const val = String(value ?? "").toLowerCase();
        if (key.includes("name") || key.includes("id"))
          return val.startsWith(lower);
        return val.includes(lower);
      })
    );
  }, [search, data]);

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
        </div>

        <div className="flex items-center gap-1">
          <DataSearch value={search} onChange={setSearch} />
          <DataRefresh refetch={setRefetchFlag} loading={loading} />
        </div>
      </div>

      {/* Empty / Loading / Cards */}
      {!loading && filteredData.length === 0 && <EmptyGrid />}
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
                    handleCardClick={() =>
                      handleCardClick?.(item as CardByType["activeSession"])
                    }
                    key={key}
                    session={item as CardByType["activeSession"]}
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
