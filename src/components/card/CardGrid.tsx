"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "./Card";
import { CardsLoading } from "./CardsLoading";
import { CardByType, CardGridProps } from "./types";
import { DataSearch } from "../DataSearch";
import { EmptyTableGrid } from "./EmptyCardGrid";
import DataRefresh from "../DataRefresh";
import { formatDistanceToNow } from "date-fns";

export function CardGrid<K extends keyof CardByType>({
  type,
  lastUpdated,
  data,
  fields,
  loading = false,
  layoutClassName = "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
  setRefetchFlag,
  getKey = (_, i) => i,
}: CardGridProps<CardByType[K]> & { type: K }) {
  const [search, setSearch] = useState("");
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      Object.entries(row).some(([key, value]) => {
        const val = String(value).toLowerCase();
        if (key.includes("name") || key.includes("id")) {
          return val.startsWith(lower);
        }
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
      <div className="relative flex justify-between items-center mb-3 gap-2 overflow-x-auto no-scrollbar">
        <div>
          {type === "activeSessions" && lastUpdated && (
            <p className="text-xs text-textMuted transition-opacity duration-500">
              Last updated:{" "}
              {formatDistanceToNow(lastUpdated, { addSuffix: true })
                .slice(0, 1)
                .toUpperCase() +
                formatDistanceToNow(lastUpdated, { addSuffix: true }).slice(1)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DataSearch value={search} onChange={setSearch} />
          <DataRefresh refetch={setRefetchFlag} loading={loading} />
        </div>
      </div>
      {!loading && filteredData.length === 0 && <EmptyTableGrid />}
      {loading && (
        <CardsLoading
          count={filteredData.length || 6}
          layoutClassName={layoutClassName}
        />
      )}
      {!loading && (
        <div className={layoutClassName}>
          {filteredData.map((item, i) => (
            <Card key={getKey(item, i)} data={item} fields={fields} />
          ))}
        </div>
      )}
    </section>
  );
}
