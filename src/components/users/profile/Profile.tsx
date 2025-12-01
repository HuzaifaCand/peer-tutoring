"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { UserInfoSection } from "../UserInfoSection";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getUserMetadata } from "../getUserMetadata";
import { SubjectSection } from "./SubjectSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { AvailabilitySection } from "./AvailabilitySection";
import { AboutSection } from "./AboutSection";

export default function Profile({ role }: { role: "student" | "tutor" }) {
  const { user } = useAuthUser();

  if (!user) return <SectionHeader title="Profile" />;

  const { displayName, email, studentId } = getUserMetadata(user);

  return (
    <main>
      <SectionHeader title="Profile" />
      <UserInfoSection
        name={displayName}
        email={email}
        studentId={studentId}
        role={role}
        isOnboarding={false}
        grade="AS" // temporary
      />
      <div className="lg:hidden">
        <SectionDivider />
      </div>
      <div className="hidden lg:block">
        <SectionDivider invisible />
      </div>
      <SubjectSection user={user} role={role} />
      {role === "tutor" && (
        <>
          <SectionDivider />
          <AvailabilitySection tutorId={user.id} />
        </>
      )}
      <SectionDivider />
      <AboutSection uid={user.id} role={role} />
    </main>
  );
}
