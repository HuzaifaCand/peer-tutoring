import { TableColumn } from "@/components/table/types";
import { ComputedScheduledSessionRow } from "./getScheduledSessions";
import VerificationBadge from "../../tutors/VerificationBadge";

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

    {
      key: "is_online",
      label: "Type",
    },
    { key: "scheduled_for", label: "Date" },

    { key: "subject", label: "Subject" },
  ];
