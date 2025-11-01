import { ChevronDown } from "lucide-react";
import { ChangeEventHandler } from "react";

interface SelectorProps {
  value: number | string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  values: { name: string; index: string | number }[];
}

export default function Selector({
  value,
  handleChange,
  values,
}: SelectorProps) {
  return (
    <div className="relative inline-block w-full max-w-[220px]">
      <select
        value={value}
        onChange={handleChange}
        className="
          w-full appearance-none
          bg-elevatedBg text-textButton text-sm font-medium
          border border-white/10
          rounded-xl px-4 py-2 pr-10
          cursor-pointer transition-all duration-200
          focus:outline-none focus:ring-1 focus:ring-white/30
          hover:border-white/30 hover:bg-hoverBg
        "
      >
        {values.map((value) => (
          <option
            key={value.index}
            value={value.index}
            className="bg-elevatedBg text-textButton"
          >
            {value.name}
          </option>
        ))}
      </select>

      {/* Custom dropdown icon */}
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
