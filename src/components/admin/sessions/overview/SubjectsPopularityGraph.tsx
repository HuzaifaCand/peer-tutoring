"use client";

import BarGraph from "@/components/BarGraph";
import { SubjectPopularityView } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

async function getSubjectsPopularity() {
  const { data: subjectsPopularity, error } = await supabase
    .from("subject_popularity")
    .select("*")
    .overrideTypes<SubjectPopularityView[]>();

  if (error) {
    console.log("Error fetching subject popularity views", error);
    throw error;
  }

  return subjectsPopularity;
}

export type ComputedSubjectPopularityView = Awaited<
  ReturnType<typeof getSubjectsPopularity>
>[number];

export default function SubjectsPopularityGraph() {
  const [data, setData] = useState<ComputedSubjectPopularityView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const subjectsPopularity = await getSubjectsPopularity();
      setData(subjectsPopularity);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="space-y-8">
      <h2 className="font-semibold text-2xl text-textWhite">
        Completed Sessions by Subject
      </h2>
      <BarGraph loading={loading} data={data} />
    </section>
  );
}
