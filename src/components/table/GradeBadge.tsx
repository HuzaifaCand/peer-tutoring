import Badge from "../Badge";

type GradeBadgeProps = {
  grade: string;
};

export function GradeBadge({ grade }: GradeBadgeProps) {
  const styles =
    grade === "A2"
      ? "bg-yellow-300/15 text-yellow-200 border border-yellow-300/10"
      : grade === "AS"
      ? "bg-sky-500/15 text-sky-300 border border-sky-500/20"
      : "bg-zinc-500/15 text-zinc-300 border border-zinc-500/20";

  return <Badge styles={styles} value={grade} />;
}
