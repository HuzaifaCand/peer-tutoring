import Badge from "../../Badge";
import { SubjectHealthStatus } from "../overview/getSubjectsHealth";

export default function HealthBadge({
  status,
  title,
}: {
  status: SubjectHealthStatus;
  title?: string;
}) {
  const styles =
    status === "healthy"
      ? "bg-green-500/20 text-green-400 border border-green-500/40"
      : status === "low-supply"
      ? "bg-red-500/20 text-red-200 border border-red-500/40"
      : "bg-yellow-500/20 text-yellow-200 border border-yellow-500/40"; // rejected

  return <Badge title={title} styles={styles} value={status} />;
}
