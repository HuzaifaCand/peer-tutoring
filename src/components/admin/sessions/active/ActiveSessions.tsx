import ActiveSessionsList from "@/components/admin/sessions/active/ActiveSessionsGrid";
import SectionHeader from "@/components/SectionHeader";

export default function ActiveSessions() {
  return (
    <main>
      <SectionHeader title="Active Sessions" />
      <ActiveSessionsList />
    </main>
  );
}
