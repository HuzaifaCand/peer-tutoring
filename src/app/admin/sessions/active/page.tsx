import ActiveSessions from "@/components/admin/sessions/active/ActiveSessions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Active Sessions",
};

export default function ActiveSessionsPage() {
  return <ActiveSessions />;
}
