"use client";

import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { useEditRequestActions } from "./useEditRequestActions";

interface Props {
  modalConfig: {
    requestId: string;
    refetchTable: () => void;
    onClose: () => void;
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
  };
}
export function ApproveRequestModal({ modalConfig }: Props) {
  const { requestId, refetchTable, onClose, isOpen, setIsOpen } = modalConfig;

  const { approve } = useEditRequestActions(requestId);

  async function approveRequest() {
    const error = await approve();

    if (error) {
      console.error("approving error:", error);
      return;
    }

    await new Promise((r) => setTimeout(r, 75)); // delay to make sure database fully updated

    refetchTable();
    setIsOpen(false);
    onClose();
  }

  return (
    <ConfirmationModal
      title="Approve Request?"
      confirmText="Confirm"
      description="Are you sure you want to approve this request?"
      type="positive"
      onConfirm={approveRequest}
      isOpen={isOpen}
      onCancel={() => setIsOpen(false)}
      successMessage="Success! Please send a message to resolve if necessary"
    />
  );
}
