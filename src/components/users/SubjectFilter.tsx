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
  | "amber"
  | "slate"
  | "zinc"
  | "neutral"
  | "stone"
  | "sky"
  | "indigo"
  | "violet"
  | "fuchsia"
  | "rose"
  | "maroon"
  | "emerald"
  | "lime"
  | "forest"
  | "cyan"
  | "seafoam"
  | "sunset"
  | "coral"
  | "lavender"
  | "periwinkle"
  | "sand";

export const subjectColorMap: Record<subjectColors, string> = {
  gray: "bg-gray-500/20 border border-gray-500/20 text-gray-300",
  slate: "bg-slate-500/20 border border-slate-500/20 text-slate-300",
  zinc: "bg-zinc-500/20 border border-zinc-500/20 text-zinc-300",
  neutral: "bg-neutral-500/20 border border-neutral-500/20 text-neutral-300",
  stone: "bg-stone-500/20 border border-stone-500/20 text-stone-300",

  blue: "bg-blue-500/20 border border-blue-500/20 text-blue-300",
  sky: "bg-sky-500/20 border border-sky-500/20 text-sky-300",
  indigo: "bg-indigo-500/20 border border-indigo-500/20 text-indigo-300",
  violet: "bg-violet-500/20 border border-violet-500/20 text-violet-300",
  purple: "bg-purple-500/20 border border-purple-500/20 text-purple-300",
  fuchsia: "bg-fuchsia-500/20 border border-fuchsia-500/20 text-fuchsia-300",

  red: "bg-red-500/20 border border-red-500/20 text-red-300",
  rose: "bg-rose-500/20 border border-rose-500/20 text-rose-300",
  maroon: "bg-[#b91c1c]/20 border border-[#b91c1c]/20 text-[#fecaca]",

  green: "bg-green-500/20 border border-green-500/20 text-green-300",
  emerald: "bg-emerald-500/20 border border-emerald-500/20 text-emerald-300",
  lime: "bg-lime-500/20 border border-lime-500/20 text-lime-300",
  forest: "bg-[#15803d]/20 border border-[#15803d]/20 text-[#bbf7d0]",

  teal: "bg-teal-500/20 border border-teal-500/20 text-teal-300",
  cyan: "bg-cyan-500/20 border border-cyan-500/20 text-cyan-300",
  seafoam: "bg-[#5eead4]/20 border border-[#5eead4]/20 text-[#ccfbf1]",

  yellow: "bg-yellow-500/20 border border-yellow-500/20 text-yellow-300",
  amber: "bg-amber-500/20 border border-amber-500/20 text-amber-300",
  orange: "bg-orange-500/20 border border-orange-500/20 text-orange-300",
  sunset: "bg-[#fdba74]/20 border border-[#fdba74]/20 text-[#ffedd5]",
  coral: "bg-[#fda4af]/20 border border-[#fda4af]/20 text-[#ffe4e6]",

  pink: "bg-pink-500/20 border border-pink-500/20 text-pink-300",
  lavender: "bg-[#e9d5ff]/20 border border-[#e9d5ff]/20 text-[#faf5ff]",
  periwinkle: "bg-[#c7d2fe]/20 border border-[#c7d2fe]/20 text-[#eef2ff]",

  sand: "bg-[#f5deb3]/20 border border-[#f5deb3]/20 text-[#faf3dd]",
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
