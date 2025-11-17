import { TableColumn } from "@/components/table/types";
import { Tag } from "@/components/ui/Tag";
import { ComputedEditRequest } from "./getEditRequests";

export const EditRequestColumns: TableColumn<ComputedEditRequest>[] = [
  {
    key: "s_id",
    label: "ID",
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="ml-3">{row.student_id}</span>
      </div>
    ),
  },
  {
    key: "username",
    label: "Name",
    render: (row) => (
      <div className="flex items-center gap-2">
        <span>{row.username}</span>
        <Tag
          value={row.role || ""}
          color={row.role === "tutor" ? "blue" : "yellow"}
          textSize="text-[10px]"
        />
      </div>
    ),
  },
  { key: "type", label: "Type" },
  { key: "request", label: "Request", truncate: true },
  {
    key: "approved",
    label: "Status",
    render: (row) => (
      <Tag
        textSize="text-[11px]"
        value={
          row.approved === false
            ? "rejected"
            : row.approved !== true
            ? "unverified"
            : ""
        }
        color={
          row.approved === null
            ? "gray"
            : row.approved === true
            ? "invisible"
            : "red"
        }
      />
    ),
  },
  { key: "created_when", label: "Requested" },
];
