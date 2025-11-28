"use client";

import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";

export interface SubjectOption {
  id: string;
  labelDisplay: string;
  searchKey: string;
}

interface Props {
  value?: string; // this will store subject_id
  setValue: (id: string) => void;
  options: SubjectOption[];
  inputClass: string;
}

export default function SubjectInput({
  value,
  setValue,
  options,
  inputClass,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filtered = options.filter((opt) =>
    opt.searchKey.includes(inputValue.toLowerCase())
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === 0 ? filtered.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && filtered[highlightedIndex]) {
      e.preventDefault();
      const selected = filtered[highlightedIndex];
      setValue(selected.id);
      setInputValue(selected.labelDisplay);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [inputValue]);

  useEffect(() => {
    const matched = options.find((opt) => opt.id === value);
    setInputValue(matched ? matched.labelDisplay : "");
  }, [value, options]);

  return (
    <div className="relative">
      <input
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 150);
          const matched = options.find((opt) => opt.id === value);
          if (!matched) {
            setInputValue("");
            setValue("");
          }
        }}
        onFocus={() => setShowDropdown(true)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          setShowDropdown(true);
        }}
        onKeyDown={handleKeyDown}
        value={inputValue}
        placeholder="Search subject by name or code..."
        className={inputClass}
      />

      {filtered.length > 0 && showDropdown && (
        <ul className="absolute z-10 mt-1 w-full text-xs bg-elevatedBg border border-white/10 rounded-md shadow-sm max-h-40 overflow-y-auto">
          {filtered.map((opt, i) => (
            <li
              key={opt.id}
              onMouseDown={() => {
                setValue(opt.id);
                setInputValue(opt.labelDisplay);
                setShowDropdown(false);
              }}
              className={`px-3 py-1.5 cursor-pointer hover:bg-hoverBg ${
                i === highlightedIndex ? "bg-hoverBg text-blue" : ""
              }`}
            >
              {opt.labelDisplay}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
