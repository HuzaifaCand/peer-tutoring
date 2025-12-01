import CompletedSessions from "@/components/admin/sessions/completed/CompletedSessions";
import PageTransitionWrapper from "@/components/TransitionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Completed Sessions",
};

export default function CompletedSessionsPage() {
  return (
    <PageTransitionWrapper>
      <CompletedSessions />
    </PageTransitionWrapper>
  );
}
