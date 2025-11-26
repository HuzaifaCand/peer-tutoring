import { CardShell } from "@/components/card/CardShell";
import { CancSessions } from "./getCancelledSessions";
import { Tag } from "@/components/ui/Tag";

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

  const diffHours = (scheduled: string | null, cancelled: string | null) => {
    if (!scheduled || !cancelled) return null;
    const s = new Date(scheduled).getTime();
    const c = new Date(cancelled).getTime();
    const diff = (s - c) / (1000 * 60 * 60);
    if (diff < 0) return null; // cancelled after scheduled start — no need to show
    return Math.round(diff);
  };

  const hoursBefore = diffHours(cs.scheduled_for, cs.when);
  return (
    <CardShell>
      <div className="space-y-5">
        {/* Tags */}
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Tag
              textSize="text-[10px] sm:text-[11px]"
              value={cs.subjectLabel}
              color="gray"
            />
            <Tag
              textSize="text-[10px] sm:text-[11px]"
              value={cs.isOnline ? "online" : "onsite"}
              color={cs.isOnline ? "blue" : "yellow"}
            />
          </div>

          {cs.source && (
            <Tag
              textSize="text-[10px] sm:text-[11px]"
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
            <div>
              {hoursBefore !== null && (
                <Tag
                  value={
                    hoursBefore === 1
                      ? "Cancelled 1 hour before"
                      : `Cancelled ${hoursBefore} hours before`
                  }
                  textSize="text-[10px] sm:text-[11px]"
                  color={
                    hoursBefore <= 1
                      ? "red"
                      : hoursBefore <= 4
                      ? "yellow"
                      : "muted"
                  }
                  className="px-0.5"
                />
              )}
            </div>
          </div>
        </div>

        <div className="bg-textMuted/10 w-full h-[1px] my-4" />

        {/* Timestamp */}

        <div className="flex justify-between items-center gap-2">
          <p className="ml-0.5 text-[10px] sm:text-[11px] text-textMuted">
            Cancelled on{" "}
            <span className="text-textWhite/80">{formattedDate(cs.when)}</span>
          </p>
          <p className="text-[10px] sm:text-[11px] text-textMuted text-right">
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
