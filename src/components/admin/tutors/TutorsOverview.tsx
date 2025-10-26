import SectionDivider from "@/components/SectionDivider";
import SectionHeader from "@/components/SectionHeader";
import TutorsCount from "./TutorsCount";

export default function TutorsOverview() {
  return (
    <main className="text text-textWhite">
      <SectionHeader title="Registered Tutors" otherText="Username" />
      <TutorsCount />
      <SectionDivider />
    </main>
  );
}
