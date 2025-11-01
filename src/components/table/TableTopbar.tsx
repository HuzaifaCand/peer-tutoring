import { activities, ActivityFilter } from "../admin/tutors/ActivityFilter";
import { GradeCounts } from "../admin/GradeCounts";
import {
  healths,
  SubjectHealthFilter,
} from "../admin/overview/SubjectHealthFilter";
import { TableSearch } from "./TableSearch";
import { refetchFlagType, tableTypes } from "./types";
import { Info, RefreshCcw } from "lucide-react";
import { ModeFilter, modes } from "../admin/sessions/SessionModeFilter";

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
  activityFilter?: {
    value: activities;
    setValue: (v: activities) => void;
  };
  healthFilter?: {
    value: healths;
    setValue: (h: healths) => void;
  };
  modeFilter?: {
    value: modes;
    setValue: (h: modes) => void;
  };
}

export function TableTopbar({
  gradeCounts,
  rowCount,
  searchConfig,
  loadingState,
  activityFilter,
  healthFilter,
  modeFilter,
  type,
}: TopbarProps) {
  const { value, setValue, searchable } = searchConfig;
  const { loading, refetch } = loadingState;

  const handleRefresh = () => {
    if (!loading) refetch((prev: boolean) => !prev);
  };

  return (
    <div className="relative flex justify-between items-center mb-3 gap-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 flex-shrink-0">
        {gradeCounts && <GradeCounts counts={gradeCounts} loading={loading} />}
        {type === "cancelledSessions" && (
          <p className="text-xs text-textMuted whitespace-nowrap">
            {rowCount} rows shown
          </p>
        )}
        {(type === "scheduledSessions" || type === "completedSessions") &&
          modeFilter && <ModeFilter modeFilter={modeFilter} />}
        {healthFilter && type === "subjects" && (
          <SubjectHealthFilter healthFilter={healthFilter} />
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        {activityFilter && type === "tutors" && (
          <ActivityFilter activityFilter={activityFilter} />
        )}

        {searchable && (
          <div className="flex items-center gap-2">
            {type.includes("Sessions") && (
              <div title="You can search by tutor or student ID as well">
                <Info className="w-5 h-5 text-textMuted/80 hover:text-textWhite shrink-0" />
              </div>
            )}
            <TableSearch value={value} onChange={setValue} />
          </div>
        )}

        <button
          onClick={handleRefresh}
          title="Refresh data"
          disabled={loading}
          className={`p-2 rounded-md transition active:scale-95 flex-shrink-0 ${
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
