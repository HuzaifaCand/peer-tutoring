import { useEffect, useState } from "react";
import { StatView } from "./sessions/overview/SessionStats";
import { supabase } from "@/lib/supabase/client";

const DEFAULT_STATS = {
  completed_online_sessions: 0,
  completed_onsite_sessions: 0,
  completed_sessions: 0,
  online_minutes: 0,
  onsite_minutes: 0,
  total_minutes: 0,
};

export function useUserStats(userId: string) {
  const [stats, setStats] = useState<StatView | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const { data } = await supabase
        .from("user_session_stats")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      setStats(data ?? DEFAULT_STATS);
      setLoading(false);
    }
    fetchStats();
  }, [userId]);

  return { stats, loading };
}
