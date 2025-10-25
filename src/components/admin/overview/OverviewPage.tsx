"use client";

import SectionHeader from "@/components/SectionHeader";
import OperationalStats from "./OperationalStats";
import UserCount from "./UserCount";
import SessionsChart from "./SessionsChart";

export default function OverviewPage() {
  return (
    <main className="text-textWhite">
      {/* Header */}
      <SectionHeader title="Overview" otherText="Username" />

      {/* Student and Tutor Count */}
      <UserCount />
      <div className="my-8 border-b border-white/10" />

      {/* things that require looking at basically */}
      <OperationalStats />
      <div className="my-8 border-b border-white/10" />

      <SessionsChart />
    </main>
  );
}
