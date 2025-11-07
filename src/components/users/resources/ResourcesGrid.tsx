"use client";

import { useDataFetch } from "@/hooks/useDataFetch";
import { getResources } from "./getResources";
import { CardGrid } from "@/components/card/CardGrid";

export default function ResourcesGrid() {
  const { data, loading, setRefetchFlag } = useDataFetch(getResources);

  return (
    <CardGrid
      data={data}
      type="resource"
      layoutClassName="flex flex-col gap-3"
      loading={loading}
      setRefetchFlag={setRefetchFlag}
    />
  );
}
