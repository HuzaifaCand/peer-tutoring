import SectionHeader from "@/components/SectionHeader";
import SessionsChart from "./SessionsChart";
import SectionDivider from "@/components/SectionDivider";
import CancelledSessionsTable from "./cancelled/CancelledSessions";

export default function SessionsOverview() {
  return (
    <main>
      <SectionHeader title="Sessions Overview" />
      <SessionsChart />
      <SectionDivider />
      <CancelledSessionsTable />
    </main>
  );
}
