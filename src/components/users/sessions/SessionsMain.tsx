"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { SessionsTabs, Tab } from "./SessionTabs";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SessionsOverview } from "./overview/Overview";
import { SessionRequests } from "./requests/SessionRequests";
import { ScheduledSessions } from "./scheduled/Scheduled";
import { ActiveSessions } from "./active/Active";
import { CompletedSessions } from "./completed/Completed";
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

      {tab === "overview" && <SessionsOverview sharedProps={sharedProps} />}
      {tab === "requests" && <SessionRequests sharedProps={sharedProps} />}
      {tab === "scheduled" && <ScheduledSessions sharedProps={sharedProps} />}
      {tab === "active" && <ActiveSessions sharedProps={sharedProps} />}
      {tab === "completed" && <CompletedSessions sharedProps={sharedProps} />}
      {tab === "cancelled" && <CancelledSessions sharedProps={sharedProps} />}
    </main>
  );
}
