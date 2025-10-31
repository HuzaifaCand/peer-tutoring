import { availabilities, AvailabilityFilter } from "./AvailabilityFilter";
import { GradeCounts } from "./GradeCounts";
import { TableSearch } from "./TableSearch";
import { refetchFlagType, tableTypes } from "./types";
import { Info, RefreshCcw } from "lucide-react";

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
  gradeCounts?: { as: number; a2: number } | null;
  rowCount: number;
  type: tableTypes;
  availabilityFilter?: {
    value: availabilities;
    setValue: (v: availabilities) => void;
  };
}

export function TableTopbar({
  gradeCounts,
  rowCount,
  searchConfig,
  loadingState,
  availabilityFilter,
  type,
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
        {type === "cancelledSessions" && (
          <p className="text-xs text-textMuted">{rowCount} rows shown</p>
        )}
      </div>

      <div className="flex items-center gap-2 mb-1">
        {availabilityFilter && type === "tutors" && (
          <AvailabilityFilter availabilityFilter={availabilityFilter} />
        )}
        {searchable && (
          <div className="flex items-center gap-2">
            {type.includes("Sessions") && (
              <div title="You can search by tutor or student id as well">
                <Info className="w-5 h-5 text-textMuted/80 hover:text-textWhite" />
              </div>
            )}
            <TableSearch value={value} onChange={setValue} />
          </div>
        )}

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
