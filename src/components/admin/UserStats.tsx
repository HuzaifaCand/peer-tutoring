"use client";

import CountCard from "@/components/CountCard";
import { useUserStats } from "@/components/users/useUserStats";

export function formatMinutes(min?: number | null) {
  if (!min || min <= 0) return "0m";

  const h = Math.floor(min / 60);
  const m = min % 60;

  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function UserStats({
  role,
  userId,
}: {
  role: "tutor" | "student";
  userId: string;
}) {
  const { stats, loading } = useUserStats(userId);

  return (
    <div className="space-y-3">
      <h3 className="text-textWhite font-semibold text-md sm:text-lg">Stats</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hours Section */}
        <div className="flex flex-col gap-3">
          <CountCard
            compact
            count={formatMinutes(stats?.total_minutes)}
            loading={loading}
            label={`Total ${role === "tutor" ? "teaching" : "learning"} time`}
          />

          <div className="grid grid-cols-2 gap-3">
            <CountCard
              compact
              count={formatMinutes(stats?.onsite_minutes)}
              loading={loading}
              label="Onsite"
            />

            <CountCard
              compact
              count={formatMinutes(stats?.online_minutes)}
              loading={loading}
              label="Online"
            />
          </div>
        </div>

        {/* Sessions Section */}
        <div className="flex flex-col gap-3">
          <CountCard
            compact
            count={stats?.completed_sessions ?? 0}
            loading={loading}
            label="Completed sessions"
          />

          <div className="grid grid-cols-2 gap-3">
            <CountCard
              compact
              count={stats?.completed_onsite_sessions ?? 0}
              loading={loading}
              label="Onsite sessions"
            />

            <CountCard
              compact
              count={stats?.completed_online_sessions ?? 0}
              loading={loading}
              label="Online sessions"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
