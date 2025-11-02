"use client";

import { useMemo, useState } from "react";
import { Card } from "./Card";
import { CardsLoading } from "./CardsLoading";
import { CardByType, CardGridProps } from "./types";
import { DataSearch } from "../DataSearch";
import { EmptyTableGrid } from "./EmptyCardGrid";
import DataRefresh from "../DataRefresh";

export function CardGrid<K extends keyof CardByType>({
  type,
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

  return (
    <section>
      <div className="relative flex justify-between items-center mb-3 gap-2 overflow-x-auto no-scrollbar">
        <div />
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
