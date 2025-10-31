import { TableColumn } from "@/components/table/types";
import { ComputedCancelledSessionRow } from "./getCancelledSessions";

export const cancelledSessionColumns: TableColumn<ComputedCancelledSessionRow>[] =
  [
    {
      key: "tutor_name",
      label: "Tutor",
      width: 100,
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
      width: 100,
      render: (row) => (
        <div className="flex items-center gap-1">
          <span>{row.student_name}</span>
          <span className="hidden">{row.student_id}</span>
        </div>
      ),
    },

    {
      key: "cancel_reason",
      label: "Reason",
      width: 130,

      truncate: true,
    },

    { key: "scheduled_when", label: "Date", width: 80 },

    { key: "subject", label: "Subject", width: 90 },
  ];
