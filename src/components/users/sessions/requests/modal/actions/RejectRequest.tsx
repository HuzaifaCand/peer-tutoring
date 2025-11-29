"use client";

import { FormButton } from "@/components/forms/FormButton";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export function RejectRequest({
  type,
  refetch,
  closeModal,
  requestId,
}: {
  type: "online" | "onsite";
  refetch: () => void;
  closeModal: () => void;
  requestId: string;
}) {
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = async () => {
    if (!rejectReason.trim()) return;

    const table =
      type === "onsite" ? "onsite_session_requests" : "online_session_requests";

    const { error } = await supabase
      .from(table)
      .update({ status: "rejected", rejection_reason: rejectReason.trim() })
      .eq("id", requestId)
      .eq("status", "pending");

    if (error) {
      console.error(error);
      toast.error("Could not reject the request.");
      return;
    }

    toast.success("Request rejected.");
    setRejectModal(false);
    setRejectReason("");
    closeModal();
    refetch();
  };

  return (
    <>
      <ConfirmationModal
        title="Reject Request?"
        confirmText="Reject"
        type="destructive"
        isOpen={rejectModal}
        onCancel={() => setRejectModal(false)}
        onConfirm={handleReject}
        inputConfig={{
          inputLabel: "Rejection Reason",
          inputValue: rejectReason,
          onInputChange: setRejectReason,
          inputRequired: true,
          placeholder:
            "Please provide a short reason for rejecting this request.",
          maxLength: 150,
        }}
        successMessage="Request rejected successfully!"
      />
      <FormButton
        text="Reject"
        size="sm"
        handleClick={() => setRejectModal(true)}
      />
    </>
  );
}
