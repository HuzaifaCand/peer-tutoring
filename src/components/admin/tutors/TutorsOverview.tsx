import SectionDivider from "@/components/SectionDivider";
import SectionHeader from "@/components/SectionHeader";
import TutorsTable from "./TutorsTable";

export default function TutorsOverview() {
  return (
    <main className="text text-textWhite">
      <SectionHeader title="Registered Tutors" otherText="Username" />
      <TutorsTable />
      <SectionDivider />
    </main>
  );
}
