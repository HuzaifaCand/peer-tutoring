import { Table } from "@/components/table/Table";
import { getStudents } from "../students/data";
import { studentUserColumns } from "@/lib/types/views";

export default async function StudentsTable() {
  const formatted = await getStudents();

  return <Table data={formatted} columns={studentUserColumns} />;
}
