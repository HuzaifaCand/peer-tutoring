import CompletedSessions from "@/components/admin/sessions/completed/CompletedSessions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Completed Sessions",
};

export default function CompletedSessionsPage() {
  return <CompletedSessions />;
}
