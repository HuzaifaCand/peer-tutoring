import StudentsOverview from "@/components/admin/students/StudentsOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Students",
};

export default function StudentsPage() {
  return <StudentsOverview />;
}
