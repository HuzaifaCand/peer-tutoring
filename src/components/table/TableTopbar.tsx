import { activities, ActivityFilter } from "../admin/tutors/ActivityFilter";
import { GradeCounts } from "../admin/GradeCounts";
import {
  healths,
  SubjectHealthFilter,
} from "../admin/overview/SubjectHealthFilter";
import { refetchFlagType, tableTypes } from "./types";
import { Info } from "lucide-react";
import { ModeFilter, modes } from "../admin/sessions/SessionModeFilter";
import { DataSearch } from "../DataSearch";
import DataRefresh from "../DataRefresh";

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
  searchConfig,
  loadingState,
  activityFilter,
  healthFilter,
  modeFilter,
  type,
}: TopbarProps) {
  const { value, setValue, searchable } = searchConfig;
  const { loading, refetch } = loadingState;

  return (
    <div className="relative flex justify-between items-center mb-3 gap-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 flex-shrink-0">
        {gradeCounts && <GradeCounts counts={gradeCounts} loading={loading} />}

        {type.includes("Session") &&
          !type.startsWith("active") &&
          modeFilter && <ModeFilter modeFilter={modeFilter} />}
        {healthFilter && type === "subject" && (
          <SubjectHealthFilter healthFilter={healthFilter} />
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        {activityFilter && type === "tutor" && (
          <ActivityFilter activityFilter={activityFilter} />
        )}

        {searchable && (
          <div className="flex items-center gap-2">
            {type.includes("Sessions") && (
              <div title="You can search by tutor or student ID as well">
                <Info className="w-5 h-5 text-textMuted/80 hover:text-textWhite shrink-0" />
              </div>
            )}
            <DataSearch value={value} onChange={setValue} />
          </div>
        )}

        <DataRefresh refetch={refetch} loading={loading} />
      </div>
    </div>
  );
}
