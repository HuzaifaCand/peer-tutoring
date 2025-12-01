import { CalendarClock, CalendarDays } from "lucide-react";
import { ComputedCompletedSessionRow } from "@/lib/sessions/completed/getCompletedSessions";
import { HeaderTags } from "@/components/modal/session/SessionHeaderTags";
import { TutorStudentSection } from "@/components/modal/session/TutorStudentSection";
import { InfoCard } from "@/components/modal/InfoCard";

export function CompletedSessionModal({
  cs,
  onClose,
}: {
  cs: ComputedCompletedSessionRow;
  onClose: () => void;
}) {
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
      <footer className="flex justify-end items-center"></footer>
    </div>
  );
}
