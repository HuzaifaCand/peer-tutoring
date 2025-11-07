import SectionHeader from "@/components/ui/SectionHeader";
import { Plus } from "lucide-react";
import ResourcesGrid from "./ResourcesGrid";

export default function ResourcesPageComponent() {
  return (
    <main>
      <SectionHeader
        title="Resource Library"
        rightSlot={
          <div
            title="Share Resource"
            className="p-1.5 border border-white/10 flex items-center justify-center rounded-full hover:bg-elevatedBg bg-hoverBg transition-colors duration-200 hover:cursor-pointer"
          >
            <Plus className="font-bold text-textButton w-4 h-4" />
          </div>
        }
        becomesCol={false}
      />
      <ResourcesGrid />
    </main>
  );
}
