import { TableColumn } from "@/components/table/types";
import { ComputedCompletedSessionRow } from "./getCompletedSessions";
import { Tag } from "@/components/Tag";

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
    {
      key: "duration",
      label: "Duration",
      render: (row) => (
        <div
          title="Actual duration upon the expected duration of the session"
          className="flex items-center leading-tight"
        >
          <span>{row.actual_duration ?? "-"}/</span>
          <span>{row.expected_duration} min</span>
        </div>
      ),
    },

    { key: "scheduled_for", label: "Date" },

    { key: "subject", label: "Subject" },
    {
      key: "is_online",
      label: "Type",
      render: (row) => (
        <div className="">
          <Tag
            textSize="text-[11px]"
            className="mt-0.5"
            value={row.is_online === false ? "onsite" : "online"}
            color={row.is_online === false ? "yellow" : "blue"}
          />
        </div>
      ),
    },
  ];
