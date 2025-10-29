import { GradeCounts } from "./GradeCounts";
import { TableSearch } from "./TableSearch";
import { refetchFlagType } from "./types";
import { RefreshCcw } from "lucide-react";

interface TopbarProps {
  searchConfig: {
    value: string;
    setValue: (s: string) => void;
    searchable: boolean;
  };
  loadingState: {
    loading: boolean;
    refetch: refetchFlagType;
  };
  gradeCounts: { as: number; a2: number } | null;
}

export function TableTopbar({
  gradeCounts,
  searchConfig,
  loadingState,
}: TopbarProps) {
  const { value, setValue, searchable } = searchConfig;
  const { loading, refetch } = loadingState;

  const handleRefresh = () => {
    if (!loading) refetch((prev: boolean) => !prev);
  };

  return (
    <div className="flex justify-between items-center mb-3">
      {gradeCounts && <GradeCounts counts={gradeCounts} loading={loading} />}

      <div className="flex items-center gap-2 mb-3">
        {searchable && <TableSearch value={value} onChange={setValue} />}

        <button
          onClick={handleRefresh}
          title="Refresh data"
          disabled={loading}
          className={`p-2 rounded-md transition active:scale-95 
            ${
              loading
                ? "bg-elevatedBg/30 cursor-not-allowed opacity-60"
                : "bg-elevatedBg/50 hover:bg-elevatedBg text-textWhite/90 hover:text-textButton"
            }`}
        >
          <RefreshCcw
            className={`w-5 h-5 ${
              loading ? "animate-spin text-textWhite/70" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
