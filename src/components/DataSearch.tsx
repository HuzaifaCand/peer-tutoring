import { Search, X } from "lucide-react";

interface DataSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DataSearch({ value, onChange }: DataSearchProps) {
  return (
    <div className="flex items-center justify-end px-1">
      <div className="relative w-36 sm:w-42 md:w-56">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={12}
        />
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full pl-9 pr-8 py-1.5 sm:py-2 rounded-lg
           text-textWhite placeholder-textMuted
            border border-white/10
            focus:outline-none focus:bg-elevatedBg
            transition-all duration-200 text-xs
          "
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-textMuted hover:text-textWhite transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
