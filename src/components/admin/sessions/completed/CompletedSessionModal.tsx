"use client";

import { CalendarClock, CalendarDays, Clock } from "lucide-react";
import { ComputedCompletedSessionRow } from "@/lib/sessions/completed/getCompletedSessions";
import { HeaderTags } from "@/components/modal/session/SessionHeaderTags";
import { TutorStudentSection } from "@/components/modal/session/TutorStudentSection";
import { InfoCard } from "@/components/modal/InfoCard";
import { Tag } from "@/components/ui/Tag";
import { formatUnderscored } from "../../edit-requests/getEditRequests";
import { VerifySession } from "./VerifySession";
import { useAuthUser } from "@/hooks/useAuthUser";
import { RejectSession } from "./RejectSession";

export function CompletedSessionModal({
  cs,
  onClose,
  refetch,
}: {
  cs: ComputedCompletedSessionRow;
  onClose: () => void;
  refetch: () => void;
}) {
  const { studentFeedback, tutorFeedback, studentAttendance } = cs;
  const { user: admin } = useAuthUser();

  return (
    <div className="text-textWhite">
      <HeaderTags
        subject={cs.subject}
        mode={cs.mode}
        is_online={cs.is_online}
      />

      <TutorStudentSection
        tutorInfo={{
          name: cs.tutor_name,
          grade: cs.tutor_grade,
          id: cs.tutor_id,
        }}
        studentInfo={{
          name: cs.student_name,
          grade: cs.student_grade,
          id: cs.student_id,
        }}
      />

      {/* Session Details */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 py-4 text-sm max-w-4xl mx-auto">
        {/*Booked at */}
        <InfoCard
          item={{
            icon: CalendarDays,
            label: "Scheduled for",
            value: cs.scheduledFor,
          }}
        />
        <InfoCard
          item={{
            icon: Clock,
            label: "Started At",
            value: cs.start_time,
          }}
        />
        {/* Started */}
        <InfoCard
          item={{
            icon: CalendarClock,
            label: "Completed At",
            value: cs.completed_at_time,
          }}
        />
      </section>

      {/* Feedback Section */}
      <section className="mt-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <p className="text-sm text-textMuted font-medium">
            Student Attendance
          </p>
          <Tag
            value={formatUnderscored(studentAttendance)}
            color={
              studentAttendance === "on_time"
                ? "green"
                : studentAttendance === "late"
                ? "yellow"
                : "red"
            }
            textSize="text-xs"
          />
        </div>
        {/* Responsive 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tutor Feedback */}
          <div className="bg-elevatedBg/20 border border-white/5 rounded-xl p-4">
            <p className="text-md text-textWhite font-medium mb-1.5">
              Tutor Feedback
            </p>
            <p className="text-[10px] sm:text-xs text-textMuted leading-relaxed whitespace-pre-wrap">
              {tutorFeedback || "No feedback provided."}
            </p>
          </div>

          {/* Student Feedback */}
          <div className="bg-elevatedBg/20 border border-white/5 rounded-xl p-4">
            <p className="text-md text-textWhite font-medium mb-1.5">
              Student Feedback
            </p>
            <p className="text-[10px] sm:text-xs text-textMuted leading-relaxed whitespace-pre-wrap">
              {studentFeedback || "No feedback provided."}
            </p>
          </div>
        </div>

        {cs.verified === null && (
          <div className="flex justify-end pt-6">
            <div className="flex items-center gap-2">
              <RejectSession
                adminId={admin?.id}
                tutorId={cs.tutorId}
                sessionId={cs.id}
                refetch={refetch}
                closeModal={onClose}
              />
              <VerifySession
                adminId={admin?.id}
                tutorId={cs.tutorId} // actual table id
                sessionId={cs.id}
                refetch={refetch}
                closeModal={onClose}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
