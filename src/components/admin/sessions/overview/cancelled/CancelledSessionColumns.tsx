import { TableColumn } from "@/components/table/types";
import { ComputedCancelledSessionRow } from "./getCancelledSessions";

export const cancelledSessionColumns: TableColumn<ComputedCancelledSessionRow>[] =
  [
    {
      key: "tutor_name",
      label: "Tutor",
      render: (row) => (
        <div className="ml-3">
          <span>{row.tutor_name}</span>
          <span className="hidden">{row.tutor_id}</span>
        </div>
      ),
    },
    {
      key: "student_name",
      label: "Student",
      render: (row) => (
        <div>
          <span>{row.student_name}</span>
          <span className="hidden">{row.student_id}</span>
        </div>
      ),
    },

    {
      key: "cancel_reason",
      label: "Reason",

      truncate: true,
    },

    { key: "scheduled_for", label: "Date" },

    { key: "subject", label: "Subject" },
  ];
