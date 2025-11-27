"use client";

import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { getActionButtonClass } from "../../sharedUI";

interface CancelSessionProps {
  userId: string;
  refetch: () => void;
  sessionId: string;
  disableCancel: boolean;
}

export function CancelSession({
  userId,
  sessionId,
  refetch,
  disableCancel,
}: CancelSessionProps) {
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  async function handleCancel(cancelReason: string) {
    const { error } = await supabase
      .from("sessions")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancel_reason: cancelReason,
        cancelled_by: userId,
        cancellation_source: "manual",
      })
      .eq("id", sessionId);

    if (error) {
      console.error("cancellation error", error);
      toast.error("Cancelling failed. Try again");
    }

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
        <button
          disabled={disableCancel}
          title={
            disableCancel ? "Can't cancel the session now" : "Cancel Session"
          }
          className={getActionButtonClass("destructive")}
          onClick={() => setCancelModal(true)}
        >
          Cancel Booking
        </button>
      </div>
    </>
  );
}
