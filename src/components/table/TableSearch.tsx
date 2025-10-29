import React from "react";
import { Search, X } from "lucide-react";

interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TableSearch({ value, onChange }: TableSearchProps) {
  return (
    <div className="flex items-center justify-end px-2">
      <div className="relative w-full sm:w-64">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full pl-9 pr-8 py-2 rounded-lg
           text-textWhite placeholder-textMuted
            border border-white/10
            focus:outline-none focus:bg-elevatedBg
            transition-all duration-200
          "
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-textMuted hover:text-textWhite transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
