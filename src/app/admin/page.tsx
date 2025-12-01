import OverviewPage from "@/components/admin/overview/OverviewPage";
import PageTransitionWrapper from "@/components/TransitionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Overview",
};
export default function AdminPage() {
  return (
    <PageTransitionWrapper>
      <OverviewPage />
    </PageTransitionWrapper>
  );
}
