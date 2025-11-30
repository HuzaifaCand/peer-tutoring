"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import TextLoader from "../ui/TextLoader";
import SectionHeader from "../ui/SectionHeader";
import SubjectUserCards from "./user-subjects/UserSubjectCards";
import SectionDivider from "../ui/SectionDivider";
import OperationalStats from "../OperationalStats";
import { Library } from "lucide-react";

const STUDENT_STATS = {
  studentScheduledSessions: true,
  studentSessionRequests: true,
} as const;

const TUTOR_STATS = {
  tutorScheduledSessions: true,
  tutorSessionRequests: true,
  tutorPendingSessionVerifications: true,
} as const;

export default function UserOverview({ role }: { role: "student" | "tutor" }) {
  const { user, userLoading, userError } = useAuthUser();

  if (!user) return null;
  if (userError) console.error("user loading error", userError);

  const displayName = user.user_metadata.full_name
    .split(" ")
    .slice(0, -1)
    .join(" ");

  const rightSlot = userLoading ? (
    <TextLoader width="width-5" height="height-2" />
  ) : (
    <span>
      Welcome,{" "}
      <span className="text-yellow whitespace-nowrap">{displayName} 👋</span>
    </span>
  );

  return (
    <main>
      <SectionHeader title="Overview" rightSlot={rightSlot} />

      {role === "tutor" && (
        <>
          <OperationalStats userId={user.id} config={TUTOR_STATS} />
          <SectionDivider />
        </>
      )}

      <SubjectUserCards role={role} uid={user.id} />
      <SectionDivider />

      {role === "student" && (
        <>
          <OperationalStats userId={user.id} config={STUDENT_STATS} />
          <SectionDivider />
        </>
      )}

      <div className="border-1 border-white/10 bg-mainBg text-textMuted flex items-center  justify-center ">
        <div className="py-12 px-4 flex flex-col gap-4 items-center">
          <Library className="w-8 h-8 text-textMuted" />
          <p className="text-xs sm:text-sm">Resource Management Coming Soon</p>
        </div>
      </div>
    </main>
  );
}
