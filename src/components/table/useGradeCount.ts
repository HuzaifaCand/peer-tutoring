import { useMemo } from "react";
import { TableRowByType } from "./types";
import { ComputedTutorRow } from "../admin/tutors/getTutors";
import { ComputedStudentRow } from "../admin/students/getStudents";

export function useGradeCounts<K extends keyof TableRowByType>(
  type: K,
  data: TableRowByType[K][]
) {
  return useMemo(() => {
    if (type === "tutor" || type === "student") {
      const typedData = data as (ComputedStudentRow | ComputedTutorRow)[];
      const asCount = typedData.filter((r) => r.grade === "AS").length;
      const a2Count = typedData.filter((r) => r.grade === "A2").length;
      return { as: asCount, a2: a2Count };
    }
    return undefined;
  }, [data, type]);
}
