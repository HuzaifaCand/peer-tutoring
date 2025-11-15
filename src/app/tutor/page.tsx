import UserOverview from "@/components/users/UserOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Dashboard",
};
export default function TutorDashboard() {
  return <UserOverview role="tutor" />;
}
