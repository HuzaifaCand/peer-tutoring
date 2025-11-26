"use client";

import { getInputClass, getLabelClass } from "@/components/forms/classes";
import { FormButton } from "@/components/forms/FormButton";
import ModalBase from "@/components/modal/ModalBase";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export function StudentFeedbackModal({
  sessionId,
  studentId,
  isOpen,
  onClose,
  refetch,
}: {
  sessionId: string;
  studentId?: string;
  onClose: () => void;
  isOpen: boolean;
  refetch: () => void;
}) {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const MAX_CHARS = 500;

  function validate(text: string) {
    const trimmed = text.trim();

    if (!trimmed) return "Feedback cannot be empty.";
    if (trimmed.length > MAX_CHARS)
      return `Feedback cannot exceed ${MAX_CHARS} characters.`;

    return "";
  }

  async function handleSubmit() {
    const err = validate(feedback);
    if (err) {
      setError(err);
      return;
    }

    if (!studentId) return;

    setSubmitting(true);

    const { error: dbError } = await supabase
      .from("student_session_feedback")
      .insert({
        session_id: sessionId,
        student_id: studentId,
        message: feedback.trim(),
      });

    if (dbError) {
      console.error("feedback error", dbError);
      toast.error("Failed to submit feedback, try again");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    toast.success("Feedback submitted successfully");
    onClose();
    refetch();
  }

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="p-0 sm:p-1 space-y-4">
        <h2 className="text-textWhite text-xl font-semibold">Leave Feedback</h2>

        <div className="space-y-1">
          <label className={getLabelClass("xs")}>Feedback</label>

          <textarea
            rows={4}
            className={getInputClass("xs")}
            placeholder="This will not be visible to the tutor"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (error) setError(""); // clear inline error while typing
            }}
          />

          <div className="flex justify-between items-center gap-6">
            <p className="text-red-400 text-[10px] sm:text-xs">{error}</p>

            {/* Character counter */}

            <p className="text-textMuted text-[10px] text-right">
              {feedback.trim().length}/{MAX_CHARS}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <FormButton
            disabled={!studentId || submitting}
            size="xs"
            text="Submit"
            handleClick={handleSubmit}
          />
        </div>
      </div>
    </ModalBase>
  );
}
