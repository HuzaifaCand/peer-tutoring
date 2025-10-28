"use client";

import CountCard from "@/components/cards/CountCard";
import { useGradeCount } from "@/hooks/admin/useGradeCount";

export default function GradeCountCards({
  type,
}: {
  type: "tutors" | "students";
}) {
  const { loading, counts } = useGradeCount(type);

  return (
    <div className="grid grid-cols-2 gap-4">
      <CountCard loading={loading} count={counts.as} label={`In AS`} />
      <CountCard loading={loading} count={counts.a2} label={`In A2`} />
    </div>
  );
}
