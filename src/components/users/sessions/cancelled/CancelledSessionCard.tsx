import { CancSessions } from "./getCancelledSessions";
import { Tag } from "@/components/ui/Tag";

export function CancelledSessionCard({
  cs,
  role,
  currentUserId,
}: {
  cs: CancSessions;
  role: "tutor" | "student";
  currentUserId: string;
}) {
  const name = role === "tutor" ? cs.sName : cs.tName;

  const cancelledByYou = cs.who === currentUserId;

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
    <div className="space-y-4">
      {/* Tags */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Tag value={cs.subject} color="gray" />
          <Tag
            value={cs.type}
            color={cs.type === "online" ? "blue" : "yellow"}
          />
        </div>

        {cs.source && (
          <Tag
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
          Cancelled by {cancelledByYou ? "You" : name}
        </p>

        {cs.why && (
          <p className="text-xs text-textMuted leading-relaxed mt-1">
            Reason: {cs.why}
          </p>
        )}
      </div>

      <div className="bg-textMuted/10 w-full h-[1px] my-4" />

      {/* Timestamp */}
      <div className="space-y-2">
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
        <div className="flex justify-start">
          {hoursBefore !== null && (
            <Tag
              value={
                hoursBefore === 1
                  ? "Cancelled 1 hour before"
                  : `Cancelled ${hoursBefore} hours before`
              }
              textSize="text-[10px]"
              color={
                hoursBefore <= 1 ? "red" : hoursBefore <= 4 ? "yellow" : "muted"
              }
              className="px-0.5"
            />
          )}
        </div>
      </div>
    </div>
  );
}
