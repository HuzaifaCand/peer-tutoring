export function OnlineAvailabilityUI({
  online,
  onToggle,
}: {
  online: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-elevatedBg">
      <div className="flex flex-col gap-1">
        <span className="text-textWhite font-medium text-sm">
          Online availability
        </span>
        <span className="text-textMuted text-xs">
          Students {online ? "will" : "won't"} be able to request online
          sessions with you.
        </span>
      </div>

      {/* Toggle */}
      <button
        type="button"
        aria-pressed={online}
        onClick={onToggle}
        className={`relative h-3 sm:h-6 w-6 sm:w-11 rounded-full transition-colors duration-200 ${
          online ? "bg-green-500" : "bg-gray-500"
        }`}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
            online ? "translate-x-1" : "-translate-x-5"
          }`}
        />
      </button>
    </div>
  );
}
