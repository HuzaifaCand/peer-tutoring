import SectionHeader from "@/components/SectionHeader";
import StudentsTable from "./StudentsTable";

export default async function StudentsOverview() {
  return (
    <main className="text-textWhite">
      <SectionHeader title="Registered Students" otherText="Username" />

      <StudentsTable />
    </main>
  );
}
