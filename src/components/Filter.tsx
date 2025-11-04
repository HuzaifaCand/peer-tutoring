"use client";

interface OptionConfig<T extends string> {
  key: T;
  label: string;
  color: string;
  title?: string;
}

interface FilterProps<T extends string> {
  options: readonly OptionConfig<T>[];
  value: T | "all";
  setValue: (v: T | "all") => void;
}

export function Filter<T extends string>({
  options,
  value,
  setValue,
}: FilterProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {options.map(({ key, label, color, title }) => {
          const active = value === key;
          return (
            <button
              key={key}
              title={title}
              onClick={() => setValue(active ? "all" : key)}
              className={`px-3 py-1 text-[11px] sm:text-xs rounded-md border transition
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
