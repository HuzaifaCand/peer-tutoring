type GradeBadgeProps = {
  grade: string;
};

export function GradeBadge({ grade }: GradeBadgeProps) {
  const styles =
    grade === "A2"
      ? "bg-amber-400/15 text-amber-300 border border-amber-400/20"
      : grade === "AS"
      ? "bg-sky-500/15 text-sky-300 border border-sky-500/20"
      : "bg-zinc-500/15 text-zinc-300 border border-zinc-500/20";

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-[3px] rounded-md 
                  text-xs font-medium leading-none ${styles}`}
    >
      {grade}
    </span>
  );
}
