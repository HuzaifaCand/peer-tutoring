import UserOverview from "@/components/users/UserOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Dashboard",
};
export default function StudentDashboard() {
  return <UserOverview role="student" />;
}
