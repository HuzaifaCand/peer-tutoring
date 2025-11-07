import { CardShell } from "@/components/card/CardShell";
import { ComputedActiveSession } from "@/lib/sessions/active/getActiveSessions";
import { ElapsedTime } from "./ElapsedTime";
import { CardCTA } from "@/components/ui/CardCTA";
import { Tag } from "@/components/ui/Tag";

export function ActiveSessionCard({
  session,
  handleCardClick,
}: {
  session: ComputedActiveSession;
  handleCardClick: (s: ComputedActiveSession) => void;
}) {
  return (
    <CardShell onClick={() => handleCardClick(session)}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1">
          <Tag
            value={session.subject_id}
            color="gray"
            font="font-medium"
            textSize="text-[11px]"
          />
          <Tag
            value={session.mode}
            color={session.is_online ? "blue" : "yellow"}
            font="font-medium"
            textSize="text-[11px]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-textMuted uppercase text-[11px] font-medium">
            Elapsed
          </span>
          <span className="text-[12px]">
            <ElapsedTime
              start={session.start_time_iso}
              expectedMinutes={session.duration_minutes}
            />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-3 mb-4 py-2 px-1">
        <div className="flex flex-col">
          <span className="text-[11px] text-textMuted font-medium mb-0.5">
            Tutor
          </span>
          <span className="font-medium text-textWhite text-sm leading-tight">
            {session.tutor_name}
          </span>
        </div>
        <div className="flex flex-col sm:text-right">
          <span className="text-[11px] text-textMuted font-medium mb-0.5">
            Student
          </span>
          <span className="font-medium text-textWhite text-sm leading-tight">
            {session.student_name}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
    flex flex-wrap items-center justify-between gap-x-2 gap-y-2
    border-t border-white/10 pt-3 text-textMuted
  "
      >
        <CardCTA cta={session.cta} />

        <div className="flex flex-wrap items-center gap-1.5">
          <Tag
            color="muted"
            textSize="text-[11px]"
            value={`${session.start_time}`}
            font="font-medium"
            title={`Started at ${session.start_time}`}
          />
          <Tag
            color="muted"
            textSize="text-[11px]"
            value={`${session.duration_minutes} mins`}
            font="font-medium"
            title={`${session.duration_minutes} minutes booked`}
          />
        </div>
      </div>
    </CardShell>
  );
}
