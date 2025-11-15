interface FilledFieldProps {
  label: string;
  value: string;
}

export default function FilledField({ label, value }: FilledFieldProps) {
  return (
    <div className="flex flex-col mb-2 w-full">
      {/* Label */}
      <label className="text-textWhite mb-1 text-xs sm:text-sm tracking-wide">
        {label}
      </label>

      {/* "Input-looking" value */}
      <div className="bg-hoverBg border capitalize border-elevatedBg text-textMuted/90 text-xs sm:text-sm rounded px-3 py-1 ">
        {value}
      </div>
    </div>
  );
}
