import { ChevronDown } from "lucide-react";
import { ChangeEventHandler } from "react";

interface SelectorProps<T> {
  value: string | number;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  values: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  className?: string;
}

export default function Selector<T extends Record<string, unknown>>({
  value,
  handleChange,
  values,
  valueKey,
  labelKey,
  className,
}: SelectorProps<T>) {
  return (
    <div
      className={`relative inline-block w-full max-w-[220px] ${
        className ?? ""
      }`}
    >
      <select
        value={value}
        onChange={handleChange}
        className="
          w-full appearance-none
          bg-elevatedBg text-textButton text-sm
          border border-white/10
          rounded-xl px-4 py-2 pr-10
          cursor-pointer transition-all duration-200
          focus:outline-none focus:ring-1 focus:ring-white/30
          hover:border-white/30 hover:bg-hoverBg
        "
      >
        {values.map((item, i) => (
          <option
            key={String(item[valueKey]) ?? i}
            value={String(item[valueKey])}
            className="bg-elevatedBg text-textButton"
          >
            {String(item[labelKey])}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="
          pointer-events-none absolute right-3 top-1/2
          -translate-y-1/2 text-textWhite/70 transition-transform duration-200
          group-hover:text-textWhite/90
        "
      />
    </div>
  );
}
