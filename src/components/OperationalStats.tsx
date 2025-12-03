"use client";

import StatCard from "@/components/StatCard";
import { supabase } from "@/lib/supabase/client";
import {
  Activity,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Inbox,
  Send,
  UserCheck2,
} from "lucide-react";
import { useState, useEffect } from "react";

const ADMIN_STATS = {
  activeSessions: {
    label: "Active Sessions",
    cta: "Manage Active Sessions",
    href: "/admin/sessions/active",
    icon: Activity,
    fetch: async (_userId: string) =>
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
    fetch: async (_userId: string) =>
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
    fetch: async (_userId: string) =>
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
    fetch: async (_userId: string) =>
      supabase
        .from("tutors")
        .select("*", { count: "exact", head: true })
        .is("approved", null),
  },
};

const STUDENT_STATS = {
  studentScheduledSessions: {
    label: "Upcoming Sessions",
    cta: "View Scheduled Sessions",
    href: "/student/sessions?tab=scheduled",
    icon: CalendarDays,
    fetch: async (userId: string) =>
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("student_id", userId)

        .eq("status", "scheduled"),
  },
  studentSessionRequests: {
    label: "Pending Session Requests",
    cta: "View Session Requests",
    href: "/student/sessions?tab=requests",
    icon: Send,
    fetch: async (userId: string) => {
      const { data, error } = await supabase
        .from("session_pending_counts")
        .select("pending_count")
        .eq("user_id", userId)
        .maybeSingle();

      return { count: data?.pending_count ?? 0, error };
    },
  },
};

const TUTOR_STATS = {
  tutorScheduledSessions: {
    label: "Upcoming Sessions",
    cta: "View Scheduled Sessions",
    href: "/tutor/sessions?tab=scheduled",
    icon: CalendarDays,
    fetch: async (userId: string) =>
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("tutor_id", userId)
        .eq("status", "scheduled"),
  },
  tutorSessionRequests: {
    label: "Pending Session Requests",
    cta: "View Session Requests",
    href: "/tutor/sessions?tab=requests",
    icon: Inbox,
    fetch: async (userId: string) => {
      const { data, error } = await supabase
        .from("session_pending_counts")
        .select("pending_count")
        .eq("user_id", userId)
        .maybeSingle();

      return { count: data?.pending_count ?? 0, error };
    },
  },

  tutorPendingSessionVerifications: {
    label: "Pending Session Verifications",
    cta: "Review Completed Sessions",
    href: "/tutor/sessions?tab=completed",
    icon: ClipboardCheck,
    fetch: async (userId: string) =>
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("tutor_id", userId)
        .eq("status", "completed")
        .is("verified", null),
  },
};

const STAT_INFO = {
  ...ADMIN_STATS,
  ...STUDENT_STATS,
  ...TUTOR_STATS,
} as const;

// config that  toggles which stats to show
type OperationalStatsConfig = Partial<Record<keyof typeof STAT_INFO, boolean>>;

interface OperationalStatsProps {
  config: OperationalStatsConfig;
  userId?: string;
}

export default function OperationalStats({
  config,
  userId,
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
            const { count, error } = await STAT_INFO[key].fetch(userId ?? "");
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
  }, [config, userId]);

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
