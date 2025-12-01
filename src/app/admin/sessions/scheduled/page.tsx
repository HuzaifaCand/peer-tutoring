import ScheduledSessions from "@/components/admin/sessions/scheduled/ScheduledSessions";
import PageTransitionWrapper from "@/components/TransitionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Scheduled Sessions",
};

export default function ScheduledSessionsPage() {
  return (
    <PageTransitionWrapper>
      <ScheduledSessions />
    </PageTransitionWrapper>
  );
}
