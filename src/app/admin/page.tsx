import OverviewPage from "@/components/admin/overview/OverviewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PeerLink | Admin Dashboard",
};
export default function AdminPage() {
  return <OverviewPage />;
}
