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

  if (!user) return null;

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
      <SectionDivider />
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
