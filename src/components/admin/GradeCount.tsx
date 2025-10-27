"use client";

import CountCard from "@/components/cards/CountCard";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function GradeCount({ type }: { type: "tutors" | "students" }) {
  const [counts, setCounts] = useState({
    as: 0,
    a2: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        setLoading(true);

        const [as, a2] = await Promise.all([
          supabase
            .from(type)
            .select("*", { count: "exact", head: true })
            .eq("grade", "AS"),
          supabase
            .from(type)
            .select("*", { count: "exact", head: true })
            .eq("grade", "A2"),
        ]);

        if (as.error || a2.error) {
          throw new Error(as.error?.message || a2.error?.message);
        }

        setCounts({
          as: as.count || 0,
          a2: a2.count || 0,
        });
      } catch (err) {
        console.error(`Error fetching ${type} counts:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <CountCard
        loading={loading}
        count={counts.as}
        label={`AS ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      />
      <CountCard
        loading={loading}
        count={counts.a2}
        label={`A2 ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      />
    </div>
  );
}
