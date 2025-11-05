import { ElapsedTime } from "../../admin/sessions/active/ElapsedTime";
import { ComputedActiveSession } from "../../../lib/sessions/active/getActiveSessions";
import { Clock, Timer, Hourglass } from "lucide-react";
import { HeaderTags } from "./SessionHeaderTags";
import { TutorStudentSection } from "./TutorStudentSection";
import { CloseButton } from "../CloseButton";
import { InfoCard } from "../InfoCard";

export function ActiveSessionModal({
  session,
  onClose,
}: {
  session: ComputedActiveSession;
  onClose: () => void;
}) {
  return (
    <div className="text-textWhite">
      <HeaderTags
        subject={session.subject}
        mode={session.mode}
        is_online={session.is_online}
      />

      <TutorStudentSection
        tutorInfo={{
          name: session.tutor_name,
          grade: session.tutor_grade,
          id: session.tutor_id,
        }}
        studentInfo={{
          name: session.student_name,
          grade: session.student_grade,
          id: session.student_id,
        }}
      />

      {/* Session Details */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 py-4 text-sm max-w-4xl mx-auto">
        {/* Started */}
        <InfoCard
          item={{
            value: session.start_time,
            label: "Started At",
            icon: Clock,
          }}
        />

        {/* Duration */}
        <InfoCard
          item={{
            value: session.duration_minutes + " mins",
            label: "Duration",
            icon: Timer,
          }}
        />

        {/* Elapsed */}
        <InfoCard
          item={{
            value: (
              <ElapsedTime
                start={session.start_time_iso}
                expectedMinutes={session.duration_minutes}
              />
            ),
            label: "Elapsed Time",
            icon: Hourglass,
          }}
        />
      </section>

      {/* Footer */}
      <footer className="flex justify-end items-center">
        <CloseButton onClose={onClose} />
      </footer>
    </div>
  );
}
