import { useMemo } from "react";
import { TableRowByType } from "./types";
import { availabilities } from "./AvailabilityFilter";
import { ComputedTutorRow } from "../admin/tutors/getTutors";
import { healths } from "./SubjectHealthFilter";
import { ComputedSubjectHealthView } from "../admin/overview/getSubjectsHealth";

export function useFilteredTableData<K extends keyof TableRowByType>(
  type: K,
  data: TableRowByType[K][],
  search: string,
  availabilityFilter?: availabilities,
  subjectHealthFilter?: healths
) {
  return useMemo(() => {
    let filtered = data;

    // tutor-specific filter
    if (type === "tutors") {
      const tutors = data as ComputedTutorRow[];
      if (availabilityFilter !== "all") {
        filtered = tutors.filter((row) => {
          const isActive = row.unavailable_slots > 0;
          return availabilityFilter === "active" ? isActive : !isActive;
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

    // universal search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.entries(row).some(([key, value]) => {
          const val = String(value).toLowerCase();
          if (key === "full_name") return val.startsWith(lower);
          if (key === "grade") return val === lower;
          return val.includes(lower);
        })
      );
    }

    return filtered;
  }, [data, type, search, availabilityFilter, subjectHealthFilter]);
}
