import { ComputedCancelledSessionRow } from "@/lib/sessions/cancelled/getCancelledSessions";
import { HeaderTags } from "./SessionHeaderTags";
import { TutorStudentSection } from "./TutorStudentSection";
import { CloseButton } from "../CloseButton";

export function CancelledSessionModal({
  session,
  onClose,
}: {
  session: ComputedCancelledSessionRow;
  onClose: () => void;
}) {
  return (
    <div className="text-textWhite">
      <HeaderTags
        mode={session.mode}
        is_online={session.is_online}
        subject={session.subject}
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
      <section className="mt-4 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
        <p className="text-sm text-textMuted">Reason:</p>
        <p className="text-sm text-textWhite font-medium">
          {session.cancel_reason}
        </p>
      </section>
      <footer className="flex justify-end mt-6">
        <CloseButton onClose={onClose} />
      </footer>
    </div>
  );
}
