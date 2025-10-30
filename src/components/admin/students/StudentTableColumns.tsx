import { TableColumn } from "@/components/table/types";
import { ComputedStudentRow } from "./getStudents";
import { GradeBadge } from "@/components/table/GradeBadge";

export const studentColumns: TableColumn<ComputedStudentRow>[] = [
  {
    key: "id",
    label: "ID",
    width: 80,
    render: (row) => (
      <div className="flex items-center gap-2">
        <span
          className={`h-1 w-1 rounded-full ${
            row.admin_seen === false ? "bg-yellow-400" : "invisible"
          }`}
        />
        <span>{row.id}</span>
        <GradeBadge grade={row.grade} />
      </div>
    ),
  },

  {
    key: "full_name",
    label: "Name",
    width: 120,
  },
  { key: "subjects", label: "Subjects", width: 150 },
];
