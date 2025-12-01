"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { getActionButtonClass } from "@/components/users/sessions/sharedUI";
import { createNotification } from "@/components/notifications/createNotification";

export function VerifySession({
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
  const [verificationModal, setVerificationModal] = useState(false);

  const handeVerifySession = async () => {
    if (!adminId) return;
    const { error: err } = await supabase
      .from("sessions")
      .update({ verified: true, verified_by: adminId })
      .eq("id", sessionId)
      .select()
      .maybeSingle();

    if (err) {
      console.error(err);
      toast.error("Failed to verify session, try again.");
      return;
    }

    toast.success("Session verified successfully.");
    await createNotification({
      userId: tutorId,
      title: "Session has been verified.",
      body: "Your session has been reviewed and verified by an admin.",
      type: "session",
    });

    closeModal();
    refetch();
  };

  return (
    <>
      <ConfirmationModal
        title="Confirm session as reviewed and verify?"
        type="positive"
        isOpen={verificationModal}
        onCancel={() => setVerificationModal(false)}
        onConfirm={handeVerifySession}
        confirmText="Confirm"
      />
      <button
        disabled={!adminId}
        onClick={() => setVerificationModal(true)}
        className={getActionButtonClass("positive", "sm")}
      >
        Verify Session
      </button>
    </>
  );
}
