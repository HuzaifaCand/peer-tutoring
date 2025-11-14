"use client";

import StatCard from "@/components/StatCard";
import { supabase } from "@/lib/supabase/client";
import {
  Activity,
  CalendarCheck2,
  CalendarClock,
  ClipboardList,
  UserCheck2,
} from "lucide-react";
import { useState, useEffect } from "react";

const STAT_INFO = {
  activeSessions: {
    label: "Active Sessions",
    cta: "Manage Active Sessions",
    href: "/admin/sessions/active",
    icon: Activity,
    fetch: async (_uid: string) =>
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("status", "in_progress"),
  },
  pendingSessionVerifications: {
    label: "Pending Session Verifications",
    cta: "Review Completed Sessions",
    href: "/admin/sessions/completed",
    icon: ClipboardList,
    fetch: async (_uid: string) =>
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")
        .is("verified", null),
  },
  scheduledSessions: {
    label: "Recently Scheduled Sessions",
    cta: "View Booked Sessions",
    href: "/admin/sessions/scheduled",
    icon: CalendarClock,
    fetch: async (_uid: string) =>
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("status", "scheduled"),
  },
  pendingTutorVerifications: {
    label: "Pending Tutor Approvals",
    cta: "Verify New Tutors",
    href: "/admin/tutors",
    icon: UserCheck2,
    fetch: async (_uid: string) =>
      supabase
        .from("tutors")
        .select("*", { count: "exact", head: true })
        .is("approved", null),
  },
  studentScheduledSessions: {
    label: "Upcoming Sessions",
    cta: "View Scheduled Sessions",
    href: "/student/sessions/scheduled",
    icon: CalendarClock,
    fetch: async (uid: string) =>
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("student_id", uid)
        .eq("status", "scheduled"),
  },
  studentSessionRequests: {
    label: "Your Session Requests",
    cta: "Session Requests",
    href: "/student/sessions/scheduled",
    icon: CalendarCheck2,
    fetch: async (uid: string) =>
      supabase
        .from("session_requests")
        .select("*", { count: "exact", head: true })
        .eq("student_id", uid)
        .eq("status", "pending"),
  },
};

// config that  toggles which stats to show
type OperationalStatsConfig = Partial<Record<keyof typeof STAT_INFO, boolean>>;

interface OperationalStatsProps {
  config: OperationalStatsConfig;
  uid?: string;
}

export default function OperationalStats({
  config,
  uid,
}: OperationalStatsProps) {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // enabled keys
        const enabledKeys = Object.entries(config)
          .filter(([_, enabled]) => enabled)
          .map(([key]) => key as keyof typeof STAT_INFO);

        // enabled queries
        const results = await Promise.all(
          enabledKeys.map(async (key) => {
            const { count, error } = await STAT_INFO[key].fetch(uid ?? "");
            if (error) throw error;
            return [key, count ?? 0] as const;
          })
        );

        // combine results
        const counts = Object.fromEntries(results);
        setStats(counts);
      } catch (err) {
        console.error("Error fetching operational stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [config, uid]);

  const enabledCount = Object.entries(config).filter(
    ([_, enabled]) => enabled
  ).length;

  const gridColsClass = enabledCount <= 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section>
      <div className={`grid grid-cols-1 ${gridColsClass} gap-4`}>
        {Object.entries(config)
          .filter(([_, enabled]) => enabled)
          .map(([key]) => {
            const info = STAT_INFO[key as keyof typeof STAT_INFO];
            return (
              <StatCard
                key={key}
                info={info}
                count={stats[key] ?? 0}
                loading={loading}
              />
            );
          })}
      </div>
    </section>
  );
}
