import SessionsOverview from "@/components/admin/sessions/overview/SessionsOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Sessions | Overview",
};

export default function SessionsPage() {
  return <SessionsOverview />;
}
