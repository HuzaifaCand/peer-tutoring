import NotificationsPage from "@/components/users/notifications/NotificationsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function TutorNotificationPage() {
  return <NotificationsPage />;
}
