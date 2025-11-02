import { useMemo } from "react";
import { TableRowByType } from "./types";
import { activities } from "../admin/tutors/ActivityFilter";
import { ComputedTutorRow } from "../admin/tutors/getTutors";
import { healths } from "../admin/overview/SubjectHealthFilter";
import { ComputedSubjectHealthView } from "../admin/overview/getSubjectsHealth";
import { modes } from "../admin/sessions/SessionModeFilter";
import { ComputedCompletedSessionRow } from "../admin/sessions/completed/getCompletedSessions";
import { ComputedScheduledSessionRow } from "../admin/sessions/scheduled/getScheduledSessions";

export function useFilteredTableData<K extends keyof TableRowByType>(
  type: K,
  data: TableRowByType[K][],
  search: string,
  activityFilter?: activities,
  subjectHealthFilter?: healths,
  modeFilter?: modes
) {
  return useMemo(() => {
    let filtered = data;

    // tutor-specific filter
    if (type === "tutors") {
      const tutors = data as ComputedTutorRow[];
      if (activityFilter !== "all") {
        filtered = tutors.filter((row) => {
          const isActive = row.unavailable_slots > 0;
          return activityFilter === "active" ? isActive : !isActive;
        }) as TableRowByType[K][];
      }
    }
    if (
      type === "subjects" &&
      subjectHealthFilter &&
      subjectHealthFilter !== "all"
    ) {
      filtered = (data as ComputedSubjectHealthView[]).filter(
        (row) => row.health === subjectHealthFilter
      ) as TableRowByType[K][];
    }

    if (
      (type === "scheduledSessions" || type === "completedSessions") &&
      modeFilter &&
      modeFilter !== "all"
    ) {
      filtered = (
        data as ComputedCompletedSessionRow[] | ComputedScheduledSessionRow[]
      ).filter(
        (row) => (row.is_online === false ? "onsite" : "online") === modeFilter
      ) as TableRowByType[K][];
    }

    // universal search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.entries(row).some(([key, value]) => {
          const val = String(value).toLowerCase();
          if (key.includes("name") || key.includes("id")) {
            return val.startsWith(lower);
          }
          if (key === "grade") return val === lower;
          return val.includes(lower);
        })
      );
    }

    return filtered;
  }, [data, type, search, activityFilter, subjectHealthFilter, modeFilter]);
}
