import { TableColumn } from "@/components/table/types";
import { ComputedStudentRow } from "./getStudents";
import { Tag } from "@/components/ui/Tag";

export const studentColumns: TableColumn<ComputedStudentRow>[] = [
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
        <Tag
          textSize="text-[10px]"
          value={row.grade}
          color={row.grade === "AS" ? "blue" : "yellow"}
          className="leading-tight"
        />
      </div>
    ),
  },

  {
    key: "full_name",
    label: "Name",
  },
  { key: "subjects", label: "Subjects" },
];
