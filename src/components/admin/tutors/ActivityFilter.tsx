import { Filter } from "@/components/Filter";

export type activities = "all" | "active" | "inactive";

export function ActivityFilter({
  activityFilter,
}: {
  activityFilter: { value: activities; setValue: (v: activities) => void };
}) {
  const options = [
    {
      key: "active",
      label: "Active",
      color: "bg-green-500/20 text-green-300 border-green-400/20",
    },
    {
      key: "inactive",
      label: "Inactive",
      color: "bg-red-500/20 text-red-300 border-red-400/20",
    },
  ] as const;

  return (
    <Filter
      options={options}
      value={activityFilter.value}
      setValue={activityFilter.setValue}
    />
  );
}
