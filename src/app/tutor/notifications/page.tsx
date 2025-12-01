import NotificationsPage from "@/components/notifications/NotificationsPage";
import PageTransitionWrapper from "@/components/TransitionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function TutorNotificationPage() {
  return (
    <PageTransitionWrapper>
      <NotificationsPage />
    </PageTransitionWrapper>
  );
}
