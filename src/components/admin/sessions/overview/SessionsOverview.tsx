import SectionHeader from "@/components/ui/SectionHeader";
import SessionsChart from "./SessionsChart";
import SectionDivider from "@/components/ui/SectionDivider";
import CancelledSessionsTable from "./cancelled/CancelledSessions";
import OperationalStats from "../../../OperationalStats";
import SubjectsPopularityGraph from "./SubjectsPopularityGraph";

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
      <SectionDivider />
      <SubjectsPopularityGraph />
    </main>
  );
}
