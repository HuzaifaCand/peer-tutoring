"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import CountCard from "@/components/cards/CountCard";

export default function UserCount() {
  const [counts, setCounts] = useState({
    students: 0,
    tutors: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        setLoading(true);
        setError(null);

        const [studentsRes, tutorsRes] = await Promise.all([
          supabase.from("students").select("*", { count: "exact", head: true }),
          supabase.from("tutors").select("*", { count: "exact", head: true }),
        ]);

        if (studentsRes.error || tutorsRes.error) {
          throw new Error(
            studentsRes.error?.message || tutorsRes.error?.message
          );
        }

        setCounts({
          students: studentsRes.count || 0,
          tutors: tutorsRes.count || 0,
        });
      } catch (err) {
        console.error("Error fetching user counts:", err);
        setError("Failed to load user counts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="mt-8">
      {error ? (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountCard
            loading={loading}
            count={counts.students}
            label="Total Students"
          />
          <CountCard
            loading={loading}
            count={counts.tutors}
            label="Total Tutors"
          />
        </div>
      )}
    </div>
  );
}
