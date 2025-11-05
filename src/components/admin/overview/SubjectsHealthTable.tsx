import { TableColumn } from "@/components/table/types";
import { Table } from "@/components/table/Table";
import {
  ComputedSubjectHealthView,
  getSubjectsHealth,
  SubjectHealthStatus,
} from "./getSubjectsHealth";
import { Tag } from "@/components/ui/Tag";
import { useDataFetch } from "@/hooks/useDataFetch";

export const titles: Record<SubjectHealthStatus, string> = {
  healthy: "Good Student-Teacher Ratio",
  "low-supply": "Lack of sufficient teachers for this subject",
  oversupply: "Not enough students for this subject; too many teachers",
};
const columns: TableColumn<ComputedSubjectHealthView>[] = [
  {
    key: "subject",
    label: "Subject",
    render: (row) => (
      <div className="ml-3">
        <span>{row.subject}</span>
        <span className="ml-2">
          <Tag
            textSize="text-[10px]"
            className="mt-0.5"
            title={titles[row.health]}
            value={row.health}
            color={
              row.health === "healthy"
                ? "green"
                : row.health === "low-supply"
                ? "red"
                : "yellow"
            }
          />
        </span>
      </div>
    ),
  },
  {
    key: "tutors",
    label: "Tutors",
  },
  {
    key: "students",
    label: "Students",
  },
];

export default function SubjectsHealthTable() {
  const { data, loading, setRefetchFlag } = useDataFetch(getSubjectsHealth);

  return (
    <section>
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-2xl text-textWhite font-semibold">
          Subjects Overview
        </h2>
        <p className="text-textMuted text-xs">Total Sessions: {data.length}</p>
      </div>
      <Table
        type="subject"
        data={data}
        columns={columns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
      />
    </section>
  );
}
