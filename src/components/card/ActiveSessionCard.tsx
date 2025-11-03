import { CardShell } from "./CardShell";
import { ElapsedTime } from "../admin/sessions/active/ElapsedTime";
import { ArrowRight } from "lucide-react";
import { ComputedActiveSessionRow } from "../admin/sessions/active/getActiveSessions";
import { Tag } from "../Tag";

export function ActiveSessionCard({
  session,
}: {
  session: ComputedActiveSessionRow;
}) {
  return (
    <CardShell>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1">
          <Tag value={session.subject} color="gray" font="font-medium" />
          <Tag
            value={session.mode}
            color={session.is_online ? "blue" : "yellow"}
            font="font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-textMuted uppercase font-medium">
            Elapsed
          </span>
          <ElapsedTime
            start={session.start_time_iso}
            expectedMinutes={session.duration_minutes}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-3 mb-4  py-2 px-1">
        <div className="flex flex-col">
          <span className="text-[11px] text-textMuted font-medium mb-0.5">
            Tutor
          </span>
          <span className="font-medium text-textWhite leading-tight">
            {session.tutor_name}
          </span>
        </div>
        <div className="flex flex-col sm:text-right">
          <span className="text-[11px] text-textMuted font-medium mb-0.5">
            Student
          </span>
          <span className="font-medium text-textWhite leading-tight">
            {session.student_name}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-3 text-textMuted">
        <div className="flex items-center gap-1 flex-wrap mt-1">
          <Tag
            color="muted"
            textSize="text-[11px]"
            value={`${session.duration_minutes} mins booked`}
            font="font-medium"
          />

          <Tag
            color="muted"
            textSize="text-[11px]"
            value={`Started ${session.start_time}`}
            font="font-medium"
          />
        </div>

        <button className="inline-flex items-center gap-1 hover:cursor-pointer text-textButton border border-white/10 rounded-md px-3 py-1 transition-all text-xs font-medium self-end sm:self-auto">
          <span className="whitespace-nowrap">{session.cta}</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </CardShell>
  );
}
