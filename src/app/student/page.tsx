import PageTransitionWrapper from "@/components/TransitionWrapper";
import UserOverview from "@/components/users/UserOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Dashboard",
};
export default function StudentDashboard() {
  return (
    <PageTransitionWrapper>
      <UserOverview role="student" />
    </PageTransitionWrapper>
  );
}
