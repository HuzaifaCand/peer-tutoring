"use client";

import StatCard from "@/components/cards/StatCard";
import { supabase } from "@/lib/supabase/client";
import { Activity, ClipboardList, UserCheck2 } from "lucide-react";
import { useState, useEffect } from "react";

const info = {
  activeSessions: {
    label: "Active Sessions",
    cta: "Manage Active Sessions",
    href: "/admin/sessions/active",
    icon: Activity, // active/ongoing status
  },
  pendingSessionVerifications: {
    label: "Pending Session Verifications",
    cta: "Review Completed Sessions",
    href: "/admin/sessions",
    icon: ClipboardList, // reviewing items / verification queue
  },
  pendingTutorVerifications: {
    label: "Pending Tutor Approvals",
    cta: "Review Unverified Tutors",
    href: "/admin/tutors",
    icon: UserCheck2, // reviewing / approving users
  },
};
export default function OperationalStats() {
  const [stats, setStats] = useState({
    activeSessions: 0,
    pendingSessionVerifications: 0,
    pendingTutorVerifications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [
          { count: activeCount, error: activeErr },
          { count: pendingSessCount, error: pendingSessErr },
          { count: pendingTutorCount, error: pendingTutorErr },
        ] = await Promise.all([
          supabase
            .from("sessions")
            .select("*", { count: "exact", head: true })
            .eq("status", "in_progress"),
          supabase
            .from("sessions")
            .select("*", { count: "exact", head: true })
            .eq("status", "completed")
            .is("verified", null),
          supabase
            .from("tutors")
            .select("*", { count: "exact", head: true })
            .is("approved", null),
        ]);

        if (activeErr || pendingSessErr || pendingTutorErr) {
          console.error("Error fetching stats:", {
            activeErr,
            pendingSessErr,
            pendingTutorErr,
          });
          return;
        }

        setStats({
          activeSessions: activeCount ?? 0,
          pendingSessionVerifications: pendingSessCount ?? 0,
          pendingTutorVerifications: pendingTutorCount ?? 0,
        });
      } catch (err) {
        console.error("Unexpected error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Object.entries(info).map(([key, value]) => (
          <StatCard
            key={key}
            info={value}
            count={stats[key as keyof typeof stats]}
            loading={loading}
          />
        ))}
      </div>
    </section>
  );
}
