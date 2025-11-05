import { TableColumn } from "@/components/table/types";
import { ComputedCancelledSessionRow } from "./getCancelledSessions";
import { Tag } from "@/components/ui/Tag";

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

    { key: "subject", label: "Subject" },

    {
      key: "cancellation_source",
      label: "Mode",
      render: (row) => (
        <Tag
          value={row.cancellation_source ?? ""}
          color={
            row.cancellation_source === "timeout"
              ? "red"
              : row.cancellation_source === "manual"
              ? "yellow"
              : "gray"
          }
          textSize="text-[12px]"
        />
      ),
    },
    {
      key: "cancelled_by",
      label: "Cancelled By",
    },
    { key: "formatted_cancelled_at", label: "Cancelled At" },

    {
      key: "scheduled_for",
      label: "Scheduled",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.scheduled_for}</span>
          <Tag
            value={row.mode}
            color={row.is_online === true ? "blue" : "yellow"}
            textSize="text-[11px]"
          />
        </div>
      ),
    },
  ];
