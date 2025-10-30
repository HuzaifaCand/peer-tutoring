export type availabilities = "all" | "active" | "inactive";

interface AvailabilityFilterProps {
  availabilityFilter: {
    value: availabilities;
    setValue: (v: availabilities) => void;
  };
}

export function AvailabilityFilter({
  availabilityFilter,
}: AvailabilityFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {["active", "inactive"].map((key) => {
          const active = availabilityFilter.value === key;
          const label = key === "active" ? "Active" : "Inactive";
          const color =
            key === "active"
              ? "bg-green-500/20 text-green-300 border-green-400/20"
              : "bg-red-500/20 text-red-300 border-red-400/20";

          return (
            <button
              key={key}
              onClick={() =>
                availabilityFilter.setValue(
                  active ? "all" : (key as "active" | "inactive")
                )
              }
              className={`px-3 py-1 text-xs rounded-md border transition
              ${
                active
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
