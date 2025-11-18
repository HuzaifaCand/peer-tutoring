"use client";

import { ComputedEditRequest } from "./getEditRequests";
import { useState } from "react";
import { ApproveRequestModal } from "./ApproveRequestModal";
import { RejectRequestModal } from "./RejectRequestModal";
import { RequestModalContent } from "./RequestModalContent";

interface Props {
  request: ComputedEditRequest;
  onClose: () => void;
  refetchTable: () => void;
}
export function RequestModal({ request, onClose, refetchTable }: Props) {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const sharedPayload = {
    refetchTable: refetchTable,
    requestId: request.id,
    onClose: onClose,
  };

  return (
    <>
      {/* APPROVE MODAL */}
      <ApproveRequestModal
        modalConfig={{
          isOpen: approveModal,
          setIsOpen: setApproveModal,
          ...sharedPayload,
        }}
      />

      {/* REJECT MODAL */}
      <RejectRequestModal
        modalConfig={{
          isOpen: rejectModal,
          setIsOpen: setRejectModal,
          ...sharedPayload,
        }}
      />

      {/* MAIN CONTENT */}
      <RequestModalContent
        request={request}
        handleApprove={() => setApproveModal(true)}
        handleReject={() => setRejectModal(true)}
        onClose={onClose}
      />
    </>
  );
}
