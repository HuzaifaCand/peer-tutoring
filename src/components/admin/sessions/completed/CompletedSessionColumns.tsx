import { TableColumn } from "@/components/table/types";
import { ComputedCompletedSessionRow } from "../../../../lib/sessions/completed/getCompletedSessions";
import { Tag } from "@/components/ui/Tag";

export const completedSessionColumns: TableColumn<ComputedCompletedSessionRow>[] =
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
      key: "subject",
      label: "Subject",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Tag
            textSize="text-[11px]"
            value={row.is_online === false ? "onsite" : "online"}
            color={row.is_online === false ? "yellow" : "blue"}
          />
          <span>{row.subject}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="">
          <Tag
            textSize="text-[11px]"
            className="mt-0.5"
            value={
              row.verified === false
                ? "rejected"
                : row.verified === true
                ? "verified"
                : "unverified"
            }
            color={
              row.verified === null
                ? "gray"
                : row.verified === true
                ? "green"
                : "red"
            }
          />
        </div>
      ),
    },

    { key: "scheduledFor", label: "Scheduled" },

    {
      key: "duration",
      label: "Duration",
      render: (row) => (
        <div
          title="Actual duration upon the expected duration of the session"
          className="flex items-center leading-tight"
        >
          <Tag
            color={
              row.actual_duration && row.expected_duration
                ? row.actual_duration / row.expected_duration < 0.6
                  ? "red"
                  : "green"
                : "muted"
            }
            value={`${row.actual_duration ?? "-"} / ${
              row.expected_duration
            } min`}
            capitalize={false}
            textSize="text-[11px]"
          />
        </div>
      ),
    },
  ];
