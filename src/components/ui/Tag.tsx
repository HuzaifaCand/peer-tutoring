import clsx from "clsx";

interface TagProps {
  value: string;
  color?: string;
  textSize?: string;
  className?: string;
  font?: string;
  title?: string;
  capitalize?: boolean;
}

const colorStyles: Record<string, string> = {
  muted: "bg-gray-500/10 text-textMuted",
  gray: "bg-gray-500/20 text-gray-300",
  blue: "bg-blue-500/20 text-blue-300",
  yellow: "bg-yellow-500/20 text-yellow-300",
  red: "bg-red-500/20 text-red-300",
  green: "bg-green-500/20 text-green-300",
  purple: "bg-purple-500/20 text-purple-300",
  pink: "bg-pink-500/20 text-pink-300",
  orange: "bg-orange-500/20 text-orange-300",
  teal: "bg-teal-500/20 text-teal-300",
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
        colorStyles[color],
        capitalize === true ? "capitalize" : "",
        className // allows custom styles
      )}
    >
      {formatValue(value)}
    </span>
  );
}
