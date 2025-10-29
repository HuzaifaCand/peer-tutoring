"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import CountCard from "@/components/cards/CountCard";
import GradeCount from "./GradeCount";

export default function UserCount() {
  const [counts, setCounts] = useState({
    students: 0,
    tutors: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        setLoading(true);

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
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-4 w-full p-4 rounded-2xl bg-elevatedBg/30">
          <CountCard
            loading={loading}
            count={counts.students}
            label="Total Students"
          />

          <GradeCount type="students" />
        </div>

        <div className="flex flex-col gap-4 w-full p-4 rounded-2xl bg-elevatedBg/30">
          <CountCard
            loading={loading}
            count={counts.tutors}
            label="Total Tutors"
          />

          <GradeCount type="tutors" />
        </div>
      </div>
    </section>
  );
}
