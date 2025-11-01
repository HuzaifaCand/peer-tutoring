import { Filter } from "@/components/Filter";

export type modes = "all" | "online" | "onsite";

export function ModeFilter({
  modeFilter,
}: {
  modeFilter: { value: modes; setValue: (v: modes) => void };
}) {
  const options = [
    {
      key: "online",
      label: "Online",
      color: "bg-blue-500/20 text-blue-300 border-blue-400/20",
    },
    {
      key: "onsite",
      label: "Onsite",
      color: "bg-yellow-500/20 text-yellow-300 border-yellow-400/20",
    },
  ] as const;

  return (
    <Filter
      options={options}
      value={modeFilter.value}
      setValue={modeFilter.setValue}
    />
  );
}
