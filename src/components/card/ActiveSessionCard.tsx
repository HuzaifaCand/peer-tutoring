import { CardShell } from "./CardShell";
import { ElapsedTime } from "../admin/sessions/active/ElapsedTime";
import { ArrowRight } from "lucide-react";
import { ComputedActiveSessionRow } from "../admin/sessions/active/getActiveSessions";

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
          <span className="px-2 py-0.5 rounded-md bg-gray-500/20 text-gray-300 text-[12px] font-medium">
            {session.subject}
          </span>
          <span
            className={`px-2 py-0.5 rounded-md text-[12px] font-medium ${
              session.is_online
                ? "bg-blue-500/20 text-blue-300"
                : "bg-yellow-500/20 text-yellow-300"
            }`}
          >
            {session.mode}
          </span>
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
        <div className="flex items-center gap-1 flex-wrap text-[11px]">
          <span className="px-2 py-0.5 rounded-md bg-gray-500/10 text-gray-300 font-medium">
            {session.duration_minutes} mins booked
          </span>
          <span className="text-[11px] text-textMuted/90 ml-2 sm:ml-0">
            Started <span className="font-medium">{session.start_time}</span>
          </span>
        </div>

        <button className="inline-flex items-center gap-1 text-textButton border border-white/10 rounded-md px-3 py-1 hover:bg-hoverBg/80 transition-all text-xs font-medium self-end sm:self-auto">
          <span>{session.cta}</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </CardShell>
  );
}
