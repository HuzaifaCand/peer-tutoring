import PageTransitionWrapper from "@/components/TransitionWrapper";
import Profile from "@/components/users/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default function StudentProfilePage() {
  return (
    <PageTransitionWrapper>
      <Profile role="student" />
    </PageTransitionWrapper>
  );
}
