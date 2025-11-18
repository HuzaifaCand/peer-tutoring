import clsx from "clsx";

interface FilledFieldProps {
  label: string;
  value: string;
  capitalize?: boolean;
}

export default function FilledField({
  label,
  value,
  capitalize = true,
}: FilledFieldProps) {
  return (
    <div className="flex flex-col mb-2 w-full">
      {/* Label */}
      <label className="text-textWhite mb-1 text-xs sm:text-sm tracking-wide">
        {label}
      </label>

      {/* "Input-looking" value */}
      <div
        className={clsx(
          "bg-hoverBg border border-elevatedBg text-textMuted/90 text-xs sm:text-sm rounded px-3 py-1",
          capitalize ? "capitalize" : ""
        )}
      >
        {value}
      </div>
    </div>
  );
}
