import StudentsOverview from "@/components/admin/students/StudentsOverview";
import PageTransitionWrapper from "@/components/TransitionWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Students",
};

export default function StudentsPage() {
  return (
    <Suspense fallback={null}>
      <PageTransitionWrapper>
        <StudentsOverview />
      </PageTransitionWrapper>
    </Suspense>
  );
}
