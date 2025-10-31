"use client";

export type healths = "all" | "healthy" | "oversupply" | "low-supply";
interface SubjectHealthFilterProps {
  healths: {
    value: healths;
    setValue: (v: healths) => void;
  };
}

export function SubjectHealthFilter({ healths }: SubjectHealthFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {["healthy", "low-supply", "oversupply"].map((key) => {
          const active = healths.value === key;
          const label =
            key === "healthy"
              ? "Healthy"
              : key === "low-supply"
              ? "Low Supply"
              : "Oversupply";

          const color =
            key === "healthy"
              ? "bg-green-500/20 text-green-300 border-green-400/20"
              : key === "low-supply"
              ? "bg-red-500/20 text-red-300 border-red-400/20"
              : "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";

          return (
            <button
              key={key}
              onClick={() =>
                healths.setValue(
                  active
                    ? "all"
                    : (key as "healthy" | "low-supply" | "oversupply")
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
