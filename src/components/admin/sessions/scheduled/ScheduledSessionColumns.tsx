import { TableColumn } from "@/components/table/types";
import { ComputedScheduledSessionRow } from "../../../../lib/sessions/scheduled/getScheduledSessions";
import { Tag } from "@/components/ui/Tag";

export const scheduledSessionColumns: TableColumn<ComputedScheduledSessionRow>[] =
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

    { key: "scheduled_for", label: "Scheduled" },
    {
      key: "duration_minutes",
      label: "Expected Duration",
      render: (row) => <span>{row.duration_minutes + " mins"}</span>,
    },

    { key: "subject", label: "Subject" },
    {
      key: "is_online",
      label: "Mode",
      render: (row) => (
        <Tag
          textSize="text-[11px]"
          className="mt-0.5"
          value={row.is_online === false ? "onsite" : "online"}
          color={row.is_online === false ? "yellow" : "blue"}
        />
      ),
    },
  ];
