"use client";

import SectionHeader from "@/components/SectionHeader";
import OperationalStats from "./OperationalStats";
import UsersOverview from "./UsersOverview";
import SectionDivider from "@/components/SectionDivider";

export default function OverviewPage() {
  return (
    <main>
      {/* Header */}
      <SectionHeader title="Overview" />

      {/* things that require looking at basically */}
      <OperationalStats />
      <SectionDivider />

      {/* Student and Tutor Count with buttons to go to either page*/}
      <UsersOverview />
      <SectionDivider />
    </main>
  );
}
