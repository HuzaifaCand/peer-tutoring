import SectionHeader from "@/components/SectionHeader";
import SectionDivider from "@/components/SectionDivider";
import StudentsTable from "./StudentsTable";

export default async function StudentsOverview() {
  return (
    <main className="text-textWhite">
      <SectionHeader title="Registered Students" otherText="Username" />

      <StudentsTable />
      <SectionDivider />
    </main>
  );
}
