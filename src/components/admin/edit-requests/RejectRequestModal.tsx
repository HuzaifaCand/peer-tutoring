"use client";

import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { useEditRequestActions } from "./useEditRequestActions";
import { useEffect, useState } from "react";

interface Props {
  modalConfig: {
    requestId: string;
    refetchTable: () => void;
    onClose: () => void;
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
  };
}

export function RejectRequestModal({ modalConfig }: Props) {
  const [rejectReason, setRejectReason] = useState("");

  const { requestId, refetchTable, onClose, isOpen, setIsOpen } = modalConfig;

  useEffect(() => {
    if (isOpen) setRejectReason("");
  }, [isOpen]);

  const { reject } = useEditRequestActions(requestId);

  async function rejectRequest() {
    const error = await reject(rejectReason);
    if (error) {
      console.error("rejecting error:", error);
      return;
    }

    refetchTable();
    setIsOpen(false);
    onClose();
  }

  return (
    <ConfirmationModal
      title="Reject Request?"
      confirmText="Reject"
      type="destructive"
      isOpen={isOpen}
      onCancel={() => setIsOpen(false)}
      onConfirm={rejectRequest}
      inputConfig={{
        inputLabel: "Rejection Reason",
        inputValue: rejectReason,
        onInputChange: setRejectReason,
        inputRequired: true, // Required for rejects
        placeholder: "Please provide a reason for rejecting this request.",
      }}
      successMessage="Request rejected successfully!"
    />
  );
}
