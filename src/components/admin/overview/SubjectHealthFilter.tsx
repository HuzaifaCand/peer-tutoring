import { Filter } from "@/components/Filter";
import { titles } from "./SubjectsHealthTable";
import type { SubjectHealthStatus } from "./getSubjectsHealth";

export type healths = "all" | "healthy" | "oversupply" | "low-supply";

export function SubjectHealthFilter({
  healthFilter,
}: {
  healthFilter: { value: healths; setValue: (v: healths) => void };
}) {
  const options = [
    {
      key: "healthy",
      label: "Healthy",
      color: "bg-green-500/20 text-green-300 border-green-400/20",
      title: titles["healthy" as SubjectHealthStatus],
    },
    {
      key: "low-supply",
      label: "Low Supply",
      color: "bg-red-500/20 text-red-300 border-red-400/20",
      title: titles["low-supply" as SubjectHealthStatus],
    },
    {
      key: "oversupply",
      label: "Oversupply",
      color: "bg-yellow-500/20 text-yellow-300 border-yellow-400/20",
      title: titles["oversupply" as SubjectHealthStatus],
    },
  ] as const;

  return (
    <Filter
      options={options}
      value={healthFilter.value}
      setValue={healthFilter.setValue}
    />
  );
}
