import { Tag } from "@/components/ui/Tag";
import clsx from "clsx";

export const tagTextSize = "text-[10px] sm:text-[11px]";

export function HeaderLeft({
  sub,
  isOnline,
}: {
  sub: string;
  isOnline: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <Tag textSize={tagTextSize} value={sub} color="gray" />
      <Tag
        textSize={tagTextSize}
        value={isOnline ? "online" : "onsite"}
        color={isOnline ? "blue" : "yellow"}
      />
    </div>
  );
}

export const getActionButtonClass = (
  type: "positive" | "destructive",
  size?: "sm" | "xs"
) => {
  const sharedClass =
    "py-2 px-3 transition-colors duration-200 rounded-md sm:rounded-lg cursor-pointer whitespace-nowrap";
  const negativeColors = "bg-red-800/20 text-red-300 hover:bg-red-900/40";
  const positiveColors = "bg-green-800/20 text-green-300 hover:bg-green-900/40";

  const disabledClasses =
    "disabled:bg-gray-800/40 disabled:hover:bg-gray-800/40 disabled:text-textMuted disabled:cursor-not-allowed";
  return clsx(
    sharedClass,
    size === "sm" ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs",
    disabledClasses,
    type === "positive" ? positiveColors : negativeColors
  );
};
