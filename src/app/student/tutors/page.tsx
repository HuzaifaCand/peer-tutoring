import PageTransitionWrapper from "@/components/TransitionWrapper";
import BrowseTutors from "@/components/users/browse-tutors/BrowseTutors";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse Tutors",
};

export default function BrowseTutorsPage() {
  return (
    <Suspense fallback={null}>
      <PageTransitionWrapper>
        <BrowseTutors />
      </PageTransitionWrapper>
    </Suspense>
  );
}
