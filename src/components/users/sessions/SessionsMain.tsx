"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { SessionsTabs, Tab } from "./SessionsTabs";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SessionsOverview } from "./SessionsOverview";
import { SessionRequests } from "./requests/SessionRequests";
import { ScheduledSessions } from "./Scheduled";
import { ActiveSessions } from "./Active";
import { CompletedSessions } from "./Completed";
import { useAuthUser } from "@/hooks/useAuthUser";
import { CancelledSessions } from "./cancelled/Cancelled";

export const TABS: Tab[] = [
  "overview",
  "requests",
  "scheduled",
  "active",
  "completed",
  "cancelled",
];

export type SharedPropsType = { userId: string; role: "tutor" | "student" };

export default function SessionsMain({ role }: { role: "tutor" | "student" }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthUser();

  const tabParam = searchParams.get("tab") || "";
  const initialTab: Tab = TABS.includes(tabParam as Tab)
    ? (tabParam as Tab)
    : "overview";

  const [tab, setTab] = useState<Tab>(initialTab);

  useEffect(() => {
    if (TABS.includes(tabParam as Tab)) {
      setTab(tabParam as Tab);
    } else {
      setTab("overview");
    }
  }, [tabParam]);

  if (!user) return;
  const userId = user.id;
  const sharedProps: SharedPropsType = {
    userId,
    role,
  };

  const handleSetTab = (t: Tab) => {
    setTab(t);
    router.replace(`?tab=${t}`, { scroll: false });
  };

  return (
    <main>
      <SectionHeader title="My Sessions" />
      <SessionsTabs activeTab={tab} setActiveTab={handleSetTab} />

      {tab === "overview" && <SessionsOverview role={role} />}
      {tab === "requests" && <SessionRequests sharedProps={sharedProps} />}
      {tab === "scheduled" && <ScheduledSessions />}
      {tab === "active" && <ActiveSessions />}
      {tab === "completed" && <CompletedSessions />}
      {tab === "cancelled" && <CancelledSessions sharedProps={sharedProps} />}
    </main>
  );
}
