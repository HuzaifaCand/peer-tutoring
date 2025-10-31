import Badge from "../../Badge";
import { verificationStatus } from "./TutorTableColumns";

export default function VerificationBadge({
  status,
  title,
}: {
  status: verificationStatus;
  title?: string;
}) {
  if (status === "verified") return;
  const styles =
    status === "unverified"
      ? "bg-gray-500/20 text-gray-400 border border-gray-500/40"
      : "bg-red-500/20 text-red-200 border border-red-500/40"; // rejected

  return <Badge title={title} styles={styles} value={status} />;
}
