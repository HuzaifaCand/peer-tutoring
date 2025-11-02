import { CardField } from "@/components/card/types";
import { ComputedActiveSessionRow } from "./getActiveSessions";
import { ElapsedTime } from "./ElapsedTime";

export const activeSessionFields: CardField<ComputedActiveSessionRow>[] = [
  // header
  {
    key: "subject",
    section: "header",
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-md bg-gray-500/20 text-gray-300 text-[12px] font-medium">
          {row.subject}
        </span>
        <span
          className={`px-2 py-0.5 rounded-md text-[12px] font-medium ${
            row.is_online
              ? "bg-blue-500/20 text-blue-300"
              : "bg-yellow-500/20 text-yellow-300"
          }`}
        >
          {row.mode}
        </span>
      </div>
    ),
  },
  {
    key: "duration_minutes",
    label: "Elapsed",
    section: "header",
    render: (row) => (
      <ElapsedTime
        start={row.start_time_iso}
        expectedMinutes={row.duration_minutes}
      />
    ),
  },

  // body — Tutor & Student
  {
    key: "tutor_name",
    label: "Tutor",
    section: "body",
  },
  {
    key: "student_name",
    label: "Student",
    section: "body",
  },

  // footer — Timing
  {
    key: "start_time",
    label: "Started",
    section: "footer",
  },

  {
    key: "duration_minutes",

    section: "footer",
    render: (row) => <span>{row.duration_minutes} mins booked</span>,
  },
];
