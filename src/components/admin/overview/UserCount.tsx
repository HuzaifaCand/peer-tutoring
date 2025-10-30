"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import CountCard from "@/components/cards/CountCard";
import GradeCount from "./GradeCountCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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

  const items: {
    type: "students" | "tutors";
    value: number;
    capitalized: string;
  }[] = [
    { type: "students", value: counts.students, capitalized: "Students" },
    { type: "tutors", value: counts.tutors, capitalized: "Tutors" },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.type}
            className="flex flex-col gap-4 w-full p-4 rounded-2xl bg-elevatedBg/30"
          >
            <CountCard
              loading={loading}
              count={item.value}
              label={`Total ${item.capitalized}`}
            />
            <GradeCount type={item.type} />

            <Link
              href={`/admin/${item.type}`}
              className="mt-auto w-full text-center rounded-lg bg-mainBg hover:bg-elevatedBg border border-textWhite/10 transition text-textButton font-medium py-2 px-3 text-xs sm:text-sm active:scale-95"
            >
              View {item.capitalized}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
