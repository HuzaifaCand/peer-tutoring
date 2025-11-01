import ScheduledSessions from "@/components/admin/sessions/scheduled/ScheduledSessions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Scheduled Sessions",
};

export default function ScheduledSessionsPage() {
  return <ScheduledSessions />;
}
