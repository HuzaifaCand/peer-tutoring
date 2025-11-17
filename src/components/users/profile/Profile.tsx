import SectionHeader from "@/components/ui/SectionHeader";

export default function Profile({ role }: { role: "student" | "tutor" }) {
  return (
    <main>
      <SectionHeader title="Profile" />
    </main>
  );
}
