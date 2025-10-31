"use client";

import StatCard from "@/components/cards/StatCard";
import { supabase } from "@/lib/supabase/client";
import { Activity, ClipboardList, UserCheck2 } from "lucide-react";
import { useState, useEffect } from "react";

const STAT_INFO = {
  activeSessions: {
    label: "Active Sessions",
    cta: "Manage Active Sessions",
    href: "/admin/sessions/active",
    icon: Activity,
    fetch: async () =>
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
    fetch: async () =>
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
    icon: ClipboardList,
    fetch: async () =>
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
    fetch: async () =>
      supabase
        .from("tutors")
        .select("*", { count: "exact", head: true })
        .is("approved", null),
  },
};

// config that  toggles which stats to show
type OperationalStatsConfig = Partial<Record<keyof typeof STAT_INFO, boolean>>;

interface OperationalStatsProps {
  config: OperationalStatsConfig;
}

export default function OperationalStats({ config }: OperationalStatsProps) {
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
            const { count, error } = await STAT_INFO[key].fetch();
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
  }, [config]);

  const enabledCount = Object.entries(config).filter(
    ([enabled]) => enabled
  ).length;

  const gridColsClass = enabledCount <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <section>
      <div className={`grid grid-cols-1 ${gridColsClass} gap-3`}>
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
