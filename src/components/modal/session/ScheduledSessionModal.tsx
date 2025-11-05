import {
  Clock,
  Timer,
  Hourglass,
  CalendarClock,
  CalendarDays,
} from "lucide-react";
import { HeaderTags } from "./SessionHeaderTags";
import { TutorStudentSection } from "./TutorStudentSection";
import { CloseButton } from "../CloseButton";
import { ComputedScheduledSessionRow } from "@/lib/sessions/scheduled/getScheduledSessions";
import { InfoCard } from "../InfoCard";

export function ScheduledSessionModal({
  session,
  onClose,
}: {
  session: ComputedScheduledSessionRow;
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
      <section className="grid grid-cols-3 gap-3 mb-6 py-4 text-sm max-w-4xl mx-auto">
        {/*Booked at */}
        <InfoCard
          item={{
            icon: CalendarDays,
            label: "Booked at",
            value: session.booked_at,
          }}
        />
        {/* Started */}
        <InfoCard
          item={{
            icon: CalendarClock,
            label: "Scheduled For",
            value: session.scheduled_for,
          }}
        />

        {/* Duration */}
        <InfoCard
          item={{
            icon: Timer,
            label: "Expected Duration",
            value: session.duration_minutes + " mins",
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
