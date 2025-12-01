import clsx from "clsx";
import TextLoader from "./ui/TextLoader";

export default function CountCard({
  label,
  count,
  loading,
  compact = false,
}: {
  label: string;
  count: number | string;
  loading?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl flex flex-col",
        compact ? "p-3 sm:p-4 bg-elevatedBg/60" : "p-4 sm:p-6 bg-elevatedBg"
      )}
    >
      <p className={clsx("text-textMuted", compact ? "text-xs" : "text-sm")}>
        {label}
      </p>

      <div className="mt-1 flex items-center h-[28px]">
        {loading ? (
          <TextLoader width={compact ? "w-10" : "w-16"} height="h-6" />
        ) : (
          <h2
            className={clsx(
              "font-semibold text-textWhite",
              compact ? "text-xl" : "text-2xl sm:text-3xl"
            )}
          >
            {count}
          </h2>
        )}
      </div>
    </div>
  );
}
