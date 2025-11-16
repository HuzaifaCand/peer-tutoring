import BrowseTutors from "@/components/users/student/BrowseTutors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Tutors",
};

export default function BrowseTutorsPage() {
  return <BrowseTutors />;
}
