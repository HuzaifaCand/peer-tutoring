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
  availabilityFilter?: {
    value: "all" | "active" | "inactive";
    setValue: (v: "all" | "active" | "inactive") => void;
  };
}

export function TableTopbar({
  gradeCounts,
  searchConfig,
  loadingState,
  availabilityFilter,
}: TopbarProps) {
  const { value, setValue, searchable } = searchConfig;
  const { loading, refetch } = loadingState;

  const handleRefresh = () => {
    if (!loading) refetch((prev: boolean) => !prev);
  };

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
        {gradeCounts && <GradeCounts counts={gradeCounts} loading={loading} />}
      </div>

      <div className="flex items-center gap-2 mb-1">
        {availabilityFilter && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {["active", "inactive"].map((key) => {
                const active = availabilityFilter.value === key;
                const label = key === "active" ? "Active" : "Inactive";
                const color =
                  key === "active"
                    ? "bg-green-500/20 text-green-300 border-green-400/20"
                    : "bg-red-500/20 text-red-300 border-red-400/20";

                return (
                  <button
                    key={key}
                    onClick={() =>
                      availabilityFilter.setValue(
                        active ? "all" : (key as "active" | "inactive")
                      )
                    }
                    className={`px-3 py-1 text-xs rounded-md border transition
              ${
                active
                  ? `${color} font-semibold`
                  : "bg-elevatedBg/50 text-textWhite/70 border-white/10 hover:bg-elevatedBg/70"
              }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
            className={`w-4 h-4 ${
              loading ? "animate-spin text-textWhite/70" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
