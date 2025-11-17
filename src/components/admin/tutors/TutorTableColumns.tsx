import { TableColumn } from "@/components/table/types";
import { ComputedTutorRow } from "../../../lib/users/getTutors";
import { Tag } from "@/components/ui/Tag";

export const tutorColumns: TableColumn<ComputedTutorRow>[] = [
  {
    key: "s_id",
    label: "ID",
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="ml-3">{row.s_id}</span>
        <div className="space-x-1">
          <Tag
            textSize="text-[10px]"
            value={row.grade}
            color={row.grade === "AS" ? "blue" : "yellow"}
            className="leading-tight"
          />
          <Tag
            textSize="text-[10px]"
            value={
              row.verified === false
                ? "rejected"
                : row.verified !== true
                ? "unverified"
                : ""
            }
            color={
              row.verified === null
                ? "gray"
                : row.verified === true
                ? "invisible"
                : "red"
            }
          />
        </div>
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
