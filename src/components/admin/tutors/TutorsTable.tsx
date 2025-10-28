import { Table } from "@/components/table/Table";
import { getTutors } from "./data";
import { tutorUserColumns } from "@/lib/views";

export default async function TutorsTable() {
  const formatted = await getTutors();

  return <Table data={formatted} columns={tutorUserColumns} />;
}
