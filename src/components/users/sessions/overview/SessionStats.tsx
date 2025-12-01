"use client";

import CountCard from "@/components/CountCard";
import { Database } from "@/lib/supabase/databasetypes";
import { formatMinutes } from "@/components/admin/UserStats";
import { useUserStats } from "../../useUserStats";

export type StatView = Database["public"]["Views"]["user_session_stats"]["Row"];

export function SessionStats({
  role,
  userId,
}: {
  role: "tutor" | "student";
  userId: string;
}) {
  const { stats, loading } = useUserStats(userId);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <CountCard
            count={formatMinutes(stats?.total_minutes)}
            loading={loading}
            label={`Total ${role === "tutor" ? "teaching" : "learning"} time`}
          />

          <div className="grid grid-cols-2 gap-3">
            <CountCard
              count={formatMinutes(stats?.onsite_minutes)}
              loading={loading}
              label="Onsite"
            />

            <CountCard
              count={formatMinutes(stats?.online_minutes)}
              loading={loading}
              label="Online"
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
