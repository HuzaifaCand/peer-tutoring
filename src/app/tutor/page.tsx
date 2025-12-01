import PageTransitionWrapper from "@/components/TransitionWrapper";
import UserOverview from "@/components/users/UserOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Dashboard",
};
export default function TutorDashboard() {
  return (
    <PageTransitionWrapper>
      <UserOverview role="tutor" />
    </PageTransitionWrapper>
  );
}
