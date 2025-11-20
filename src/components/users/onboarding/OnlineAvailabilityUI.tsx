export function OnlineAvailabilityUI({
  online,
  onToggle,
}: {
  online: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 gap-2 rounded-2xl bg-elevatedBg">
      <div className="flex flex-col gap-1">
        <span className="text-textWhite font-medium text-sm">
          Online availability
        </span>
        <span className="text-textMuted text-[10px] sm:text-xs">
          Students {online ? "will" : "won't"} be able to request online
          sessions with you.
        </span>
      </div>

      {/* Toggle */}
      <div className="pl-2">
        <button
          type="button"
          aria-pressed={online}
          onClick={onToggle}
          className={`relative h-4 sm:h-6 w-7 sm:w-11 rounded-full transition-colors duration-200 ${
            online ? "bg-blue" : "bg-gray-500"
          }`}
        >
          <span
            className={`absolute top-1/2 -translate-y-1/2 h-2 w-2 sm:h-4 sm:w-4 rounded-full bg-white transition-transform duration-200 ${
              online ? "translate-x-1" : "sm:-translate-x-5 -translate-x-3"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
