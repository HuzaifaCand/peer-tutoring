import OverviewPage from "@/components/admin/overview/OverviewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Overview",
};
export default function AdminPage() {
  return <OverviewPage />;
}
