import { getInputClass, getLabelClass } from "@/components/forms/classes";
import ModalBase from "@/components/modal/ModalBase";
import clsx from "clsx";
import { radioButtonClass, radioClass } from "../../onboarding/GradeRadio";
import { supabase } from "@/lib/supabase/client";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { formatUnderscored } from "@/components/admin/edit-requests/getEditRequests";
import { FormButton } from "@/components/forms/FormButton";
import { createNotification } from "@/components/notifications/createNotification";

export function CompleteSessionModal({
  completeModal,
  setCompleteModal,
  sessionId,
  tutorId,
  refetch,
}: {
  completeModal: boolean;
  setCompleteModal: Dispatch<SetStateAction<boolean>>;
  sessionId: string;
  tutorId: string;
  refetch: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  const [attendance, setAttendance] = useState<
    "on_time" | "late" | "no_show" | ""
  >("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [attendanceError, setAttendanceError] = useState("");

  const MAX_CHARS = 300;

  async function handleSubmit() {
    setError("");
    setAttendanceError("");

    // Validation
    if (!attendance) {
      setAttendanceError("Please select the student's attendance status.");
      return;
    }
    if (feedback.trim().length > MAX_CHARS) {
      setError("Feedback exceeds maximum character limit.");
      return;
    }

    setSubmitting(true);

    const trimmedMsg = feedback.trim() || null;

    // Insert tutor feedback
    const { error: feedbackErr } = await supabase
      .from("tutor_session_feedback")
      .insert({
        session_id: sessionId,
        tutor_id: tutorId,
        student_attendance: attendance,
        message: trimmedMsg,
      });

    if (feedbackErr) {
      console.error(feedbackErr);
      toast.error("Failed to submit session feedback.");
      setSubmitting(false);
      return;
    }

    // Update session → completed
    const { error: completeErr, data } = await supabase
      .from("sessions")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", sessionId)
      .select("student_id")
      .maybeSingle();

    if (completeErr) {
      console.error(completeErr);
      toast.error("Failed to complete session.");
      setSubmitting(false);
      return;
    }

    await createNotification({
      userId: data?.student_id,
      title: "Session Completed",
      type: "system",
      body: "Tutor has ended the current session.",
    });

    toast.success("Session completed successfully.");
    setSubmitting(false);
    setCompleteModal(false);
    refetch();
  }
  return (
    <ModalBase isOpen={completeModal} onClose={() => setCompleteModal(false)}>
      <div className="p-0 sm:p-1 space-y-4">
        <h2 className="text-textWhite text-xl font-semibold">End Session</h2>

        {/* Attendance */}
        <div className="flex items-center gap-2 mb-1">
          <label className={getLabelClass("xs")}>
            Student Attendance Status
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            {["on_time", "late", "no_show"].map((status) => (
              <label key={status} className={clsx(radioClass, "text-[11px]")}>
                <input
                  type="radio"
                  value={status}
                  checked={attendance === status}
                  onChange={() =>
                    setAttendance(status as "on_time" | "late" | "no_show")
                  }
                  className="absolute opacity-0 w-0 h-0 peer"
                />
                <span className={clsx(radioButtonClass)}></span>
                {formatUnderscored(status)}
              </label>
            ))}
          </div>

          {/* Inline Attendance Error */}
          {attendanceError && (
            <p className="text-red-400 text-[10px] ml-1">{attendanceError}</p>
          )}
        </div>

        {/* Feedback */}
        <div className="space-y-1">
          <label className={getLabelClass("xs")}>Feedback (optional)</label>

          <textarea
            rows={4}
            className={getInputClass("xs")}
            placeholder="This will not be visible to the student"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (error) setError("");
            }}
          />

          <div className="flex justify-between items-center gap-6">
            <p className="text-red-400 text-[10px] sm:text-xs">{error}</p>

            <p className="text-textMuted text-[10px] text-right">
              {feedback.trim().length}/{MAX_CHARS}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <FormButton
            disabled={!tutorId || submitting}
            size="xs"
            text="Complete Session"
            handleClick={handleSubmit}
          />
        </div>
      </div>
    </ModalBase>
  );
}
