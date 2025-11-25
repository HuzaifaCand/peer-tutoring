import TutorsOverview from "@/components/admin/tutors/TutorsOverview";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Tutors",
};

export default function TutorsPage() {
  return (
    <Suspense fallback={null}>
      <TutorsOverview />
    </Suspense>
  );
}
