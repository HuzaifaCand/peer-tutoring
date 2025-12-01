"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { getActionButtonClass } from "@/components/users/sessions/sharedUI";
import { createNotification } from "@/components/notifications/createNotification";

export function RejectSession({
  sessionId,
  tutorId,
  refetch,
  closeModal,
  adminId,
}: {
  sessionId: string;
  tutorId: string;
  refetch: () => void;
  closeModal: () => void;
  adminId: string | undefined;
}) {
  const [rejectionModal, setRejectionModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handeRejectSession = async () => {
    if (!adminId) return;
    const { error: err } = await supabase
      .from("sessions")
      .update({
        verified: false,
        verified_by: adminId,
        rejection_reason: rejectReason,
      })
      .eq("id", sessionId)
      .select()
      .maybeSingle();

    if (err) {
      console.error(err);
      toast.error("Failed to reject session, try again.");
      return;
    }

    toast.success("Session rejected successfully.");
    await createNotification({
      userId: tutorId,
      title: "Session has been rejected.",
      body: `Session Rejected. Reason: ${rejectReason}`,
      type: "session",
    });

    closeModal();
    refetch();
  };

  return (
    <>
      <ConfirmationModal
        title="Confirm session as reviewed and reject?"
        type="destructive"
        isOpen={rejectionModal}
        onCancel={() => setRejectionModal(false)}
        onConfirm={handeRejectSession}
        confirmText="Confirm"
        inputConfig={{
          inputLabel: "Rejection Reason",
          inputValue: rejectReason,
          onInputChange: setRejectReason,
          inputRequired: true,
          placeholder:
            "Please provide a short reason for rejecting this session.",
          maxLength: 150,
        }}
      />
      <button
        disabled={!adminId}
        onClick={() => setRejectionModal(true)}
        className={getActionButtonClass("destructive", "sm")}
      >
        Reject Session
      </button>
    </>
  );
}
