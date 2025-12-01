import TutorsOverview from "@/components/admin/tutors/TutorsOverview";
import PageTransitionWrapper from "@/components/TransitionWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Tutors",
};

export default function TutorsPage() {
  return (
    <Suspense fallback={null}>
      <PageTransitionWrapper>
        <TutorsOverview />
      </PageTransitionWrapper>
    </Suspense>
  );
}
