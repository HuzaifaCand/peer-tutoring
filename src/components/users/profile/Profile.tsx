"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { UserInfoSection } from "../UserInfoSection";
import { useAuthUser } from "@/hooks/useAuthUser";
import Loading from "@/components/Loading";
import { getUserMetadata } from "../getUserMetadata";

export default function Profile({ role }: { role: "student" | "tutor" }) {
  const { user, userLoading } = useAuthUser();

  if (!user || userLoading) return <Loading bg="bg-mainBg" />;

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
    </main>
  );
}
