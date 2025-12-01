import PageTransitionWrapper from "@/components/TransitionWrapper";
import Profile from "@/components/users/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default function TutorProfilePage() {
  return (
    <PageTransitionWrapper>
      <Profile role="tutor" />
    </PageTransitionWrapper>
  );
}
