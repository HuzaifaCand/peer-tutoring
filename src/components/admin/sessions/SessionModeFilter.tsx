export type modes = "all" | "online" | "onsite";

interface ModeFilterProps {
  modeFilter: {
    value: modes;
    setValue: (v: modes) => void;
  };
}

export function ModeFilter({ modeFilter }: ModeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {["online", "onsite"].map((key) => {
          const online = modeFilter.value === key;
          const label = key === "online" ? "Online" : "Onsite";
          const color =
            key === "online"
              ? "bg-blue-500/20 text-blue-300 border-blue-400/20"
              : "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";

          return (
            <button
              key={key}
              onClick={() =>
                modeFilter.setValue(
                  online ? "all" : (key as "online" | "onsite")
                )
              }
              className={`px-3 py-1 text-xs rounded-md border transition
              ${
                online
                  ? `${color} font-semibold`
                  : "bg-elevatedBg/50 text-textWhite/70 border-white/10 hover:bg-elevatedBg/70"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
