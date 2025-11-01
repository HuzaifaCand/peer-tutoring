import { TableColumn } from "@/components/table/types";
import { useEffect, useState } from "react";
import { Table } from "@/components/table/Table";
import {
  ComputedSubjectHealthView,
  getSubjectsHealth,
  SubjectHealthStatus,
} from "./getSubjectsHealth";
import HealthBadge from "../tutors/HealthBadge";

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
          <HealthBadge title={titles[row.health]} status={row.health} />
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
  const [data, setData] = useState<ComputedSubjectHealthView[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const formatted = await getSubjectsHealth();
      setData(formatted);
      setLoading(false);
    }

    load();
  }, [refetchFlag]);

  return (
    <section>
      <h2 className="text-2xl text-textWhite mb-4 font-semibold">
        Subjects Overview
      </h2>

      <Table
        type="subjects"
        data={data}
        columns={columns}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
      />
    </section>
  );
}
