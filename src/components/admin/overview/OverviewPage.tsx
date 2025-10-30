"use client";

import SectionHeader from "@/components/SectionHeader";
import OperationalStats from "./OperationalStats";
import UserCount from "./UserCount";
import SessionsChart from "./SessionsChart";
import SectionDivider from "@/components/SectionDivider";

export default function OverviewPage() {
  return (
    <main className="text-textWhite">
      {/* Header */}
      <SectionHeader title="Overview" />

      {/* Student and Tutor Count */}
      <UserCount />
      <SectionDivider />
      {/* things that require looking at basically */}
      <OperationalStats />
      <SectionDivider />

      <SessionsChart />
    </main>
  );
}
