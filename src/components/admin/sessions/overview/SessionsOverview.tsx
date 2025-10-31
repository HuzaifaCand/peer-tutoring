import SectionHeader from "@/components/SectionHeader";
import SessionsChart from "./SessionsChart";
import SectionDivider from "@/components/SectionDivider";
import CancelledSessionsTable from "./cancelled/CancelledSessions";
import OperationalStats from "../../../OperationalStats";

export default function SessionsOverview() {
  return (
    <main>
      <SectionHeader title="Sessions Overview" />
      <OperationalStats
        config={{
          activeSessions: true,
          pendingSessionVerifications: true,
          scheduledSessions: true,
        }}
      />
      <SectionDivider />
      <CancelledSessionsTable />
      <SectionDivider />
      <SessionsChart />
    </main>
  );
}
