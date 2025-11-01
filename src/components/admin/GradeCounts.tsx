import TextLoader from "../TextLoader";

interface CountsProps {
  counts: { as: number; a2: number };
  loading: boolean;
}
export function GradeCounts({ counts, loading }: CountsProps) {
  const items = [
    { label: "AS", value: counts.as },
    { label: "A2", value: counts.a2 },
  ];

  return (
    <div className="flex items-center gap-1">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-lg bg-elevatedBg px-3 py-1.5 shadow-sm text-textWhite font-medium flex items-baseline gap-1"
        >
          {loading ? (
            <TextLoader width="w-7" height="h-5" />
          ) : (
            <>
              <span className="text-lg font-semibold leading-none">
                {value}
              </span>
              <span className="text-[10px] text-textWhite/70 font-medium tracking-wide relative top-[1px]">
                {label}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
