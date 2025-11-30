"use client";

import { useEffect, useState } from "react";
import CountCard from "@/components/CountCard";
import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/databasetypes";

type StatView = Database["public"]["Views"]["user_session_stats"]["Row"];

export function SessionStats({
  role,
  userId,
}: {
  role: "tutor" | "student";
  userId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatView | null>(null);

  // Fetch stats on mount
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);

      const { data, error } = await supabase
        .from("user_session_stats")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error(error);
        setStats(null);
      } else {
        setStats(
          data ?? {
            total_minutes: 0,
            onsite_minutes: 0,
            online_minutes: 0,
            completed_sessions: 0,
            completed_online_sessions: 0,
            completed_onsite_sessions: 0,
          }
        );
      }

      setLoading(false);
    }

    fetchStats();
  }, [userId]);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <CountCard
            count={stats?.total_minutes ?? 0}
            loading={loading}
            label={`Minutes ${role === "tutor" ? "taught" : "learnt"}`}
          />

          <div className="grid grid-cols-2 gap-3">
            <CountCard
              count={stats?.onsite_minutes ?? 0}
              loading={loading}
              label="Onsite minutes"
            />

            <CountCard
              count={stats?.online_minutes ?? 0}
              loading={loading}
              label="Online minutes"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <CountCard
            count={stats?.completed_sessions ?? 0}
            loading={loading}
            label="Sessions completed"
          />

          <div className="grid grid-cols-2 gap-3">
            <CountCard
              count={stats?.completed_onsite_sessions ?? 0}
              loading={loading}
              label="Onsite sessions"
            />

            <CountCard
              count={stats?.completed_online_sessions ?? 0}
              loading={loading}
              label="Online sessions"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
