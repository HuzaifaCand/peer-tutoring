import CancelledSessions from "@/components/admin/sessions/cancelled/CancelledSessions";
import PageTransitionWrapper from "@/components/TransitionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Cancelled Sessions",
};

export default function CancelledSessionsPage() {
  return (
    <PageTransitionWrapper>
      <CancelledSessions />
    </PageTransitionWrapper>
  );
}
