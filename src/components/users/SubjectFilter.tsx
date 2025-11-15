import { Filter } from "@/components/Filter";

export type subjects = "all" | string;

export type subjectColors =
  | "gray"
  | "blue"
  | "yellow"
  | "red"
  | "green"
  | "purple"
  | "pink"
  | "orange"
  | "teal"
  | "amber";

export const subjectColorMap: Record<subjectColors, string> = {
  gray: "bg-gray-500/20  border border-gray-500/20 text-gray-300",
  blue: "bg-blue-500/20  border border-blue-500/20 text-blue-300",
  yellow: "bg-yellow-500/20  border border-yellow-500/20 text-yellow-300",
  red: "bg-red-500/20  border border-red-500/20 text-red-300",
  green: "bg-green-500/20  border border-green-500/20 text-green-300",
  purple: "bg-purple-500/20  border border-purple-500/20 text-purple-300",
  pink: "bg-pink-500/20  border border-pink-500/20 text-pink-300",
  orange: "bg-orange-500/20  border border-orange-500/20 text-orange-300",
  teal: "bg-teal-500/20  border border-teal-500/20 text-teal-300",
  amber: "bg-amber-500/20  border border-amber-500/20 text-amber-300",
};

export function SubjectFilter({
  subjectFilter,
  subjectOptions,
}: {
  subjectFilter: { value: subjects; setValue: (v: subjects) => void };
  subjectOptions: { id: string; label: string; color: string }[];
}) {
  const dynamicOptions = subjectOptions.map((subject) => ({
    key: subject.id,
    label: subject.label,
    color:
      subjectColorMap[subject.color as keyof typeof subjectColorMap] ??
      subjectColorMap.gray,
  }));

  const options = [
    {
      key: "all",
      label: "All Subjects",
      color: subjectColorMap.gray,
    },
    ...dynamicOptions,
  ] as const;

  return (
    <Filter
      options={options}
      value={subjectFilter.value}
      setValue={subjectFilter.setValue}
    />
  );
}
