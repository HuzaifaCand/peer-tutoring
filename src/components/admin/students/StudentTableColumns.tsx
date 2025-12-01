import { TableColumn } from "@/components/table/types";
import { ComputedStudentRow } from "../../../lib/users/getStudents";
import { Tag } from "@/components/ui/Tag";

export const studentColumns: TableColumn<ComputedStudentRow>[] = [
  {
    key: "studentId",
    label: "ID",
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="ml-3">{row.studentId}</span>
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
    key: "name",
    label: "Name",
  },
  { key: "subjectsList", label: "Subjects" },
];
