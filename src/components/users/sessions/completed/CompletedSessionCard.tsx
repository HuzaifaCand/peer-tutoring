import { CardShell } from "@/components/card/CardShell";
import { CompletedSessionsType } from "./getCompletedSessions";
import { Tag } from "@/components/ui/Tag";
import { StudentFeedbackButton } from "./StudentFeedbackButton";
import { HeaderLeft, tagTextSize } from "../sharedUI";

export const formatted = (ts: string | null) =>
  ts &&
  new Date(ts).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export function CompletedSessionCard({
  cs,
  role,
}: {
  cs: CompletedSessionsType;
  role: "tutor" | "student";
}) {
  const name = role === "tutor" ? cs.sName : cs.tName;

  const durationText = cs.actualDuration
    ? `${cs.actualDuration} mins`
    : `${cs.expectedDuration} mins`;

  const verificationColor =
    cs.verificationStatus === "verified"
      ? "green"
      : cs.verificationStatus === "rejected"
      ? "red"
      : "gray";

  return (
    <CardShell>
      <div className="space-y-5">
        {/* Tags */}
        <div className="flex items-center justify-between gap-2">
          <HeaderLeft sub={cs.subjectLabel} isOnline={cs.isOnline} />

          {role === "tutor" && (
            <Tag
              value={cs.verificationStatus}
              color={verificationColor}
              textSize={tagTextSize}
            />
          )}
          {role === "student" && <StudentFeedbackButton sessionId={cs.id} />}
        </div>

        <div className="space-y-3">
          <p className="text-textWhite text-sm sm:text-lg font-medium">
            {role === "tutor" ? "Student: " : "Tutor: "} {name}{" "}
          </p>
          <div className="flex justify-between items-center gap-4 border-b border-textMuted/10 pb-3">
            <p className="flex flex-col [@media(min-width:400px)]:flex-row [@media(min-width:400px)]:gap-1 text-textMuted text-[10px] sm:text-[11px]">
              Scheduled:{" "}
              <span className="text-textWhite/80">
                {formatted(cs.scheduledFor)}
              </span>
            </p>

            {cs.startTime && (
              <p className="flex flex-col [@media(min-width:400px)]:flex-row [@media(min-width:400px)]:gap-1 text-textMuted text-[10px] sm:text-[11px] text-right">
                Started:{" "}
                <span className="text-textWhite/80">
                  {formatted(cs.startTime)}
                </span>
              </p>
            )}
          </div>

          {/* Schedule & Completion Metadata */}
          <div className="flex justify-between items-center gap-6">
            <span className="flex flex-col [@media(min-width:400px)]:flex-row [@media(min-width:400px)]:gap-1 text-textMuted text-[10px] sm:text-[11px]">
              Requested for
              <span className="text-textWhite/80">
                {formatted(cs.completedAt)}
              </span>
            </span>
            <Tag
              textSize="text-[10px] sm:text-[11px]"
              value={`Duration: ${durationText}`}
              color="gray"
            />
          </div>
        </div>
      </div>
    </CardShell>
  );
}
