import { TableColumn } from "@/components/table/types";
import { ComputedActiveSessionRow } from "./getActiveSessions";

export const activeSessionColumns: TableColumn<ComputedActiveSessionRow>[] = [
  {
    key: "tutor_name",
    label: "Tutor",
    render: (row) => (
      <div className="flex ml-3 items-center gap-1">
        <span>{row.tutor_name}</span>
        <span className="hidden">{row.tutor_id}</span>
      </div>
    ),
  },
  {
    key: "student_name",
    label: "Student",
    render: (row) => (
      <div className="flex items-center gap-1">
        <span>{row.student_name}</span>
        <span className="hidden">{row.student_id}</span>
      </div>
    ),
  },
  { key: "scheduled_for", label: "Date" },

  { key: "subject", label: "Subject" },
];
