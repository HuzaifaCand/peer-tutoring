import clsx from "clsx";
import { subjectColors } from "../users/SubjectFilter";

interface TagProps {
  value: string;
  color?: colors;
  textSize?: string;
  className?: string;
  font?: string;
  title?: string;
  capitalize?: boolean;
}

export type colors = "muted" | "invisible" | subjectColors;

const colorStyles: Record<colors, string> = {
  muted: "bg-gray-500/10 text-textMuted border border-gray-400/10",
  invisible: "invisible",

  gray: "bg-gray-500/20 text-gray-300",
  slate: "bg-slate-500/20 text-slate-300",
  zinc: "bg-zinc-500/20 text-zinc-300",
  neutral: "bg-neutral-500/20 text-neutral-300",
  stone: "bg-stone-500/20 text-stone-300",

  blue: "bg-blue-500/20 text-blue-300",
  sky: "bg-sky-500/20 text-sky-300",
  indigo: "bg-indigo-500/20 text-indigo-300",
  violet: "bg-violet-500/20 text-violet-300",
  purple: "bg-purple-500/20 text-purple-300",
  fuchsia: "bg-fuchsia-500/20 text-fuchsia-300",

  red: "bg-red-500/20 text-red-300",
  rose: "bg-rose-500/20 text-rose-300",
  maroon: "bg-[#b91c1c]/20 text-[#fecaca]",

  green: "bg-green-500/20 text-green-300",
  lime: "bg-lime-500/20 text-lime-300",
  forest: "bg-[#15803d]/20 text-[#bbf7d0]",

  teal: "bg-teal-500/20 text-teal-300",
  cyan: "bg-cyan-500/20 text-cyan-300",
  seafoam: "bg-[#5eead4]/20 text-[#ccfbf1]",

  yellow: "bg-yellow-500/20 text-yellow-300",
  amber: "bg-amber-500/20 text-amber-300",
  orange: "bg-orange-500/20 text-orange-300",
  sunset: "bg-[#fdba74]/20 text-[#ffedd5]",
  coral: "bg-[#fda4af]/20 text-[#ffe4e6]",

  pink: "bg-pink-500/20 text-pink-300",
  lavender: "bg-[#e9d5ff]/20 text-[#faf5ff]",
  periwinkle: "bg-[#c7d2fe]/20 text-[#eef2ff]",

  sand: "bg-[#f5deb3]/20 text-[#faf3dd]",
};

function formatValue(value: string, capitalize = true) {
  if (!capitalize) return value;
  const formatted = value.includes("-")
    ? value
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : value.charAt(0).toUpperCase() + value.slice(1);
  return formatted;
}

export function Tag({
  value,
  color = "gray",
  textSize = "text-[12px]",
  font,
  className,
  title,
  capitalize,
}: TagProps) {
  return (
    <span
      title={title}
      className={clsx(
        "px-2 py-0.5 rounded-md",
        textSize,
        font,
        colorStyles[color as colors],
        capitalize === true ? "capitalize" : "",
        className // allows custom styles
      )}
    >
      {formatValue(value)}
    </span>
  );
}
