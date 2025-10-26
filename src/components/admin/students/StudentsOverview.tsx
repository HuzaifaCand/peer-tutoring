import SectionHeader from "@/components/SectionHeader";
import StudentsCount from "./StudentsCount";
import SectionDivider from "@/components/SectionDivider";

export default function StudentsOverview() {
  return (
    <main className="text-textWhite">
      <SectionHeader title="Registered Students" otherText="Username" />

      <StudentsCount />
      <SectionDivider />
    </main>
  );
}
