"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { Plus } from "lucide-react";
import ResourcesGrid from "./ResourcesGrid";
import { useState } from "react";
import { AddResourceModal } from "./AddResourceModal";
import { useDataFetch } from "@/hooks/useDataFetch";
import { getResources } from "./getResources";

export default function ResourcesPageComponent() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, loading, setRefetchFlag } = useDataFetch(getResources);

  return (
    <main>
      <AddResourceModal
        setRefetchFlag={setRefetchFlag}
        open={showAddModal}
        closeModal={() => setShowAddModal(false)}
      />

      <SectionHeader
        title="Resource Library"
        rightSlot={
          <div
            onClick={() => setShowAddModal(true)}
            title="Share Resource"
            className="p-1.5 border border-white/10 flex items-center justify-center rounded-full hover:bg-elevatedBg bg-hoverBg transition-colors duration-200 hover:cursor-pointer"
          >
            <Plus className="font-bold text-textButton w-4 h-4" />
          </div>
        }
        becomesCol={false}
      />
      <ResourcesGrid
        data={data}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
      />
    </main>
  );
}
