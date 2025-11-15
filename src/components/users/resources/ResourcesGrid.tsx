"use client";

import { CardGrid } from "@/components/card/CardGrid";
import { ComputedResourceType } from "./getResources";
import { refetchFlagType } from "@/components/table/types";

interface ResourcesGridProps {
  loading: boolean;
  data: ComputedResourceType[];
  setRefetchFlag: refetchFlagType;
}

export default function ResourcesGrid({
  setRefetchFlag,
  data,
  loading,
}: ResourcesGridProps) {
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
