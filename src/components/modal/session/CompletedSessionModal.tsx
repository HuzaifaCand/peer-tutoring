import { CalendarClock, CalendarDays } from "lucide-react";
import { HeaderTags } from "./SessionHeaderTags";
import { TutorStudentSection } from "./TutorStudentSection";
import { CloseButton } from "../CloseButton";
import { ComputedCompletedSessionRow } from "@/lib/sessions/completed/getCompletedSessions";
import { InfoCard } from "../InfoCard";

export function CompletedSessionModal({
  session,
  onClose,
}: {
  session: ComputedCompletedSessionRow;
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
            value: "salam",
          }}
        />
        {/* Started */}
        <InfoCard
          item={{
            icon: CalendarClock,
            label: "Completed For",
            value: "aapko",
          }}
        />

        {/* Duration */}
      </section>

      {/* Footer */}
      <footer className="flex justify-end items-center">
        <CloseButton onClose={onClose} />
      </footer>
    </div>
  );
}
