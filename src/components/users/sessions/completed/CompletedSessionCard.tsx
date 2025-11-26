import { CardShell } from "@/components/card/CardShell";
import { CompletedSessionsType } from "./getCompletedSessions";
import { Tag } from "@/components/ui/Tag";
import { useUserRole } from "@/hooks/useUserRole";

export function CompletedSessionCard({
  cs,
  role,
}: {
  cs: CompletedSessionsType;
  role: "tutor" | "student";
}) {
  const name = role === "tutor" ? cs.sName : cs.tName;

  const formattedDate = new Date(cs.completedAt ?? "").toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const durationText = cs.actualDuration
    ? `${cs.actualDuration} mins`
    : `${cs.expectedDuration} mins`;

  return (
    <CardShell>
      <div className="space-y-4">
        {/* Tags */}
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Tag
              textSize="text-[10px] sm:text-[11px]"
              value={cs.subject}
              color="gray"
            />
            <Tag
              textSize="text-[10px] sm:text-[11px]"
              value={cs.isOnline ? "online" : "onsite"}
              color={cs.isOnline ? "blue" : "yellow"}
            />
          </div>

          {/* Verification (shown ONLY to tutors) */}
          {role === "tutor" && (
            <Tag
              value={cs.verificationStatus}
              color={
                cs.verificationStatus === "verified"
                  ? "green"
                  : cs.verificationStatus === "unverified"
                  ? "red"
                  : "gray"
              }
              textSize="text-[10px] sm:text-[11px]"
            />
          )}
        </div>

        {/* Who + Duration */}
        <div className="space-y-1">
          <p className="text-textWhite text-sm font-medium">With {name}</p>

          <p className="text-xs text-textMuted">
            Duration: <span className="text-textWhite/80">{durationText}</span>
          </p>
        </div>

        {/* Divider */}
        <div className="bg-textMuted/10 w-full h-[1px] my-3" />

        {/* Timestamp */}
        <p className="text-[11px] text-textMuted">
          Completed on {formattedDate}
        </p>
      </div>
    </CardShell>
  );
}
