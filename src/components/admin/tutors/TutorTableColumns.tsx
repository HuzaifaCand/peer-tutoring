import VerificationBadge from "@/components/admin/tutors/VerificationBadge";
import { GradeBadge } from "@/components/table/GradeBadge";
import { TableColumn } from "@/components/table/types";
import { ComputedTutorRow } from "./getTutors";

export type verificationStatus = "verified" | "rejected" | "unverified";

export const tutorColumns: TableColumn<ComputedTutorRow>[] = [
  {
    key: "id",
    label: "ID",
    render: (row) => (
      <div className="flex items-center gap-2">
        <span
          className={`h-1 w-1 rounded-full ${
            row.admin_seen === false ? "bg-yellow-400" : "invisible"
          }`}
        />
        <span>{row.id}</span>
        <GradeBadge grade={row.grade} />
        <VerificationBadge
          type="tutors"
          title={`Status: ${row.verified}`}
          status={
            row.verified === null
              ? "unverified"
              : row.verified === true
              ? "verified"
              : "rejected"
          }
        />
      </div>
    ),
  },
  {
    key: "full_name",
    label: "Name ",
  },
  { key: "subjects", label: "Subjects" },

  {
    key: "available_slots",
    label: "Available Slots",
    render: (row) => (
      <div
        title={`${
          row.unavailable_slots > 0
            ? `Active: ${row.unavailable_slots}/${
                row.available_slots + row.unavailable_slots
              } slots booked`
            : "Inactive: No slots booked"
        }`}
        className="flex items-center gap-2"
      >
        <span>{row.available_slots}</span>

        <span
          className={`h-2 w-2 rounded-full ${
            row.unavailable_slots > 0 ? "bg-green-300" : "bg-red-400"
          }`}
        />
      </div>
    ),
  },
];
