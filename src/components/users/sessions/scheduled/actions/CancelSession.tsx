"use client";

import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { getActionButtonClass } from "../../sharedUI";
import { TimeToSessionType } from "../formatSessionCountdown";
import { createNotification } from "@/components/notifications/createNotification";
import { formatted } from "../ScheduledSessionCard";
import clsx from "clsx";

interface CancelSessionProps {
  userId: string;
  refetch: () => void;
  sessionId: string;
  timeToSession: TimeToSessionType;
}

export function CancelSession({
  userId,
  sessionId,
  refetch,
  timeToSession,
}: CancelSessionProps) {
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const { mode, hours, minutes } = timeToSession;

  const disableCancel =
    mode === "expired" ||
    mode === "grace" ||
    (mode === "before" &&
      hours !== null &&
      minutes !== null &&
      hours * 60 + minutes <= 30);

  async function handleCancel(cancelReason: string) {
    const { error, data } = await supabase
      .from("sessions")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancel_reason: cancelReason,
        cancelled_by: userId,
        cancellation_source: "manual",
      })
      .eq("id", sessionId)
      .select("student_id, tutor_id, scheduled_for")
      .maybeSingle();

    if (error) {
      console.error("cancellation error", error);
      toast.error("Cancelling failed. Try again");
    }

    if (!data) {
      console.error("Something went wrong.");
      return;
    }

    const studentId = data.student_id;
    const tutorId = data.tutor_id;

    const canceller = userId === studentId ? "student" : "tutor";

    const notifyId = userId === studentId ? tutorId : studentId;

    await createNotification({
      userId: notifyId,
      title: `Session was cancelled by ${canceller}`,
      body: `Your session scheduled for ${formatted(
        data.scheduled_for
      )} was cancelled`,
      type: "session_cancellation",
      href: `/${
        canceller === "tutor" ? "student" : "tutor"
      }/sessions?tab=cancelled`,
    });

    refetch();
    setCancelReason("");
  }
  return (
    <>
      <ConfirmationModal
        type="destructive"
        title="Are you sure you want to cancel?"
        description="This action cannot be undone"
        onCancel={() => setCancelModal(false)}
        onConfirm={() => {
          if (!cancelReason.trim()) return;
          handleCancel(cancelReason);
        }}
        isOpen={cancelModal}
        confirmText="Cancel Session"
        inputConfig={{
          inputRequired: true,
          inputLabel: "Reason",
          inputValue: cancelReason,
          onInputChange: setCancelReason,
          maxLength: 125,
        }}
        successMessage="Session has been cancelled."
      />
      <div className="flex justify-end">
        <div
          onClick={() => {
            if (disableCancel) {
              toast.error("Cannot cancel the session anymore.");
              return;
            }

            setCancelModal(true);
          }}
        >
          <button
            disabled={disableCancel}
            className={clsx(
              getActionButtonClass("destructive"),
              "disabled:pointer-events-none"
            )}
          >
            Cancel Session
          </button>
        </div>
      </div>
    </>
  );
}
