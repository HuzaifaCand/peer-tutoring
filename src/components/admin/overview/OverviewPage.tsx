"use client";

import SectionHeader from "@/components/SectionHeader";
import OperationalStats from "@/components/OperationalStats";
import UsersOverview from "./UsersOverview";
import SectionDivider from "@/components/SectionDivider";

export default function OverviewPage() {
  return (
    <main>
      {/* Header */}
      <SectionHeader title="Overview" />

      {/* things that require looking at basically */}
      <OperationalStats
        config={{
          pendingTutorVerifications: true,
          activeSessions: true,
        }}
      />
      <SectionDivider />

      {/* Student and Tutor Count with buttons to go to either page*/}
      <UsersOverview />
      <SectionDivider />
    </main>
  );
}
