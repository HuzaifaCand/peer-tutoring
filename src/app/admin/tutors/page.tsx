import TutorsOverview from "@/components/admin/tutors/TutorsOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Tutors",
};

export default function TutorsPage() {
  return <TutorsOverview />;
}
