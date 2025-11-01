import { TableColumn } from "@/components/table/types";
import { ComputedCompletedSessionRow } from "./getCompletedSessions";
import VerificationBadge from "../../tutors/VerificationBadge";

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

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className={`${
              row.is_online ? "bg-blue-500" : "bg-yellow-300"
            } w-1 h-1 rounded-full mt-0.5`}
          />
          <VerificationBadge
            type="completedSessions"
            status={
              row.verified === null
                ? "unverified"
                : row.verified === true
                ? "verified"
                : "rejected"
            }
            title={row.verified === false ? `${row.rejection_reason}` : ""}
          />
        </div>
      ),
    },
    { key: "scheduled_for", label: "Date" },

    { key: "subject", label: "Subject" },
  ];
