import { CardShell } from "@/components/card/CardShell";
import { CancSessions } from "./getCancelledSessions";
import { Tag } from "@/components/ui/Tag";
import { HeaderLeft, tagTextSize } from "../sharedUI";

function getCancelledByLabel(cs: CancSessions, currentUserId: string) {
  if (cs.source === "system") return "System";

  if (cs.who === currentUserId) return "You";

  if (cs.who === cs.studentId) return `Student -- ${cs.sName}`;
  if (cs.who === cs.tutorId) return `Tutor -- ${cs.tName}`;

  return "Admin";
}

export function CancelledSessionCard({
  cs,
  currentUserId,
}: {
  cs: CancSessions;
  role: "tutor" | "student";
  currentUserId: string;
}) {
  const formattedDate = (timestamp: string | null) =>
    timestamp &&
    new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <CardShell>
      <div className="space-y-5">
        {/* Tags */}
        <div className="flex justify-between items-center gap-2">
          <HeaderLeft sub={cs.subjectLabel} isOnline={cs.isOnline} />

          {cs.source && (
            <Tag
              textSize={tagTextSize}
              value={cs.source}
              color={
                cs.source === "manual"
                  ? "gray"
                  : cs.source === "system"
                  ? "red"
                  : "orange"
              }
            />
          )}
        </div>

        {/* Who & What */}
        <div className="space-y-1">
          <p className="text-textWhite text-sm font-medium">
            Cancelled by {getCancelledByLabel(cs, currentUserId)}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 gap-2 sm:items-center">
            {cs.why && (
              <p className="text-xs text-textMuted leading-relaxed">
                Reason: {cs.why}
              </p>
            )}
          </div>
        </div>

        <div className="bg-textMuted/10 w-full h-[1px] my-4" />

        {/* Timestamp */}

        <div className="flex justify-between items-center gap-2">
          <p className="ml-0.5 text-[10px] sm:text-[11px] text-textMuted flex flex-col [@media(min-width:400px)]:gap-1 [@media(min-width:400px)]:flex-row">
            Cancelled on
            <span className="text-textWhite/80">{formattedDate(cs.when)}</span>
          </p>
          <p className="text-[10px] sm:text-[11px] flex flex-col [@media(min-width:400px)]:gap-1 [@media(min-width:400px)]:flex-row text-textMuted text-right">
            Scheduled For{" "}
            <span className="text-textWhite/80">
              {formattedDate(cs.scheduled_for)}
            </span>
          </p>
        </div>
      </div>
    </CardShell>
  );
}
