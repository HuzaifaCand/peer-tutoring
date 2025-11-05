import CancelledSessions from "@/components/admin/sessions/cancelled/CancelledSessions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Cancelled Sessions",
};

export default function CancelledSessionsPage() {
  return <CancelledSessions />;
}
